import type { GameAnalysis, AnalyzedMove, MoveClassification } from '../types';

function getMoveReference(move: AnalyzedMove): string {
  const num = Math.ceil(move.moveNumber / 2);
  const dots = move.color === 'w' ? '.' : '...';
  return `${num}${dots}${move.san}`;
}

function describeClassification(cls: MoveClassification): string {
  switch (cls) {
    case 'brilliant': return 'a brilliant';
    case 'great': return 'a great';
    case 'blunder': return 'a blunder';
    case 'mistake': return 'a mistake';
    case 'inaccuracy': return 'an inaccuracy';
    default: return '';
  }
}

export function generateNarrative(analysis: GameAnalysis): string[] {
  const paragraphs: string[] = [];
  const playerColor = analysis.playerColor;
  const playerName = playerColor === 'w' ? analysis.whiteName : analysis.blackName;
  const opponentName = playerColor === 'w' ? analysis.blackName : analysis.whiteName;
  const playerAccuracy = playerColor === 'w' ? analysis.whiteAccuracy : analysis.blackAccuracy;

  // Opening paragraph
  paragraphs.push(
    `${playerName} played as ${playerColor === 'w' ? 'White' : 'Black'} against ${opponentName}. ` +
    `The game featured the ${analysis.opening}. ` +
    `The result was ${describeResult(analysis.result, playerColor)}.`
  );

  // Phase summaries
  for (const phase of analysis.phases) {
    const phaseMoves = phase.moves;
    const blunders = phaseMoves.filter(m => m.classification === 'blunder');
    const mistakes = phaseMoves.filter(m => m.classification === 'mistake');
    const brilliants = phaseMoves.filter(m => m.classification === 'brilliant');
    const greats = phaseMoves.filter(m => m.classification === 'great' || m.classification === 'best');

    let phaseText = `In the ${phase.name}, accuracy was ${phase.accuracy.toFixed(1)}%. `;

    if (brilliants.length > 0) {
      const bMove = brilliants[0];
      phaseText += `Found ${describeClassification('brilliant')} move with ${getMoveReference(bMove)}. `;
    }

    if (greats.length > 0) {
      phaseText += `Played ${greats.length} strong move${greats.length > 1 ? 's' : ''}. `;
    }

    if (blunders.length > 0) {
      const bMove = blunders[0];
      phaseText += `Blundered with ${getMoveReference(bMove)} (best was ${bMove.bestMoveSan}). `;
    } else if (mistakes.length > 0) {
      phaseText += `Made ${mistakes.length} mistake${mistakes.length > 1 ? 's' : ''}. `;
    }

    paragraphs.push(phaseText.trim());
  }

  // Key moments
  const keyMoments = findKeyMoments(analysis);
  if (keyMoments.length > 0) {
    let momentsText = 'Key moments: ';
    momentsText += keyMoments
      .map(m => {
        const desc = describeClassification(m.classification);
        if (desc) {
          return `${getMoveReference(m)} was ${desc} move`;
        }
        return null;
      })
      .filter(Boolean)
      .join('. ') + '.';
    paragraphs.push(momentsText);
  }

  // Summary stats
  const counts = analysis.moveCounts;
  paragraphs.push(
    `Overall accuracy: ${playerAccuracy.toFixed(1)}%. ` +
    `${counts.brilliant + counts.great + counts.best} excellent moves, ` +
    `${counts.good} good moves, ` +
    `${counts.inaccuracy} inaccuracies, ` +
    `${counts.mistake} mistakes, ` +
    `${counts.blunder} blunders.`
  );

  return paragraphs;
}

function describeResult(result: string, playerColor: 'w' | 'b'): string {
  if (result === '1-0') return playerColor === 'w' ? 'a win for White' : 'a loss for Black';
  if (result === '0-1') return playerColor === 'b' ? 'a win for Black' : 'a loss for White';
  if (result === '1/2-1/2') return 'a draw';
  return result;
}

function findKeyMoments(analysis: GameAnalysis): AnalyzedMove[] {
  const playerMoves = analysis.moves.filter(m => m.color === analysis.playerColor);

  // Find the most impactful moves (largest eval swings)
  const sorted = [...playerMoves]
    .filter(m => m.classification !== 'book')
    .sort((a, b) => Math.abs(b.cpLoss) - Math.abs(a.cpLoss));

  // Return top 3 most notable moves (blunders/brilliants first)
  const notable = sorted.filter(
    m => m.classification === 'blunder' || m.classification === 'mistake' ||
      m.classification === 'brilliant' || m.classification === 'great'
  );

  return notable.slice(0, 3);
}
