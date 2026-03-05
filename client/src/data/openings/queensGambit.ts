import type { OpeningDefinition } from '../../types/openings';

export const queensGambit: OpeningDefinition = {
  id: 'queens-gambit',
  name: "Queen's Gambit",
  eco: 'D06',
  description:
    "One of the most respected and time-tested openings in chess. White offers a pawn on c4 to gain greater control of the center. Despite the name, it's not a true gambit — White can almost always recapture the pawn. A cornerstone of positional chess.",
  difficulty: 'beginner',
  playAs: 'white',
  tags: ['1.d4', 'closed game', 'positional', 'center control'],
  startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  keyIdeas: [
    'Control the center with d4 and c4 — challenging Black\'s d5 pawn',
    'The "gambit" isn\'t really a sacrifice — White can always recapture the pawn',
    'Build a strong queenside initiative with the minority attack',
    'Use the open c-file to pressure Black\'s position',
    'Solid positional chess fundamentals — piece placement over tactics',
  ],
  commonMistakes: [
    'Trying to hold the c4 pawn after 2...dxc4 with b5 — this overextends',
    'Neglecting development by pushing too many pawns in the opening',
    'Forgetting to fight for the center and playing too passively as Black',
  ],
  moves: [
    {
      id: 'qg-1w-d4',
      san: 'd4',
      uci: 'd2d4',
      fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
      moveNumber: 1,
      color: 'w',
      explanation:
        "The Queen's Pawn opening. White occupies the center with the d-pawn, controlling the e5 and c5 squares. Unlike 1.e4, this move is already defended by the queen, making the pawn center more secure from the start.",
      strategicIdea:
        'A pawn on d4 creates a stable central presence. Because the queen already defends it, White can focus on expanding with c4 to build an even larger center.',
      concepts: ['center_control'],
      arrows: [
        { from: 'd4', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
        { from: 'd4', to: 'c5', color: 'rgba(150, 188, 75, 0.5)' },
      ],
      highlights: [{ square: 'd4', color: '#96bc4b40' }],
      isMainLine: true,
      children: [
        {
          id: 'qg-1b-d5',
          san: 'd5',
          uci: 'd7d5',
          fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          moveNumber: 2,
          color: 'b',
          explanation:
            "Black mirrors White's central claim, placing a pawn on d5 to contest the center. This creates a symmetrical pawn tension in the middle of the board. Black's d5 pawn controls c4 and e4, preventing White from easily dominating those squares.",
          concepts: ['center_control'],
          arrows: [
            { from: 'd5', to: 'c4', color: 'rgba(150, 188, 75, 0.5)' },
            { from: 'd5', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
          ],
          highlights: [],
          isMainLine: true,
          children: [
            {
              id: 'qg-2w-c4',
              san: 'c4',
              uci: 'c2c4',
              fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                "The Queen's Gambit! White offers the c-pawn to challenge Black's grip on the center. If Black captures with dxc4, White's d-pawn will stand alone in the center, controlling key squares. The idea is not to sacrifice a pawn permanently — White can always recapture.",
              strategicIdea:
                "This is the heart of the Queen's Gambit: challenge the opponent's central pawn to gain a space advantage. White's d4+c4 formation puts enormous pressure on Black's d5, forcing a critical decision.",
              watchOutFor:
                "Black has three main responses here: declining with 2...e6, accepting with 2...dxc4, or playing the solid 2...c6 (Slav Defense). Each leads to very different types of positions.",
              concepts: ['center_control', 'space_advantage'],
              arrows: [
                { from: 'c4', to: 'd5', color: 'rgba(202, 52, 49, 0.5)' },
              ],
              highlights: [
                { square: 'c4', color: '#96bc4b40' },
                { square: 'd4', color: '#96bc4b40' },
              ],
              isMainLine: true,
              children: [
                // === 2...e6 — Queen's Gambit Declined (Main Line) ===
                {
                  id: 'qg-2b-e6',
                  san: 'e6',
                  uci: 'e7e6',
                  fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'QGD (Declined)',
                  branchDescription: "The classical response — Black solidly maintains the d5 pawn",
                  explanation:
                    "The Queen's Gambit Declined. Black reinforces the d5 pawn with e6, refusing to give up the center. This is the most solid and classical response. The downside is that the light-squared bishop on c8 is now blocked behind the e6 pawn — a recurring strategic problem in the QGD.",
                  strategicIdea:
                    "Maintaining a pawn on d5 keeps Black's position solid, but the locked-in light-squared bishop is the price. Much of Black's middlegame strategy revolves around freeing this bishop.",
                  concepts: ['center_control', 'pawn_structure'],
                  arrows: [
                    { from: 'e6', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
                  ],
                  highlights: [
                    { square: 'c8', color: '#ca343130' },
                  ],
                  isMainLine: true,
                  children: [
                    {
                      id: 'qg-3w-Nc3',
                      san: 'Nc3',
                      uci: 'b1c3',
                      fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        "White develops the knight to its most natural square, adding another attacker to the d5 pawn. The knight on c3 also controls the important e4 square, preventing Black from freeing their position with ...e5.",
                      strategicIdea:
                        "Develop pieces while maintaining pressure on the opponent's center. The knight on c3 reinforces the c4 pawn's attack on d5 and prepares further buildup.",
                      concepts: ['development', 'center_control'],
                      arrows: [
                        { from: 'c3', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
                        { from: 'c3', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
                      ],
                      highlights: [],
                      isMainLine: true,
                      children: [
                        {
                          id: 'qg-3b-Nf6',
                          san: 'Nf6',
                          uci: 'g8f6',
                          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            "Black develops the knight to defend d5 and control the e4 square. The knight on f6 is Black's best-placed piece — it supports the center, prepares kingside castling, and is flexible enough to reposition later if needed.",
                          concepts: ['development', 'center_control'],
                          arrows: [
                            { from: 'f6', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
                            { from: 'f6', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
                          ],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            {
                              id: 'qg-4w-Bg5',
                              san: 'Bg5',
                              uci: 'c1g5',
                              fen: 'rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                "White pins the knight on f6 against the queen. This is a key move in the QGD — the knight on f6 is Black's main defender of d5, so pinning it increases the pressure on the center. Black must decide how to deal with this pin.",
                              strategicIdea:
                                "Pins are one of the most powerful tactical motifs. By pinning the f6 knight, White threatens to capture it, doubling Black's pawns and weakening the kingside. This forces Black to react.",
                              watchOutFor:
                                "Black usually plays Be7 to break the pin, but the bishop is passive there. The tension between White's pressure and Black's solidity defines the QGD middlegame.",
                              concepts: ['tactical_threat', 'piece_activity', 'development'],
                              arrows: [
                                { from: 'g5', to: 'f6', color: 'rgba(202, 52, 49, 0.5)' },
                              ],
                              highlights: [
                                { square: 'f6', color: '#ca343140' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'qg-4b-Be7',
                                  san: 'Be7',
                                  uci: 'f8e7',
                                  fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 4 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    "Black breaks the pin by developing the bishop to e7. While this is a somewhat passive square for the bishop, it prepares kingside castling and keeps the position solid. This is the most popular and reliable response to the Bg5 pin.",
                                  concepts: ['development', 'king_safety'],
                                  arrows: [],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'qg-5w-e3',
                                      san: 'e3',
                                      uci: 'e2e3',
                                      fen: 'rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        "White solidifies the d4 pawn and opens the diagonal for the dark-squared bishop's retreat if needed. The e3 pawn also prepares Bd3 or Nf3, continuing development. This is a typical QGD setup — White builds slowly and methodically.",
                                      strategicIdea:
                                        "In the Queen's Gambit Declined, White plays positionally: maintain central tension, develop all pieces, castle, and then look for a minority attack on the queenside (pushing a- and b-pawns to weaken Black's pawn structure).",
                                      concepts: ['center_control', 'development', 'pawn_structure'],
                                      arrows: [],
                                      highlights: [
                                        { square: 'd4', color: '#96bc4b30' },
                                        { square: 'e3', color: '#96bc4b30' },
                                      ],
                                      isMainLine: true,
                                      children: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // === 2...dxc4 — Queen's Gambit Accepted ===
                {
                  id: 'qg-2b-dxc4',
                  san: 'dxc4',
                  uci: 'd5c4',
                  fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'QGA (Accepted)',
                  branchDescription: "Black captures the gambit pawn — leads to open, active play",
                  explanation:
                    "The Queen's Gambit Accepted. Black takes the offered pawn, giving up the center temporarily. Black's plan is not to hold the c4 pawn forever, but to use the tempo White spends recapturing to develop quickly and create counter-chances.",
                  strategicIdea:
                    "Accepting the gambit concedes the center but gains a pawn (temporarily). Black plans to develop rapidly and strike back at White's center later with moves like ...c5 or ...e5.",
                  watchOutFor:
                    "Don't try to hold the pawn with ...b5 — this weakens Black's queenside and falls behind in development. Instead, use the time to develop pieces actively.",
                  concepts: ['center_control', 'tempo'],
                  arrows: [],
                  highlights: [
                    { square: 'c4', color: '#f7c63140' },
                  ],
                  isMainLine: false,
                  children: [
                    {
                      id: 'qg-3w-e3',
                      san: 'e3',
                      uci: 'e2e3',
                      fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/4P3/PP3PPP/RNBQKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        "White opens the diagonal for the light-squared bishop to recapture on c4. This is a solid, classical approach — White doesn't rush to grab the pawn back but instead prepares natural development. The alternative 3.Nf3 is also very popular.",
                      strategicIdea:
                        "By playing e3, White prepares Bxc4 in one move, regaining the pawn while developing a piece to an active square. The bishop on c4 will target the weakened f7 square.",
                      concepts: ['development', 'piece_activity'],
                      arrows: [
                        { from: 'f1', to: 'c4', color: 'rgba(150, 188, 75, 0.5)' },
                      ],
                      highlights: [],
                      isMainLine: true,
                      children: [
                        {
                          id: 'qg-3b-Nf6-qga',
                          san: 'Nf6',
                          uci: 'g8f6',
                          fen: 'rnbqkb1r/ppp1pppp/5n2/8/2pP4/4P3/PP3PPP/RNBQKBNR w KQkq - 1 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            "Black develops the knight to its most natural square, controlling the center and preparing to castle. The knight on f6 contests the e4 and d5 squares, making it harder for White to establish a dominant center.",
                          concepts: ['development', 'center_control'],
                          arrows: [],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            {
                              id: 'qg-4w-Bxc4',
                              san: 'Bxc4',
                              uci: 'f1c4',
                              fen: 'rnbqkb1r/ppp1pppp/5n2/8/2BP4/4P3/PP3PPP/RNBQK1NR b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                "White recaptures the pawn with the bishop, which lands on an excellent diagonal aiming at f7. The gambit pawn is recovered, and White has a lead in development with a strong central pawn on d4 and an active bishop. This is the ideal outcome for White in the QGA.",
                              strategicIdea:
                                "White has achieved the goal: a strong d4 pawn in the center, an active bishop on c4, and easy development. Black must play actively to avoid falling behind.",
                              concepts: ['development', 'piece_activity', 'center_control'],
                              arrows: [
                                { from: 'c4', to: 'f7', color: 'rgba(247, 198, 49, 0.5)' },
                              ],
                              highlights: [
                                { square: 'd4', color: '#96bc4b40' },
                              ],
                              isMainLine: true,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },

                // === 2...c6 — Slav Defense ===
                {
                  id: 'qg-2b-c6',
                  san: 'c6',
                  uci: 'c7c6',
                  fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'Slav Defense',
                  branchDescription: "A solid alternative — supports d5 without locking in the light-squared bishop",
                  explanation:
                    "The Slav Defense. Black supports the d5 pawn with c6 instead of e6. The key advantage of this move is that it does not block the light-squared bishop — unlike 2...e6, the bishop on c8 remains free to develop to f5 or g4. This makes the Slav one of the most popular defenses at all levels.",
                  strategicIdea:
                    "By supporting d5 with c6 instead of e6, Black keeps the option of developing the light-squared bishop outside the pawn chain. This solves one of the main problems of the QGD.",
                  concepts: ['center_control', 'pawn_structure', 'development'],
                  arrows: [
                    { from: 'c6', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
                  ],
                  highlights: [],
                  isMainLine: false,
                  children: [
                    {
                      id: 'qg-3w-Nf3',
                      san: 'Nf3',
                      uci: 'g1f3',
                      fen: 'rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        "White develops the knight to its best square, controlling the center and preparing kingside castling. The knight on f3 supports the d4 pawn and prevents Black from playing ...e5 too easily.",
                      concepts: ['development', 'center_control'],
                      arrows: [
                        { from: 'f3', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                        { from: 'f3', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                      ],
                      highlights: [],
                      isMainLine: true,
                      children: [
                        {
                          id: 'qg-3b-Nf6-slav',
                          san: 'Nf6',
                          uci: 'g8f6',
                          fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            "Black develops the knight, adding another defender to d5 and preparing to develop the kingside. A key feature of the Slav is that Black can now play ...Bf5 or ...Bg4 before playing ...e6, keeping the light-squared bishop active.",
                          strategicIdea:
                            "In the Slav, Black's light-squared bishop is the star. After ...Nf6, Black can choose between ...Bf5 (developing the bishop before closing it in with ...e6) or ...e6 followed by ...Bd6 setups.",
                          concepts: ['development', 'center_control'],
                          arrows: [],
                          highlights: [
                            { square: 'c8', color: '#96bc4b30' },
                          ],
                          isMainLine: true,
                          children: [
                            {
                              id: 'qg-4w-Nc3',
                              san: 'Nc3',
                              uci: 'b1c3',
                              fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                "White develops the second knight, adding more pressure to d5 and controlling the e4 square. Both sides are now fully set up for the middlegame battle. White will look to open the center, while Black will seek to develop the light-squared bishop and equalize.",
                              strategicIdea:
                                "With pieces developed to natural squares, the position is a classic Queen's Gambit structure. The battle revolves around the d5 pawn — can Black maintain it, or will White break through with e4 or cxd5?",
                              concepts: ['development', 'center_control'],
                              arrows: [
                                { from: 'c3', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
                                { from: 'c3', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
                              ],
                              highlights: [],
                              isMainLine: true,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
