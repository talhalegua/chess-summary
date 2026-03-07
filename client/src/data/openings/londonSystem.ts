import type { OpeningDefinition } from '../../types/openings';

export const londonSystem: OpeningDefinition = {
  id: 'london-system',
  name: 'London System',
  eco: 'D02',
  description:
    'A "system" opening where White plays the same solid setup regardless of Black\'s responses. The London builds a rock-solid pawn pyramid on d4, e3, and c3 with the dark-squared bishop developed to f4. Its consistent structure and low theory requirements make it the ideal opening for beginners learning to play 1.d4.',
  difficulty: 'beginner',
  playAs: 'white',
  tags: ['1.d4', 'system opening', 'solid', 'beginner-friendly'],
  startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  keyIdeas: [
    'Develop the dark-squared bishop to f4 BEFORE playing e3',
    'Build the "London pyramid" — pawns on d4, e3, c3 for a solid center',
    'Complete development with Nf3, Bd3, O-O, and Nbd2',
    'The Bf4 controls the e5 square and supports kingside play',
    'Play the same setup against almost anything — minimal theory required!',
  ],
  commonMistakes: [
    'Playing e3 before Bf4 — this locks the dark-squared bishop inside the pawn chain!',
    'Moving the bishop too many times (Bf4-g3-h4) — this wastes tempo and lets Black seize the initiative',
    'Being too passive — even the London needs active plans like e4 or a kingside attack',
  ],
  moves: [
    {
      id: 'london-1w-d4',
      san: 'd4',
      uci: 'd2d4',
      fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
      moveNumber: 1,
      color: 'w',
      explanation:
        'The Queen\'s Pawn opening. White occupies the center with d4, controlling the c5 and e5 squares. Unlike 1.e4, this move creates a more solid central structure since the d4 pawn is already defended by the queen. This is the starting move for the London System.',
      strategicIdea:
        'The d4 pawn is naturally defended by the queen, making it harder for Black to challenge. This solid center is the foundation of the London System\'s reliable structure.',
      concepts: ['center_control'],
      arrows: [
        { from: 'd4', to: 'c5', color: 'rgba(150, 188, 75, 0.5)' },
        { from: 'd4', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
      ],
      highlights: [{ square: 'd4', color: '#96bc4b40' }],
      isMainLine: true,
      children: [
        // === 1...d5 — Main Line ===
        {
          id: 'london-1b-d5',
          san: 'd5',
          uci: 'd7d5',
          fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',
          moveNumber: 2,
          color: 'b',
          explanation:
            'Black mirrors White\'s central claim with d5, creating a symmetrical pawn center. This is the most classical response to 1.d4 and leads directly into the main lines of the London System.',
          concepts: ['center_control'],
          arrows: [],
          highlights: [],
          isMainLine: true,
          children: [
            {
              id: 'london-2w-Bf4',
              san: 'Bf4',
              uci: 'c1f4',
              fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                'The London Move! White develops the dark-squared bishop to f4 BEFORE playing e3. This is the critical move order — once e3 is played, the bishop is locked behind the pawn chain and cannot reach f4. From f4, the bishop controls the e5 square and eyes the b8-h2 diagonal.',
              strategicIdea:
                'Move order matters enormously in the opening. Developing the bishop to f4 before playing e3 is the defining idea of the London System. This principle — develop bishops before closing them in with pawns — applies to many openings.',
              watchOutFor:
                'If you play 2.e3 first, the bishop gets trapped behind the pawn wall and the London setup falls apart. Always remember: Bf4 before e3!',
              concepts: ['development', 'piece_activity'],
              arrows: [
                { from: 'f4', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                { from: 'f4', to: 'b8', color: 'rgba(247, 198, 49, 0.4)' },
              ],
              highlights: [{ square: 'f4', color: '#96bc4b40' }],
              isMainLine: true,
              children: [
                // === 2...Nf6 — Main Line ===
                {
                  id: 'london-2b-Nf6',
                  san: 'Nf6',
                  uci: 'g8f6',
                  fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 2 3',
                  moveNumber: 4,
                  color: 'b',
                  explanation:
                    'Black develops the knight to its most natural square, controlling the e4 and d5 squares. This is the most common response — a solid developing move that prepares kingside castling.',
                  concepts: ['development', 'center_control'],
                  arrows: [
                    { from: 'f6', to: 'e4', color: 'rgba(150, 188, 75, 0.5)' },
                  ],
                  highlights: [],
                  isMainLine: true,
                  children: [
                    {
                      id: 'london-3w-e3',
                      san: 'e3',
                      uci: 'e2e3',
                      fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        'Now that the bishop is safely on f4, White plays e3 to support the d4 pawn and open the diagonal for the light-squared bishop to develop to d3. This creates the first piece of the "London pyramid" — the solid pawn structure on d4 and e3.',
                      strategicIdea:
                        'The e3 pawn serves double duty: it supports the central d4 pawn and opens the f1-a6 diagonal for the light-squared bishop. With Bf4 already developed, playing e3 now is perfectly timed.',
                      concepts: ['pawn_structure', 'development'],
                      arrows: [
                        { from: 'f1', to: 'd3', color: 'rgba(247, 198, 49, 0.4)' },
                      ],
                      highlights: [
                        { square: 'd4', color: '#96bc4b30' },
                        { square: 'e3', color: '#96bc4b30' },
                      ],
                      isMainLine: true,
                      children: [
                        // === 3...e6 — Main Line ===
                        {
                          id: 'london-3b-e6',
                          san: 'e6',
                          uci: 'e7e6',
                          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'Black plays solidly, reinforcing the d5 pawn and opening the diagonal for the dark-squared bishop. This is the most natural response, leading to a classical London System structure. Black will typically develop the bishop to d6 or e7 next.',
                          concepts: ['pawn_structure', 'development'],
                          arrows: [],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            {
                              id: 'london-4w-Nf3',
                              san: 'Nf3',
                              uci: 'g1f3',
                              fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 1 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White continues natural development, bringing the knight to f3 where it controls e5 and d4. This prepares kingside castling and supports the center. The London setup is taking shape: Bf4, e3, Nf3 — next comes Bd3, O-O, and eventually c3 and Nbd2.',
                              strategicIdea:
                                'The London System follows a predictable, efficient development scheme: Bf4, e3, Nf3, Bd3, O-O, Nbd2, c3. Learning this pattern means you always know what to do in the opening.',
                              concepts: ['development', 'center_control', 'king_safety'],
                              arrows: [
                                { from: 'f3', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                              ],
                              highlights: [],
                              isMainLine: true,
                              children: [
                                // === 4...Bd6 — Challenging the Bishop (Main) ===
                                {
                                  id: 'london-4b-Bd6',
                                  san: 'Bd6',
                                  uci: 'f8d6',
                                  fen: 'rnbqk2r/ppp2ppp/3bpn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 2 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  branchLabel: 'Challenging the Bishop',
                                  branchDescription: 'Black develops the bishop to d6, directly challenging White\'s London bishop on f4',
                                  explanation:
                                    'Black develops the bishop to d6, directly challenging White\'s prized London bishop. The bishop on d6 attacks f4, asking White an important question: trade bishops or retreat? This is the most principled response against the London.',
                                  concepts: ['development', 'piece_activity'],
                                  arrows: [
                                    { from: 'd6', to: 'f4', color: 'rgba(202, 52, 49, 0.5)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'london-5w-Bg3',
                                      san: 'Bg3',
                                      uci: 'f4g3',
                                      fen: 'rnbqk2r/ppp2ppp/3bpn2/3p4/3P4/4PNB1/PPP2PPP/RN1QKB1R b KQkq - 3 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White retreats the bishop to g3, maintaining the bishop pair. From g3, the bishop still controls the e5 square and remains an active piece on the h2-b8 diagonal. If Black trades with Bxg3, White recaptures hxg3 and gains an open h-file for a potential kingside attack.',
                                      strategicIdea:
                                        'Retreating isn\'t always passive! On g3, the bishop remains active, and if Black trades with ...Bxg3, the recapture hxg3 opens the h-file — a highway for White\'s rook to attack the kingside.',
                                      concepts: ['piece_activity', 'king_safety'],
                                      arrows: [
                                        { from: 'g3', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                                        { from: 'h1', to: 'h8', color: 'rgba(247, 198, 49, 0.3)' },
                                      ],
                                      highlights: [],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'london-5b-Bxg3',
                                          san: 'Bxg3',
                                          uci: 'd6g3',
                                          fen: 'rnbqk2r/ppp2ppp/4pn2/3p4/3P4/4PNb1/PPP2PPP/RN1QKB1R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black trades the dark-squared bishops. This is the most common continuation — Black eliminates the London bishop rather than allowing White to maintain the tension. The trade has important structural consequences for both sides.',
                                          concepts: ['piece_activity', 'pawn_structure'],
                                          arrows: [],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'london-6w-hxg3',
                                              san: 'hxg3',
                                              uci: 'h2g3',
                                              fen: 'rnbqk2r/ppp2ppp/4pn2/3p4/3P4/4PNP1/PPP2PP1/RN1QKB1R b KQkq - 0 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White recaptures with the h-pawn, opening the h-file! This is the key benefit of retreating to g3 instead of trading immediately — the open h-file gives White\'s rook a direct highway toward the Black king. The doubled g-pawns also control the f4 square.',
                                              strategicIdea:
                                                'The open h-file is a powerful asset in the London System. After castling kingside and placing a rook on h1 (it\'s already there!), White has natural attacking chances against the Black king.',
                                              concepts: ['king_safety', 'piece_activity'],
                                              arrows: [
                                                { from: 'h1', to: 'h8', color: 'rgba(247, 198, 49, 0.4)' },
                                              ],
                                              highlights: [
                                                { square: 'g3', color: '#96bc4b30' },
                                              ],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'london-6b-OO',
                                                  san: 'O-O',
                                                  uci: 'e8g8',
                                                  fen: 'rnbq1rk1/ppp2ppp/4pn2/3p4/3P4/4PNP1/PPP2PP1/RN1QKB1R w KQ - 1 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'Black castles kingside, getting the king to safety. Even though the h-file is open, Black\'s kingside is still solid with the knight on f6 and pawns on f7/g7.',
                                                  concepts: ['king_safety'],
                                                  arrows: [],
                                                  highlights: [],
                                                  isMainLine: true,
                                                  children: [
                                                    {
                                                      id: 'london-7w-Bd3',
                                                      san: 'Bd3',
                                                      uci: 'f1d3',
                                                      fen: 'rnbq1rk1/ppp2ppp/4pn2/3p4/3P4/3BPNP1/PPP2PP1/RN1QK2R b KQ - 2 7',
                                                      moveNumber: 13,
                                                      color: 'w',
                                                      explanation:
                                                        'White develops the light-squared bishop to its ideal square d3, eyeing the kingside (particularly h7). This bishop combines with the open h-file to create potential attacking chances. The London development scheme is nearly complete.',
                                                      strategicIdea:
                                                        'The Bd3 + open h-file combination is White\'s main attacking idea in this London line. The bishop targets h7 and can support a future e4 pawn break.',
                                                      concepts: ['development', 'piece_activity'],
                                                      arrows: [
                                                        { from: 'd3', to: 'h7', color: 'rgba(247, 198, 49, 0.4)' },
                                                      ],
                                                      highlights: [],
                                                      isMainLine: true,
                                                      children: [
                                                        {
                                                          id: 'london-7b-c5',
                                                          san: 'c5',
                                                          uci: 'c7c5',
                                                          fen: 'rnbq1rk1/pp3ppp/4pn2/2pp4/3P4/3BPNP1/PPP2PP1/RN1QK2R w KQ - 0 8',
                                                          moveNumber: 14,
                                                          color: 'b',
                                                          explanation:
                                                            'Black counter-attacks the d4 pawn, the standard plan against any d4 setup. This creates tension in the center that White must address.',
                                                          concepts: ['center_control', 'pawn_structure'],
                                                          arrows: [
                                                            { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                                                          ],
                                                          highlights: [],
                                                          isMainLine: true,
                                                          children: [
                                                            {
                                                              id: 'london-8w-c3',
                                                              san: 'c3',
                                                              uci: 'c2c3',
                                                              fen: 'rnbq1rk1/pp3ppp/4pn2/2pp4/3P4/2PBPNP1/PP3PP1/RN1QK2R b KQ - 0 8',
                                                              moveNumber: 15,
                                                              color: 'w',
                                                              explanation:
                                                                'White reinforces d4 with c3, completing the London pyramid. The structure c3-d4-e3 is rock solid. White is now ready for Nbd2, O-O (or keep the rook on h1 for attack), and eventually aim for the e4 break.',
                                                              strategicIdea:
                                                                'The completed London pyramid (c3, d4, e3) with Bd3, Nf3, and the open h-file gives White a very comfortable middlegame. The plan is Nbd2, Qe2, and then play for e4.',
                                                              concepts: ['center_control', 'pawn_structure'],
                                                              arrows: [],
                                                              highlights: [
                                                                { square: 'c3', color: '#96bc4b30' },
                                                                { square: 'd4', color: '#96bc4b30' },
                                                                { square: 'e3', color: '#96bc4b30' },
                                                              ],
                                                              isMainLine: true,
                                                              children: [
                                                                {
                                                                  id: 'london-8b-Nc6',
                                                                  san: 'Nc6',
                                                                  uci: 'b8c6',
                                                                  fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3P4/2PBPNP1/PP3PP1/RN1QK2R w KQ - 1 9',
                                                                  moveNumber: 16,
                                                                  color: 'b',
                                                                  explanation:
                                                                    'Black develops the knight to c6, adding pressure to d4 and preparing to bring more pieces into the game. Both sides now have a clear plan: White aims for e4, Black targets d4.',
                                                                  concepts: ['development', 'center_control'],
                                                                  arrows: [
                                                                    { from: 'c6', to: 'd4', color: 'rgba(202, 52, 49, 0.4)' },
                                                                  ],
                                                                  highlights: [],
                                                                  isMainLine: true,
                                                                  children: [
                                                                    {
                                                                      id: 'london-9w-Nbd2',
                                                                      san: 'Nbd2',
                                                                      uci: 'b1d2',
                                                                      fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3P4/2PBPNP1/PP1N1PP1/R2QK2R b KQ - 2 9',
                                                                      moveNumber: 17,
                                                                      color: 'w',
                                                                      explanation:
                                                                        'White develops the last minor piece. The knight goes to d2 rather than c3 because c3 is occupied by a pawn. From d2, the knight supports the e4 push — White\'s main strategic break in the London System.',
                                                                      strategicIdea:
                                                                        'With all pieces developed, White\'s next goal is the e4 pawn break. After Qe2 and O-O (or keeping the rook on h1), playing e4 would open the center favorably for White.',
                                                                      concepts: ['development', 'center_control'],
                                                                      arrows: [
                                                                        { from: 'd2', to: 'e4', color: 'rgba(247, 198, 49, 0.4)' },
                                                                      ],
                                                                      highlights: [],
                                                                      isMainLine: true,
                                                                      children: [
                                                                        {
                                                                          id: 'london-9b-Qe7',
                                                                          san: 'Qe7',
                                                                          uci: 'd8e7',
                                                                          fen: 'r1b2rk1/pp2qppp/2n1pn2/2pp4/3P4/2PBPNP1/PP1N1PP1/R2QK2R w KQ - 3 10',
                                                                          moveNumber: 18,
                                                                          color: 'b',
                                                                          explanation:
                                                                            'Black places the queen on e7, connecting the rooks and preparing to place the bishop on d7 or b7. This is a flexible position where both sides have clear plans.',
                                                                          concepts: ['development'],
                                                                          arrows: [],
                                                                          highlights: [],
                                                                          isMainLine: true,
                                                                          children: [
                                                                            {
                                                                              id: 'london-10w-Qe2',
                                                                              san: 'Qe2',
                                                                              uci: 'd1e2',
                                                                              fen: 'r1b2rk1/pp2qppp/2n1pn2/2pp4/3P4/2PBPNP1/PP1NQPP1/R3K2R b KQ - 4 10',
                                                                              moveNumber: 19,
                                                                              color: 'w',
                                                                              explanation:
                                                                                'White places the queen on e2, supporting the planned e4 break and keeping the option of castling either side. The position is ready for action — White can castle queenside for an attacking setup or castle kingside for a safer approach.',
                                                                              strategicIdea:
                                                                                'The London System has reached its ideal setup. All pieces are developed, the center is solid, and White has a clear plan: play e4 to open lines and activate the pieces. This is a textbook London middlegame.',
                                                                              concepts: ['development', 'center_control'],
                                                                              arrows: [
                                                                                { from: 'e3', to: 'e4', color: 'rgba(247, 198, 49, 0.4)' },
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
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                                // === 4...c5 — Center Strike ===
                                {
                                  id: 'london-4b-c5',
                                  san: 'c5',
                                  uci: 'c7c5',
                                  fen: 'rnbqkb1r/pp3ppp/4pn2/2pp4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 0 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  branchLabel: 'Center Strike',
                                  branchDescription: 'Black strikes at the center with c5, challenging White\'s d4 pawn',
                                  explanation:
                                    'Black attacks the d4 pawn with c5, the most active counter-plan against the London System. By challenging the center immediately, Black tries to undermine White\'s solid pawn structure before it\'s fully established.',
                                  concepts: ['center_control', 'pawn_structure'],
                                  arrows: [
                                    { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                                  ],
                                  highlights: [],
                                  isMainLine: false,
                                  children: [
                                    {
                                      id: 'london-5w-c3',
                                      san: 'c3',
                                      uci: 'c2c3',
                                      fen: 'rnbqkb1r/pp3ppp/4pn2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White reinforces the d4 pawn with c3, completing the "London pyramid" — pawns on c3, d4, and e3. This rock-solid structure gives White a firm grip on the center. Even if Black trades on d4, White recaptures with cxd4 or exd4, maintaining the center.',
                                      strategicIdea:
                                        'The London pyramid (c3, d4, e3) is nearly unbreakable. It gives White a permanent space advantage in the center and provides a stable foundation for piece play on either flank.',
                                      concepts: ['center_control', 'pawn_structure'],
                                      arrows: [],
                                      highlights: [
                                        { square: 'c3', color: '#96bc4b30' },
                                        { square: 'd4', color: '#96bc4b30' },
                                        { square: 'e3', color: '#96bc4b30' },
                                      ],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'london-cs-5b-Nc6',
                                          san: 'Nc6',
                                          uci: 'b8c6',
                                          fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R w KQkq - 1 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black develops the knight, adding pressure to d4. This is the natural follow-up after ...c5 — Black builds up forces against the center.',
                                          concepts: ['development', 'center_control'],
                                          arrows: [
                                            { from: 'c6', to: 'd4', color: 'rgba(202, 52, 49, 0.4)' },
                                          ],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'london-cs-6w-Nbd2',
                                              san: 'Nbd2',
                                              uci: 'b1d2',
                                              fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2P1PN2/PP1N1PPP/R2QKB1R b KQkq - 2 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White develops the knight to d2, continuing the standard London setup. From d2, the knight supports e4 and keeps the position flexible.',
                                              concepts: ['development'],
                                              arrows: [
                                                { from: 'd2', to: 'e4', color: 'rgba(247, 198, 49, 0.4)' },
                                              ],
                                              highlights: [],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'london-cs-6b-Bd6',
                                                  san: 'Bd6',
                                                  uci: 'f8d6',
                                                  fen: 'r1bqk2r/pp3ppp/2nbpn2/2pp4/3P1B2/2P1PN2/PP1N1PPP/R2QKB1R w KQkq - 3 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'Black develops the bishop to d6, challenging the London bishop. This forces the familiar decision — retreat to g3 or trade.',
                                                  concepts: ['development', 'piece_activity'],
                                                  arrows: [
                                                    { from: 'd6', to: 'f4', color: 'rgba(202, 52, 49, 0.5)' },
                                                  ],
                                                  highlights: [],
                                                  isMainLine: true,
                                                  children: [
                                                    {
                                                      id: 'london-cs-7w-Bg3',
                                                      san: 'Bg3',
                                                      uci: 'f4g3',
                                                      fen: 'r1bqk2r/pp3ppp/2nbpn2/2pp4/3P4/2P1PNB1/PP1N1PPP/R2QKB1R b KQkq - 4 7',
                                                      moveNumber: 13,
                                                      color: 'w',
                                                      explanation:
                                                        'White retreats to g3, maintaining the bishop pair as in the main line. The position will often transpose to similar structures after Black castles.',
                                                      concepts: ['piece_activity'],
                                                      arrows: [],
                                                      highlights: [],
                                                      isMainLine: true,
                                                      children: [
                                                        {
                                                          id: 'london-cs-7b-OO',
                                                          san: 'O-O',
                                                          uci: 'e8g8',
                                                          fen: 'r1bq1rk1/pp3ppp/2nbpn2/2pp4/3P4/2P1PNB1/PP1N1PPP/R2QKB1R w KQ - 5 8',
                                                          moveNumber: 14,
                                                          color: 'b',
                                                          explanation:
                                                            'Black castles, reaching a rich middlegame position. Both sides have clear plans: White aims for Bd3, Qe2, e4; Black will continue to pressure d4 and develop the remaining pieces.',
                                                          concepts: ['king_safety', 'development'],
                                                          arrows: [],
                                                          highlights: [],
                                                          isMainLine: true,
                                                          children: [
                                                            {
                                                              id: 'london-cs-8w-Bd3',
                                                              san: 'Bd3',
                                                              uci: 'f1d3',
                                                              fen: 'r1bq1rk1/pp3ppp/2nbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QK2R b KQ - 6 8',
                                                              moveNumber: 15,
                                                              color: 'w',
                                                              explanation:
                                                                'White develops the bishop to d3, eyeing the kingside and preparing to castle. The London setup is nearly complete — next comes Qe2 and O-O, followed by the e4 break.',
                                                              strategicIdea:
                                                                'Even in the center-strike variation, the London plan remains the same: develop all pieces, build the pyramid, then play for e4. The system\'s consistency is its greatest strength.',
                                                              concepts: ['development', 'piece_activity'],
                                                              arrows: [
                                                                { from: 'd3', to: 'h7', color: 'rgba(247, 198, 49, 0.4)' },
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
                                },
                              ],
                            },
                          ],
                        },
                        // === 3...c5 — Early c5 Push ===
                        {
                          id: 'london-3b-c5',
                          san: 'c5',
                          uci: 'c7c5',
                          fen: 'rnbqkb1r/pp2pppp/5n2/2pp4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Early c5 Push',
                          branchDescription: 'Black immediately challenges d4 with c5 before committing to e6',
                          explanation:
                            'Black aggressively challenges the d4 pawn before even playing e6. This is a popular counter-plan — by striking at the center early, Black tries to disrupt White\'s comfortable London setup. However, White responds calmly by reinforcing the center.',
                          concepts: ['center_control'],
                          arrows: [
                            { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                          ],
                          highlights: [],
                          isMainLine: false,
                          children: [
                            {
                              id: 'london-4w-c3-early',
                              san: 'c3',
                              uci: 'c2c3',
                              fen: 'rnbqkb1r/pp2pppp/5n2/2pp4/3P1B2/2P1P3/PP3PPP/RN1QKBNR b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White calmly reinforces d4 with c3. This is the London player\'s standard response to any c5 push — strengthen the center and maintain the solid structure. The beauty of the London System is that you always have a simple, effective response.',
                              strategicIdea:
                                'As a "system" opening, the London has standard responses to common Black ideas. Against c5, simply play c3 to support d4. No complicated memorization required!',
                              concepts: ['center_control', 'pawn_structure'],
                              arrows: [],
                              highlights: [
                                { square: 'c3', color: '#96bc4b30' },
                                { square: 'd4', color: '#96bc4b30' },
                                { square: 'e3', color: '#96bc4b30' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'london-ec-4b-Nc6',
                                  san: 'Nc6',
                                  uci: 'b8c6',
                                  fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/3P1B2/2P1P3/PP3PPP/RN1QKBNR w KQkq - 1 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black develops the knight, continuing to pressure d4. White should continue with the standard London development.',
                                  concepts: ['development', 'center_control'],
                                  arrows: [
                                    { from: 'c6', to: 'd4', color: 'rgba(202, 52, 49, 0.4)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'london-ec-5w-Nf3',
                                      san: 'Nf3',
                                      uci: 'g1f3',
                                      fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R b KQkq - 2 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White develops naturally with Nf3. The London plan stays the same: Nf3, Nbd2, Bd3, O-O, and aim for e4.',
                                      concepts: ['development'],
                                      arrows: [],
                                      highlights: [],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'london-ec-5b-e6',
                                          san: 'e6',
                                          uci: 'e7e6',
                                          fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black plays e6, reinforcing d5 and preparing to develop the dark-squared bishop. The position has transposed to a common London structure.',
                                          concepts: ['pawn_structure', 'development'],
                                          arrows: [],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'london-ec-6w-Nbd2',
                                              san: 'Nbd2',
                                              uci: 'b1d2',
                                              fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P1B2/2P1PN2/PP1N1PPP/R2QKB1R b KQkq - 1 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White completes the minor piece development. The knight on d2 supports e4 and keeps the London structure intact.',
                                              concepts: ['development'],
                                              arrows: [
                                                { from: 'd2', to: 'e4', color: 'rgba(247, 198, 49, 0.4)' },
                                              ],
                                              highlights: [],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'london-ec-6b-Bd6',
                                                  san: 'Bd6',
                                                  uci: 'f8d6',
                                                  fen: 'r1bqk2r/pp3ppp/2nbpn2/2pp4/3P1B2/2P1PN2/PP1N1PPP/R2QKB1R w KQkq - 2 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'Black challenges the London bishop, reaching the standard structure. The game often continues with Bg3, Bxg3, hxg3 and White gets the open h-file.',
                                                  concepts: ['development', 'piece_activity'],
                                                  arrows: [
                                                    { from: 'd6', to: 'f4', color: 'rgba(202, 52, 49, 0.5)' },
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
                    },
                  ],
                },
                // === 2...c5 — Immediate c5 ===
                {
                  id: 'london-2b-c5',
                  san: 'c5',
                  uci: 'c7c5',
                  fen: 'rnbqkbnr/pp1ppppp/8/2pp4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'Immediate c5',
                  branchDescription: 'Black strikes at d4 immediately — the most aggressive challenge to the London',
                  explanation:
                    'Black wastes no time and attacks d4 right away with c5. This is the most aggressive response to the London\'s Bf4. Black wants to challenge the center before White builds the full pyramid. White should stay calm and continue the standard setup.',
                  concepts: ['center_control'],
                  arrows: [
                    { from: 'c5', to: 'd4', color: 'rgba(202, 52, 49, 0.5)' },
                  ],
                  highlights: [],
                  isMainLine: false,
                  children: [
                    {
                      id: 'london-3w-e3-imm',
                      san: 'e3',
                      uci: 'e2e3',
                      fen: 'rnbqkbnr/pp1ppppp/8/2pp4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        'White continues with the standard London plan — e3 supports d4 and prepares to develop the light-squared bishop. There\'s no need to panic about c5. The London\'s solid structure can handle Black\'s aggression without deviating from the plan.',
                      strategicIdea:
                        'One of the London System\'s greatest strengths is that you rarely need to deviate from the plan. Even against aggressive counter-play, sticking to the setup (e3, Nf3, Bd3, c3) is usually the best approach.',
                      concepts: ['center_control', 'pawn_structure'],
                      arrows: [],
                      highlights: [
                        { square: 'd4', color: '#96bc4b30' },
                        { square: 'e3', color: '#96bc4b30' },
                      ],
                      isMainLine: true,
                      children: [
                        {
                          id: 'london-3b-Nc6-imm',
                          san: 'Nc6',
                          uci: 'b8c6',
                          fen: 'r1bqkbnr/pp1ppppp/2n5/2pp4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 1 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'Black develops the knight, adding more pressure to d4. White should continue with Nf3 and then c3 to solidify the center. The position is perfectly playable for White — the London setup handles this naturally.',
                          concepts: ['development', 'center_control'],
                          arrows: [
                            { from: 'c6', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                          ],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            {
                              id: 'london-imm-4w-Nf3',
                              san: 'Nf3',
                              uci: 'g1f3',
                              fen: 'r1bqkbnr/pp1ppppp/2n5/2pp4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 2 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White continues development calmly. The knight defends d4 and prepares castling. The London player handles aggressive responses with composure.',
                              concepts: ['development', 'center_control'],
                              arrows: [],
                              highlights: [],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'london-imm-4b-e6',
                                  san: 'e6',
                                  uci: 'e7e6',
                                  fen: 'r1bqkbnr/pp2pppp/2n1p3/2pp4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 0 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black plays e6, supporting d5 and preparing to develop the bishop. The game transposes to well-known London structures.',
                                  concepts: ['development', 'pawn_structure'],
                                  arrows: [],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'london-imm-5w-c3',
                                      san: 'c3',
                                      uci: 'c2c3',
                                      fen: 'r1bqkbnr/pp2pppp/2n1p3/2pp4/3P1B2/2P1PN2/PP3PPP/RN1QKB1R b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White completes the London pyramid. Regardless of Black\'s aggressive early c5, the standard structure works perfectly. This is the power of a system opening!',
                                      concepts: ['center_control', 'pawn_structure'],
                                      arrows: [],
                                      highlights: [
                                        { square: 'c3', color: '#96bc4b30' },
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
              ],
            },
          ],
        },
        // === 1...Nf6 — Indian Setup ===
        {
          id: 'london-1b-Nf6',
          san: 'Nf6',
          uci: 'g8f6',
          fen: 'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2',
          moveNumber: 2,
          color: 'b',
          branchLabel: 'Indian Setup',
          branchDescription: 'Black plays Nf6, keeping options open for an Indian Defense setup',
          explanation:
            'Black develops the knight first, keeping flexible options — this could transpose into a King\'s Indian, Nimzo-Indian, or other setups depending on future moves. The great news for London players: the response is the same!',
          concepts: ['development'],
          arrows: [],
          highlights: [],
          isMainLine: false,
          children: [
            {
              id: 'london-2w-Bf4-indian',
              san: 'Bf4',
              uci: 'c1f4',
              fen: 'rnbqkb1r/pppppppp/5n2/8/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                'Same London approach regardless of Black\'s first move! White plays Bf4 before e3, exactly as in the main line. This is the beauty of a system opening — you don\'t need to memorize different responses for different Black setups. Bf4 is always the second move.',
              strategicIdea:
                'System openings like the London remove the burden of memorizing countless variations. Whether Black plays d5, Nf6, c5, or anything else, White plays Bf4 and follows the same plan. This is why the London is so beginner-friendly.',
              concepts: ['development', 'piece_activity'],
              arrows: [
                { from: 'f4', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
              ],
              highlights: [{ square: 'f4', color: '#96bc4b40' }],
              isMainLine: true,
              children: [
                {
                  id: 'london-ind-2b-d5',
                  san: 'd5',
                  uci: 'd7d5',
                  fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  explanation:
                    'Black plays d5, and the game now transposes into the same main London structure. This is the beauty of the London — regardless of Black\'s move order, the position converges to familiar territory.',
                  concepts: ['center_control'],
                  arrows: [],
                  highlights: [],
                  isMainLine: true,
                  children: [
                    {
                      id: 'london-ind-3w-e3',
                      san: 'e3',
                      uci: 'e2e3',
                      fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        'White plays e3, supporting d4 and freeing the light-squared bishop. The position has fully transposed to the main London line.',
                      concepts: ['center_control', 'development'],
                      arrows: [],
                      highlights: [],
                      isMainLine: true,
                      children: [
                        {
                          id: 'london-ind-3b-e6',
                          san: 'e6',
                          uci: 'e7e6',
                          fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'Black plays e6, and the position is identical to the main line after 1.d4 d5 2.Bf4 Nf6 3.e3 e6. This shows how different move orders lead to the same London positions.',
                          concepts: ['pawn_structure'],
                          arrows: [],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            {
                              id: 'london-ind-4w-Nf3',
                              san: 'Nf3',
                              uci: 'g1f3',
                              fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R b KQkq - 1 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White develops the knight. The position is now identical to the main London line, confirming the transposition. White continues with Bd3, O-O, Nbd2, c3 as usual.',
                              concepts: ['development'],
                              arrows: [],
                              highlights: [],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'london-ind-4b-Bd6',
                                  san: 'Bd6',
                                  uci: 'f8d6',
                                  fen: 'rnbqk2r/ppp2ppp/3bpn2/3p4/3P1B2/4PN2/PPP2PPP/RN1QKB1R w KQkq - 2 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black challenges the London bishop as in the main line. The game continues with Bg3, Bxg3, hxg3, and White gets the open h-file for attacking chances.',
                                  concepts: ['development', 'piece_activity'],
                                  arrows: [
                                    { from: 'd6', to: 'f4', color: 'rgba(202, 52, 49, 0.5)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'london-ind-5w-Bg3',
                                      san: 'Bg3',
                                      uci: 'f4g3',
                                      fen: 'rnbqk2r/ppp2ppp/3bpn2/3p4/3P4/4PNB1/PPP2PPP/RN1QKB1R b KQkq - 3 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White retreats, maintaining the bishop. If Black trades, White gets the open h-file. The position has fully merged with the main line.',
                                      concepts: ['piece_activity'],
                                      arrows: [],
                                      highlights: [],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'london-ind-5b-OO',
                                          san: 'O-O',
                                          uci: 'e8g8',
                                          fen: 'rnbq1rk1/ppp2ppp/3bpn2/3p4/3P4/4PNB1/PPP2PPP/RN1QKB1R w KQ - 4 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black castles. White continues with Bd3 and the standard London plan. The Indian move order has fully transposed into the main London line.',
                                          concepts: ['king_safety'],
                                          arrows: [],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'london-ind-6w-Bd3',
                                              san: 'Bd3',
                                              uci: 'f1d3',
                                              fen: 'rnbq1rk1/ppp2ppp/3bpn2/3p4/3P4/3BPNB1/PPP2PPP/RN1QK2R b KQ - 5 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White develops the bishop to d3, completing the standard London setup. The bishop eyes h7 and supports the future e4 break. The London system works identically regardless of Black\'s move order — this is its greatest strength for beginners.',
                                              strategicIdea:
                                                'The Indian move order (1...Nf6 instead of 1...d5) makes no practical difference against the London. White always reaches the same comfortable setup. This is why the London is called a "system" — one plan fits all!',
                                              concepts: ['development', 'piece_activity'],
                                              arrows: [
                                                { from: 'd3', to: 'h7', color: 'rgba(247, 198, 49, 0.4)' },
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
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
