export type MoveClassification =
  | 'brilliant'
  | 'great'
  | 'best'
  | 'good'
  | 'book'
  | 'inaccuracy'
  | 'mistake'
  | 'blunder';

export type FeedbackPattern =
  | 'hanging_piece'
  | 'fork'
  | 'pin'
  | 'skewer'
  | 'discovered_attack'
  | 'back_rank'
  | 'trapped_piece'
  | 'king_safety'
  | 'center_control'
  | 'development'
  | 'sacrifice'
  | 'checkmate_threat'
  | 'trade_advantage'
  | 'piece_activity'
  | 'tempo'
  | 'passed_pawn'
  | 'none';

export interface MoveFeedback {
  headline: string;              // e.g. "Bxh7?? — Blunder" or "Nf3 — Best move"
  explanation: string;           // The core "why" explanation (1-3 sentences)
  bestMoveExplanation?: string;  // What the best move achieves (only for errors)
  pvDisplay?: string;            // Readable PV: "12.Nf3 d5 13.c4 e6"
  materialImpact?: string;       // e.g. "Loses a knight for nothing"
  pattern?: FeedbackPattern;     // Detected tactical/positional pattern
}

export interface AnalyzedMove {
  moveNumber: number;
  san: string;           // Standard algebraic notation (e.g. "Nf3")
  uci: string;           // UCI notation (e.g. "g1f3")
  color: 'w' | 'b';
  fen: string;           // FEN after this move
  fenBefore: string;     // FEN before this move
  evalBefore: number;    // Centipawn eval before move (from side-to-move perspective)
  evalAfter: number;     // Centipawn eval after move
  bestMove: string;      // Engine best move (UCI)
  bestMoveSan: string;   // Engine best move (SAN)
  cpLoss: number;        // Centipawn loss compared to best move
  classification: MoveClassification;
  isMate: boolean;       // Is the eval a mate score
  mateIn?: number;       // Mate in N moves (if applicable)
  accuracy: number;      // Per-move accuracy 0-100
  pv: string[];          // Principal variation (UCI) from position before move
  pvSan: string[];       // PV converted to SAN for display
  feedback: MoveFeedback; // Generated learning feedback
}

export interface GamePhase {
  name: 'opening' | 'middlegame' | 'endgame';
  startMove: number;
  endMove: number;
  accuracy: number;
  moves: AnalyzedMove[];
}

export interface GameAnalysis {
  moves: AnalyzedMove[];
  whiteAccuracy: number;
  blackAccuracy: number;
  phases: GamePhase[];
  opening: string;
  result: string;
  whiteName: string;
  blackName: string;
  whiteRating: number;
  blackRating: number;
  timeControl: string;
  date: string;
  playerColor: 'w' | 'b';
  moveCounts: {
    brilliant: number;
    great: number;
    best: number;
    good: number;
    book: number;
    inaccuracy: number;
    mistake: number;
    blunder: number;
  };
}

export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  white: {
    username: string;
    rating: number;
    result: string;
  };
  black: {
    username: string;
    rating: number;
    result: string;
  };
  opening?: string;
}

export interface StockfishResult {
  score: number;       // Centipawn score (positive = side-to-move advantage)
  bestMove: string;    // Best move in UCI notation
  isMate: boolean;
  mateIn?: number;
  pv: string[];        // Principal variation
  depth: number;
}

export type AppView = 'landing' | 'select-game' | 'analysis' | 'opening-select' | 'opening-trainer';

// Re-export opening trainer types
export type {
  OpeningConcept,
  BoardArrow,
  SquareHighlight,
  OpeningMoveNode,
  OpeningDefinition,
} from './openings';
