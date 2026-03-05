import type { OpeningDefinition } from '../../types/openings';

export const frenchDefense: OpeningDefinition = {
  id: 'french-defense',
  name: 'French Defense',
  eco: 'C00',
  description:
    'A solid and strategic defense where Black builds a pawn chain with e6 and d5, accepting a slightly cramped position in exchange for structural solidity and powerful counterattack chances. The tension between White\'s e4-d4 center and Black\'s e6-d5 chain defines the entire opening.',
  difficulty: 'intermediate',
  playAs: 'black',
  tags: ['1.e4', 'semi-closed', 'pawn chain', 'counterattack'],
  startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  keyIdeas: [
    'Build a solid pawn chain with e6 and d5 to challenge White\'s center',
    'Counter-attack the base of White\'s pawn chain with ...c5 — this is almost always the key break',
    'Find an active plan for the light-squared bishop, which is blocked by the e6 pawn',
    'Use the structural solidity of the French to outlast aggressive opponents',
    'After e5 by White, target the overextended pawn chain with ...c5 and sometimes ...f6',
  ],
  commonMistakes: [
    'Forgetting to strike with ...c5 against White\'s center — this counter-attack is essential',
    'Not finding a plan for the light-squared bishop (try Bd7-c6, or b6 followed by Ba6)',
    'Playing too passively — Black needs active counterplay against the pawn chain, not just defense',
  ],
  moves: [
    {
      id: 'french-1w-e4',
      san: 'e4',
      uci: 'e2e4',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
      moveNumber: 1,
      color: 'w',
      explanation:
        'The King\'s Pawn opening. White occupies the center with e4, controlling the d5 and f5 squares and opening diagonals for the queen and light-squared bishop.',
      strategicIdea:
        'Central control is the foundation of classical chess. A pawn on e4 is White\'s most popular first move, leading to open and semi-open positions.',
      concepts: ['center_control', 'development'],
      arrows: [
        { from: 'e4', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
        { from: 'e4', to: 'f5', color: 'rgba(150, 188, 75, 0.5)' },
      ],
      highlights: [{ square: 'e4', color: '#96bc4b40' }],
      isMainLine: true,
      children: [
        {
          id: 'french-1b-e6',
          san: 'e6',
          uci: 'e7e6',
          fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          moveNumber: 2,
          color: 'b',
          explanation:
            'The French Defense! Black plays e6, preparing to challenge White\'s center with d5 on the next move. Unlike 1...e5, this move keeps the position semi-closed and signals Black\'s intention to build a solid pawn chain rather than fight for open lines immediately.',
          strategicIdea:
            'The French is about delayed counter-attack. Black accepts a slightly cramped position now in exchange for a rock-solid structure and long-term counterplay against White\'s center.',
          watchOutFor:
            'The downside of e6 is that it blocks the light-squared bishop inside the pawn chain. Finding a good role for this bishop is one of Black\'s main challenges throughout the opening.',
          concepts: ['center_control', 'pawn_structure'],
          arrows: [
            { from: 'e6', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
          ],
          highlights: [],
          isMainLine: true,
          children: [
            {
              id: 'french-2w-d4',
              san: 'd4',
              uci: 'd2d4',
              fen: 'rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                'White establishes a powerful two-pawn center with d4 and e4. This is the most natural and principled response — White occupies maximum central space and prepares to develop pieces behind this strong pawn duo.',
              strategicIdea:
                'A broad pawn center gives White a space advantage and restricts Black\'s pieces. But this center also becomes a target — Black will aim to undermine it with ...d5 and later ...c5.',
              concepts: ['center_control', 'space_advantage'],
              arrows: [],
              highlights: [
                { square: 'd4', color: '#96bc4b40' },
                { square: 'e4', color: '#96bc4b40' },
              ],
              isMainLine: true,
              children: [
                {
                  id: 'french-2b-d5',
                  san: 'd5',
                  uci: 'd7d5',
                  fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  explanation:
                    'The defining move of the French Defense. Black immediately challenges White\'s e4 pawn, creating the classic French pawn tension: Black\'s d5-e6 chain versus White\'s e4-d4 center. This is the critical moment — how White responds to this tension determines the entire character of the game.',
                  strategicIdea:
                    'The French pawn structure (e6+d5 vs e4+d4) creates a strategic battle around the pawn chains. Black\'s plan will always involve attacking the base of White\'s chain with ...c5.',
                  watchOutFor:
                    'White now has three major choices: 3.Nc3 (main line, keeping the tension), 3.e5 (Advance, gaining space), or 3.exd5 (Exchange, simplifying). Each leads to a fundamentally different type of game.',
                  concepts: ['center_control', 'pawn_structure'],
                  arrows: [
                    { from: 'd5', to: 'e4', color: 'rgba(202, 52, 49, 0.4)' },
                  ],
                  highlights: [
                    { square: 'd5', color: '#96bc4b40' },
                  ],
                  isMainLine: true,
                  children: [
                    // === 3.Nc3 — Main Line (Classical/Winawer) ===
                    {
                      id: 'french-3w-Nc3',
                      san: 'Nc3',
                      uci: 'b1c3',
                      fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3',
                      moveNumber: 5,
                      color: 'w',
                      branchLabel: 'Classical/Winawer',
                      branchDescription: 'The main line — White defends e4 with a piece, maintaining central tension',
                      explanation:
                        'The most popular move. White develops the knight to defend the e4 pawn, maintaining the central tension. This is the most principled approach — rather than committing to a pawn structure immediately, White keeps all options open while developing a piece.',
                      strategicIdea:
                        'Defending with a piece rather than advancing or exchanging keeps the position flexible. White preserves the tension and waits to see how Black responds before choosing a plan.',
                      concepts: ['development', 'center_control'],
                      arrows: [
                        { from: 'c3', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
                        { from: 'c3', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
                      ],
                      highlights: [],
                      isMainLine: true,
                      children: [
                        // === 3...Bb4 — Winawer Variation ===
                        {
                          id: 'french-3b-Bb4',
                          san: 'Bb4',
                          uci: 'f8b4',
                          fen: 'rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Winawer Variation',
                          branchDescription: 'Sharp and ambitious — Black pins the knight and provokes structural concessions',
                          explanation:
                            'The Winawer Variation — one of the sharpest and most ambitious lines in the French Defense. Black pins the knight on c3, which is the key defender of e4. This creates immediate pressure on White\'s center and forces a critical decision. The Winawer is Black\'s most aggressive option against 3.Nc3.',
                          strategicIdea:
                            'By pinning the c3 knight, Black threatens to capture it and destroy White\'s pawn structure. White typically responds with e5, gaining space but creating a fixed pawn chain that Black can target with ...c5.',
                          watchOutFor:
                            'After the typical sequence 4.e5 c5 5.a3 Bxc3+ 6.bxc3, White gets doubled c-pawns but gains the bishop pair and central space. The position becomes very sharp and strategic.',
                          concepts: ['piece_activity', 'pawn_structure', 'tactical_threat'],
                          arrows: [
                            { from: 'b4', to: 'c3', color: 'rgba(202, 52, 49, 0.5)' },
                          ],
                          highlights: [
                            { square: 'c3', color: '#ca343140' },
                          ],
                          isMainLine: true,
                          children: [
                            {
                              id: 'french-4w-e5',
                              san: 'e5',
                              uci: 'e4e5',
                              fen: 'rnbqk1nr/ppp2ppp/4p3/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White advances the e-pawn, gaining space in the center and on the kingside. This creates the characteristic French Advance structure within the Winawer. The pawn on e5 restricts Black\'s knights (especially blocking Nf6) and seizes territory.',
                              strategicIdea:
                                'The advance e5 creates a space advantage but also commits White\'s pawn structure. The e5 pawn becomes both a strength (space, restriction) and a target (Black will attack it with ...c5 and sometimes ...f6).',
                              concepts: ['space_advantage', 'pawn_structure'],
                              arrows: [],
                              highlights: [
                                { square: 'e5', color: '#96bc4b40' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'french-4b-c5',
                                  san: 'c5',
                                  uci: 'c7c5',
                                  fen: 'rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'The essential counter-attack! Black immediately strikes at the base of White\'s pawn chain with ...c5. This is the single most important move to remember in the French Defense — it challenges White\'s d4 pawn, which supports the entire e5 advance.',
                                  strategicIdea:
                                    'In pawn chain structures, always attack the base. White\'s chain runs e5-d4, so the base is d4. By playing ...c5, Black undermines the foundation and creates counterplay against White\'s entire center.',
                                  concepts: ['center_control', 'pawn_structure'],
                                  arrows: [
                                    { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                                  ],
                                  highlights: [
                                    { square: 'd4', color: '#ca343140' },
                                  ],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'french-5w-a3',
                                      san: 'a3',
                                      uci: 'a2a3',
                                      fen: 'rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/P1N5/1PP2PPP/R1BQKBNR b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White forces a decision from the bishop. This is the key moment — White asks Black: will you retreat or capture on c3? In the main line, Black captures, giving White doubled pawns but also the bishop pair and a strong center.',
                                      strategicIdea:
                                        'By forcing the bishop to declare its intentions, White clarifies the position. The resulting doubled c-pawns are a structural weakness, but the bishop pair and central space often provide more than enough compensation.',
                                      concepts: ['pawn_structure', 'tempo'],
                                      arrows: [
                                        { from: 'a3', to: 'b4', color: 'rgba(202, 52, 49, 0.4)' },
                                      ],
                                      highlights: [],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'french-5b-Bxc3',
                                          san: 'Bxc3+',
                                          uci: 'b4c3',
                                          fen: 'rnbqk1nr/pp3ppp/4p3/2ppP3/3P4/P1b5/1PP2PPP/R1BQKBNR w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black captures the knight with check, forcing White to recapture with the b-pawn. This exchange is the heart of the Winawer — Black willingly gives up the dark-squared bishop to saddle White with doubled c-pawns and weaken the dark squares around White\'s king.',
                                          strategicIdea:
                                            'Trading a bishop for a knight is usually a concession, but here the structural damage to White\'s queenside (doubled c-pawns) and the weakened dark squares provide Black with long-term targets.',
                                          concepts: ['pawn_structure', 'tactical_threat'],
                                          arrows: [],
                                          highlights: [
                                            { square: 'c3', color: '#ca343140' },
                                          ],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'french-6w-bxc3',
                                              san: 'bxc3',
                                              uci: 'b2c3',
                                              fen: 'rnbqk1nr/pp3ppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR b KQkq - 0 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White recaptures with the b-pawn, reaching the tabiya (key position) of the Winawer French. White has the bishop pair, central space with d4+e5, and an extra central pawn. But the doubled c-pawns are a permanent weakness, and Black\'s knight will find excellent outposts on the dark squares.',
                                              strategicIdea:
                                                'This is a classic imbalanced position. White has space and bishops; Black has better pawn structure and dark-square control. Both sides have clear plans, making this one of the richest positions in chess theory.',
                                              watchOutFor:
                                                'Black should continue with moves like ...Qc7, ...Ne7, and ...Nbc6 to pressure the d4 pawn and the dark squares. The light-squared bishop can go to d7 and later to a4 or c6.',
                                              concepts: ['pawn_structure', 'space_advantage', 'piece_activity'],
                                              arrows: [],
                                              highlights: [
                                                { square: 'c3', color: '#ca343150' },
                                                { square: 'c2', color: '#ca343130' },
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

                        // === 3...Nf6 — Classical Variation ===
                        {
                          id: 'french-3b-Nf6',
                          san: 'Nf6',
                          uci: 'g8f6',
                          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Classical Variation',
                          branchDescription: 'Solid and natural — Black develops the knight and puts pressure on e4',
                          explanation:
                            'The Classical Variation. Black develops the knight to its most natural square, putting immediate pressure on the e4 pawn. This is a more solid and traditional approach than the Winawer — Black develops a piece while maintaining tension in the center.',
                          strategicIdea:
                            'Developing a piece that attacks the opponent\'s center is always a good idea. The knight on f6 pressures e4, controls key squares, and prepares kingside development.',
                          concepts: ['development', 'center_control'],
                          arrows: [
                            { from: 'f6', to: 'e4', color: 'rgba(202, 52, 49, 0.4)' },
                            { from: 'f6', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
                          ],
                          highlights: [],
                          isMainLine: false,
                          children: [
                            {
                              id: 'french-4w-Bg5',
                              san: 'Bg5',
                              uci: 'c1g5',
                              fen: 'rnbqkb1r/ppp2ppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR b KQkq - 3 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White pins the knight on f6 against the queen. This is the main response in the Classical — by pinning the knight, White increases the pressure on e4\'s defender and creates tactical issues around Black\'s kingside. Black must decide how to handle this pin.',
                              strategicIdea:
                                'Pins are one of the most powerful tactical motifs. The bishop on g5 ties the knight to defending the queen, making it harder for Black to maintain pressure on e4.',
                              watchOutFor:
                                'Black typically responds with ...Be7 (breaking the pin simply), ...dxe4 (releasing the tension), or ...Bb4 (the McCutcheon Variation, counter-pinning). Each leads to very different types of positions.',
                              concepts: ['piece_activity', 'tactical_threat'],
                              arrows: [
                                { from: 'g5', to: 'f6', color: 'rgba(202, 52, 49, 0.5)' },
                              ],
                              highlights: [
                                { square: 'f6', color: '#ca343140' },
                              ],
                              isMainLine: true,
                              children: [],
                            },
                          ],
                        },
                      ],
                    },

                    // === 3.e5 — Advance Variation ===
                    {
                      id: 'french-3w-e5',
                      san: 'e5',
                      uci: 'e4e5',
                      fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      branchLabel: 'Advance Variation',
                      branchDescription: 'White gains space immediately but creates a fixed target for Black to attack',
                      explanation:
                        'The Advance Variation. White immediately pushes e5, gaining space and restricting Black\'s kingside development (the knight can no longer go to f6). This creates a fixed pawn chain — White\'s e5-d4 against Black\'s d5-e6 — and the battle revolves around attacking and defending these chains.',
                      strategicIdea:
                        'Advancing e5 gains space and restricts the opponent, but it also commits the pawn structure. The e5 pawn is now a potential target, and Black will attack it with ...c5 (and sometimes ...f6).',
                      watchOutFor:
                        'Black must immediately counter-attack with ...c5! Waiting passively allows White to consolidate the space advantage and build a crushing attack on the kingside.',
                      concepts: ['space_advantage', 'pawn_structure'],
                      arrows: [],
                      highlights: [
                        { square: 'e5', color: '#96bc4b40' },
                      ],
                      isMainLine: false,
                      children: [
                        {
                          id: 'french-3b-c5',
                          san: 'c5',
                          uci: 'c7c5',
                          fen: 'rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'The most important move in the French Defense! Black immediately attacks the base of White\'s pawn chain at d4. This is not optional — without ...c5, Black would be left with a permanently cramped position and no counterplay.',
                          strategicIdea:
                            'Always attack the base of a pawn chain. White\'s chain runs e5-d4, so d4 is the base. By striking at d4 with ...c5, Black creates tension and counterplay against White\'s entire center.',
                          concepts: ['center_control', 'pawn_structure'],
                          arrows: [
                            { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                          ],
                          highlights: [
                            { square: 'd4', color: '#ca343140' },
                          ],
                          isMainLine: true,
                          children: [
                            {
                              id: 'french-4w-c3',
                              san: 'c3',
                              uci: 'c2c3',
                              fen: 'rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White supports the d4 pawn with c3, reinforcing the pawn chain. This is the most common and solid response — White shores up the center before developing pieces. The d4 pawn is now firmly defended, so Black needs to increase the pressure.',
                              strategicIdea:
                                'Supporting pawns with pawns is the most economical way to defend. c3 frees up the pieces to develop to more active squares while keeping the center intact.',
                              concepts: ['center_control', 'pawn_structure'],
                              arrows: [
                                { from: 'c3', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                              ],
                              highlights: [],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'french-4b-Nc6',
                                  san: 'Nc6',
                                  uci: 'b8c6',
                                  fen: 'r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR w KQkq - 1 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black develops the knight to c6, adding more pressure to the d4 pawn. The knight also controls the important e5 square and prepares to support the ...c5 break further. This is a natural developing move that fits perfectly with Black\'s plan.',
                                  concepts: ['development', 'center_control'],
                                  arrows: [
                                    { from: 'c6', to: 'd4', color: 'rgba(202, 52, 49, 0.4)' },
                                    { from: 'c6', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'french-5w-Nf3',
                                      san: 'Nf3',
                                      uci: 'g1f3',
                                      fen: 'r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White develops the knight to f3, defending d4 with another piece and preparing to castle kingside. This is the typical developing scheme in the Advance — White builds a solid defense of the center while getting the king to safety. The position is rich in strategic ideas for both sides.',
                                      strategicIdea:
                                        'In the Advance French, the middlegame revolves around the pawn chain battle. White will try to maintain the e5-d4 chain and attack on the kingside, while Black will chip away at d4 with ...c5 (already done), ...Qb6, and sometimes ...f6 to undermine e5.',
                                      watchOutFor:
                                        'Black should continue with ...Qb6 (putting extra pressure on d4), ...Nh6-f5 (since Nf6 is blocked by e5), and look for the right moment to play ...cxd4 to open lines.',
                                      concepts: ['development', 'center_control', 'king_safety'],
                                      arrows: [
                                        { from: 'f3', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
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

                    // === 3.exd5 — Exchange Variation ===
                    {
                      id: 'french-3w-exd5',
                      san: 'exd5',
                      uci: 'e4d5',
                      fen: 'rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      branchLabel: 'Exchange Variation',
                      branchDescription: 'White releases the tension early — leads to symmetrical, drawish positions',
                      explanation:
                        'The Exchange Variation. White trades pawns immediately, releasing all the central tension. This produces a symmetrical pawn structure that is considered the least challenging option for White. The resulting position is solid but somewhat drawish.',
                      strategicIdea:
                        'The Exchange is simple to play but gives up White\'s opening advantage. Without the pawn tension, both sides develop naturally and the position tends toward equality. This is often used by White players who want a quiet, low-theory game.',
                      watchOutFor:
                        'Black should be happy to see the Exchange — it solves the problem of the light-squared bishop (now it has an open diagonal) and leads to an equal, comfortable position.',
                      concepts: ['center_control', 'pawn_structure'],
                      arrows: [],
                      highlights: [],
                      isMainLine: false,
                      children: [
                        {
                          id: 'french-3b-exd5',
                          san: 'exd5',
                          uci: 'e6d5',
                          fen: 'rnbqkbnr/ppp2ppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'Black recaptures, and the position is perfectly symmetrical. Both sides have a d-pawn in the center and open e-files. Notably, Black\'s light-squared bishop — normally the "bad" French bishop trapped behind e6 — now has a completely open diagonal. This is why the Exchange is considered harmless for Black.',
                          strategicIdea:
                            'In the Exchange French, both sides develop naturally. The symmetry makes it hard for either side to create winning chances without the opponent making a mistake. Black should aim to develop actively and look for small imbalances.',
                          concepts: ['center_control', 'development', 'piece_activity'],
                          arrows: [
                            { from: 'c8', to: 'f5', color: 'rgba(150, 188, 75, 0.5)' },
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
};
