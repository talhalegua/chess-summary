interface EvalBarProps {
  evaluation: number; // centipawns, positive = white advantage
  isMate: boolean;
  mateIn?: number;
}

export function EvalBar({ evaluation, isMate, mateIn }: EvalBarProps) {
  // Convert eval to a percentage for the bar (0-100, where 50 = equal)
  let whitePercentage: number;

  if (isMate && mateIn !== undefined) {
    whitePercentage = mateIn > 0 ? 100 : 0;
  } else {
    // Sigmoid-like mapping: clamp eval to [-1000, 1000] range
    const clamped = Math.max(-1000, Math.min(1000, evaluation));
    whitePercentage = 50 + (clamped / 1000) * 50;
  }

  // Format eval text
  let evalText: string;
  if (isMate && mateIn !== undefined) {
    evalText = `M${Math.abs(mateIn)}`;
  } else {
    const pawns = evaluation / 100;
    evalText = pawns >= 0 ? `+${pawns.toFixed(1)}` : pawns.toFixed(1);
  }

  return (
    <div className="w-8 h-full flex flex-col rounded overflow-hidden relative select-none">
      {/* Black portion (top) */}
      <div
        className="bg-[#403d39] transition-all duration-300 flex items-start justify-center pt-1"
        style={{ height: `${100 - whitePercentage}%` }}
      >
        {evaluation < -50 && (
          <span className="text-[10px] font-bold text-gray-300 writing-vertical">
            {evalText}
          </span>
        )}
      </div>
      {/* White portion (bottom) */}
      <div
        className="bg-[#e8e6e1] transition-all duration-300 flex items-end justify-center pb-1"
        style={{ height: `${whitePercentage}%` }}
      >
        {evaluation >= -50 && (
          <span className="text-[10px] font-bold text-gray-700 writing-vertical">
            {evalText}
          </span>
        )}
      </div>
    </div>
  );
}
