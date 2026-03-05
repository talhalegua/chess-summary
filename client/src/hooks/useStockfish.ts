import { useCallback, useEffect, useRef, useState } from 'react';
import type { StockfishResult } from '../types';

const STOCKFISH_CDN = 'https://cdn.jsdelivr.net/npm/stockfish.js@10.0.2/stockfish.js';

interface UseStockfishReturn {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  analyzePosition: (fen: string, depth?: number) => Promise<StockfishResult>;
  stop: () => void;
}

export function useStockfish(): UseStockfishReturn {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pendingRef = useRef<{
    resolve: (result: StockfishResult) => void;
    current: Partial<StockfishResult>;
  } | null>(null);
  const initPhaseRef = useRef<'uci' | 'ready' | 'done'>('uci');

  const handleLine = useCallback((line: string) => {
    // UCI init phase
    if (initPhaseRef.current === 'uci' && line === 'uciok') {
      initPhaseRef.current = 'ready';
      workerRef.current?.postMessage('setoption name Hash value 32');
      workerRef.current?.postMessage('isready');
      return;
    }

    if (initPhaseRef.current === 'ready' && line === 'readyok') {
      initPhaseRef.current = 'done';
      setIsReady(true);
      setIsLoading(false);
      return;
    }

    // During analysis: parse info lines
    if (pendingRef.current && line.startsWith('info') && line.includes('score')) {
      const depthMatch = line.match(/depth (\d+)/);
      const mateMatch = line.match(/score mate (-?\d+)/);
      const cpMatch = line.match(/score cp (-?\d+)/);
      const pvMatch = line.match(/ pv (.+)/);

      const depth = depthMatch ? parseInt(depthMatch[1]) : 0;
      const pending = pendingRef.current.current;

      if (mateMatch) {
        const mateIn = parseInt(mateMatch[1]);
        pending.score = mateIn > 0 ? 100000 : -100000;
        pending.isMate = true;
        pending.mateIn = mateIn;
        pending.depth = depth;
      } else if (cpMatch) {
        pending.score = parseInt(cpMatch[1]);
        pending.isMate = false;
        pending.mateIn = undefined;
        pending.depth = depth;
      }

      if (pvMatch) {
        pending.pv = pvMatch[1].trim().split(' ');
      }
    }

    // bestmove = analysis complete
    if (pendingRef.current && line.startsWith('bestmove')) {
      const moveMatch = line.match(/bestmove (\S+)/);
      const cur = pendingRef.current.current;

      const result: StockfishResult = {
        score: cur.score ?? 0,
        bestMove: moveMatch ? moveMatch[1] : '',
        isMate: cur.isMate ?? false,
        mateIn: cur.mateIn,
        pv: cur.pv ?? [],
        depth: cur.depth ?? 0,
      };

      pendingRef.current.resolve(result);
      pendingRef.current = null;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initEngine() {
      try {
        const response = await fetch(STOCKFISH_CDN);
        if (!response.ok) throw new Error('Failed to fetch Stockfish engine');
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        if (cancelled) {
          URL.revokeObjectURL(blobUrl);
          return;
        }

        const worker = new Worker(blobUrl);
        workerRef.current = worker;

        worker.onmessage = (event) => {
          const line = typeof event.data === 'string' ? event.data : String(event.data);
          handleLine(line);
        };

        worker.onerror = () => {
          if (!cancelled) {
            setError('Stockfish worker error');
            setIsLoading(false);
          }
        };

        worker.postMessage('uci');
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to initialize Stockfish');
          setIsLoading(false);
        }
      }
    }

    initEngine();

    return () => {
      cancelled = true;
      workerRef.current?.postMessage('quit');
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [handleLine]);

  const analyzePosition = useCallback(
    (fen: string, depth: number = 18): Promise<StockfishResult> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current || !isReady) {
          reject(new Error('Stockfish not ready'));
          return;
        }

        pendingRef.current = { resolve, current: {} };
        workerRef.current.postMessage('ucinewgame');
        workerRef.current.postMessage(`position fen ${fen}`);
        workerRef.current.postMessage(`go depth ${depth}`);
      });
    },
    [isReady],
  );

  const stop = useCallback(() => {
    workerRef.current?.postMessage('stop');
  }, []);

  return { isReady, isLoading, error, analyzePosition, stop };
}
