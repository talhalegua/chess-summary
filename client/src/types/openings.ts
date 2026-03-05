/** Concept tags for categorizing what a move teaches */
export type OpeningConcept =
  | 'center_control'
  | 'development'
  | 'king_safety'
  | 'pawn_structure'
  | 'piece_activity'
  | 'tempo'
  | 'tactical_threat'
  | 'sacrifice'
  | 'prophylaxis'
  | 'space_advantage';

/** Arrow annotation to draw on the board */
export interface BoardArrow {
  from: string;    // e.g. "e2"
  to: string;      // e.g. "e4"
  color?: string;  // defaults to green; use rgba for semi-transparency
}

/** Square highlight annotation */
export interface SquareHighlight {
  square: string;  // e.g. "e4"
  color: string;   // hex color with alpha, e.g. "#96bc4b60"
}

/** A single node in the opening move tree */
export interface OpeningMoveNode {
  id: string;                     // unique ID, e.g. "italian-3w-Bc4"
  san: string;                    // move in SAN, e.g. "Bc4"
  uci: string;                    // move in UCI, e.g. "f1c4"
  fen: string;                    // FEN after this move is played
  moveNumber: number;             // half-move number (1=1.e4, 2=1...e5, 3=2.Nf3, etc.)
  color: 'w' | 'b';              // who played this move

  // Educational content
  explanation: string;            // 2-4 sentence "why" explanation
  strategicIdea?: string;         // broader strategic principle (💡 box)
  watchOutFor?: string;           // common pitfall or opponent threat (⚠️ box)
  concepts: OpeningConcept[];     // tags for what this move teaches

  // Board annotations for this position
  arrows: BoardArrow[];           // arrows to show after this move
  highlights: SquareHighlight[];  // squares to highlight

  // Tree structure
  isMainLine: boolean;            // true for the primary recommended line
  children: OpeningMoveNode[];    // next moves (branches)

  // Navigation hints (shown in branch selector UI)
  branchLabel?: string;           // label for this branch, e.g. "Giuoco Piano"
  branchDescription?: string;     // short description for branch selector card
}

/** Top-level opening definition */
export interface OpeningDefinition {
  id: string;                     // e.g. "italian-game"
  name: string;                   // e.g. "Italian Game"
  eco: string;                    // ECO code, e.g. "C50"
  description: string;            // 2-3 sentence overview
  difficulty: 'beginner' | 'intermediate';
  playAs: 'white' | 'black';
  tags: string[];                 // e.g. ["1.e4", "open game", "development"]

  // The move tree (starts from the initial position)
  startingFen: string;            // always standard starting FEN
  moves: OpeningMoveNode[];       // first moves (root children of the tree)

  // Summary info shown on the intro screen
  keyIdeas: string[];             // 3-5 bullet points of the opening's main ideas
  commonMistakes: string[];       // 2-3 common mistakes beginners make
}
