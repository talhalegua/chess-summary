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
                                      children: [],
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
                                      children: [],
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
                              children: [],
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
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
