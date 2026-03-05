interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="bg-[#16171f] border-b border-gray-700/50 px-6 py-3 flex items-center gap-3">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">
          CS
        </div>
        <h1 className="text-lg font-semibold text-white">Chess Summary</h1>
      </button>
      <span className="text-xs text-gray-500 ml-2">Game Analysis Tool</span>
    </header>
  );
}
