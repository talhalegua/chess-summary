import type { OpeningDefinition } from '../../types/openings';

export const italianGame: OpeningDefinition = {
  id: 'italian-game',
  name: 'Italian Game',
  eco: 'C50',
  description:
    'One of the oldest and most natural chess openings. White develops pieces rapidly toward the center and targets the f7 square — the weakest point in Black\'s position. A perfect opening to learn classical chess principles.',
  difficulty: 'beginner',
  playAs: 'white',
  tags: ['1.e4', 'open game', 'classical', 'development'],
  startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  keyIdeas: [
    'Develop pieces quickly toward the center',
    'Target f7 — the weakest square in Black\'s position',
    'Castle kingside early for king safety',
    'Build a strong pawn center with d4',
    'Coordinate pieces for a middlegame attack',
  ],
  commonMistakes: [
    'Moving the queen out too early instead of developing minor pieces',
    'Neglecting to castle before launching an attack',
    'Playing too passively and letting Black equalize the center',
  ],
  moves: [
    {
      id: 'italian-1w-e4',
      san: 'e4',
      uci: 'e2e4',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
      moveNumber: 1,
      color: 'w',
      explanation:
        'The King\'s Pawn opening. White immediately stakes a claim in the center, occupying e4 and controlling the d5 and f5 squares. This move also opens lines for the queen and the light-squared bishop to develop.',
      strategicIdea:
        'Central control is the foundation of classical chess. A pawn on e4 controls key squares and opens diagonals for rapid piece development.',
      concepts: ['center_control', 'development'],
      arrows: [
        { from: 'e4', to: 'd5', color: 'rgba(150, 188, 75, 0.5)' },
        { from: 'e4', to: 'f5', color: 'rgba(150, 188, 75, 0.5)' },
      ],
      highlights: [{ square: 'e4', color: '#96bc4b40' }],
      isMainLine: true,
      children: [
        {
          id: 'italian-1b-e5',
          san: 'e5',
          uci: 'e7e5',
          fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          moveNumber: 2,
          color: 'b',
          explanation:
            'Black mirrors White\'s central claim. The pawn on e5 controls d4 and f4, creating a symmetrical pawn center. This is the most classical response, leading to open positions with tactical possibilities for both sides.',
          concepts: ['center_control'],
          arrows: [],
          highlights: [],
          isMainLine: true,
          children: [
            {
              id: 'italian-2w-Nf3',
              san: 'Nf3',
              uci: 'g1f3',
              fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                'White develops the knight to its most natural square, attacking the e5 pawn immediately. Nf3 controls the critical d4 and e5 squares, develops a piece toward the center, and prepares kingside castling — all in one move.',
              strategicIdea:
                'Every developing move should serve multiple purposes. Nf3 develops, attacks, and prepares castling simultaneously — a textbook opening move.',
              watchOutFor:
                'Black needs to defend the e5 pawn. The most common response is 2...Nc6, which also develops a piece.',
              concepts: ['development', 'center_control', 'tactical_threat'],
              arrows: [
                { from: 'f3', to: 'e5', color: 'rgba(202, 52, 49, 0.5)' },
              ],
              highlights: [],
              isMainLine: true,
              children: [
                {
                  id: 'italian-2b-Nc6',
                  san: 'Nc6',
                  uci: 'b8c6',
                  fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
                  moveNumber: 4,
                  color: 'b',
                  explanation:
                    'Black develops the knight to defend the e5 pawn while also controlling the d4 square. Like White\'s Nf3, this move develops a piece, defends, and fights for the center simultaneously.',
                  concepts: ['development', 'center_control'],
                  arrows: [
                    { from: 'c6', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                    { from: 'c6', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                  ],
                  highlights: [],
                  isMainLine: true,
                  children: [
                    {
                      id: 'italian-3w-Bc4',
                      san: 'Bc4',
                      uci: 'f1c4',
                      fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        'The Italian Game! The bishop develops to its most active diagonal, aiming directly at f7 — the weakest square in Black\'s camp (defended only by the king). This move supports a quick kingside castle and creates immediate tactical pressure along the a2-g8 diagonal.',
                      strategicIdea:
                        'In the opening, develop bishops to open diagonals where they exert maximum influence. The c4 bishop\'s pressure on f7 is a recurring theme throughout this opening.',
                      watchOutFor:
                        'Don\'t rush to attack f7 with Qh5 or Ng5 too early. Instead, continue developing and prepare d4 to open the center.',
                      concepts: ['development', 'tactical_threat', 'piece_activity'],
                      arrows: [
                        { from: 'c4', to: 'f7', color: 'rgba(247, 198, 49, 0.6)' },
                      ],
                      highlights: [
                        { square: 'f7', color: '#ca343140' },
                      ],
                      isMainLine: true,
                      children: [
                        // === 3...Bc5 — Giuoco Piano (Main Line) ===
                        {
                          id: 'italian-3b-Bc5',
                          san: 'Bc5',
                          uci: 'f8c5',
                          fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Giuoco Piano',
                          branchDescription: 'The "Quiet Game" — classical development with mutual bishop play',
                          explanation:
                            'The Giuoco Piano (Italian for "Quiet Game"). Black mirrors White\'s strategy by developing the bishop to an active diagonal. The bishop on c5 targets f2 — the weakest square in White\'s position — creating a symmetrical tension.',
                          strategicIdea:
                            'Both sides have developed their bishops to active diagonals targeting each other\'s weakest squares (f7 and f2). The question now is who will break the symmetry first.',
                          concepts: ['development', 'piece_activity'],
                          arrows: [
                            { from: 'c5', to: 'f2', color: 'rgba(247, 198, 49, 0.5)' },
                          ],
                          highlights: [],
                          isMainLine: true,
                          children: [
                            // 4.c3 — preparing d4
                            {
                              id: 'italian-4w-c3',
                              san: 'c3',
                              uci: 'c2c3',
                              fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              branchLabel: 'Main Line',
                              branchDescription: 'Prepare the central d4 break — the most ambitious continuation',
                              explanation:
                                'White prepares the powerful d4 pawn push. While c3 doesn\'t develop a piece, it\'s a critical preparatory move — after d4, White will establish a dominant pawn center controlling both d4 and e4.',
                              strategicIdea:
                                'Sometimes preparation is more important than immediate development. c3 enables the key d4 break which will open the center favorably for White.',
                              watchOutFor:
                                'Black should develop the kingside knight to f6 and prepare to castle. Delaying development here can be dangerous.',
                              concepts: ['center_control', 'pawn_structure'],
                              arrows: [
                                { from: 'd2', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                              ],
                              highlights: [
                                { square: 'd4', color: '#96bc4b30' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'italian-4b-Nf6',
                                  san: 'Nf6',
                                  uci: 'g8f6',
                                  fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black develops the last minor piece and attacks the e4 pawn. The knight on f6 is perfectly placed: it controls key central squares (d5, e4), prepares kingside castling, and puts immediate pressure on White\'s center.',
                                  concepts: ['development', 'center_control'],
                                  arrows: [
                                    { from: 'f6', to: 'e4', color: 'rgba(202, 52, 49, 0.4)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'italian-5w-d4',
                                      san: 'd4',
                                      uci: 'd2d4',
                                      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'The central break! White pushes d4, challenging Black\'s e5 pawn and opening the center. This is the whole point of the c3 preparation — White now has pawns on d4 and e4, forming a powerful pawn center that controls the key central squares.',
                                      strategicIdea:
                                        'Opening the center when you have better development gives you the initiative. White\'s pieces are ready to exploit open lines, while Black still needs to castle.',
                                      watchOutFor:
                                        'After the pawn exchanges, White will have an isolated d-pawn but excellent piece activity. Don\'t fear the pawn structure — the open lines compensate.',
                                      concepts: ['center_control', 'tempo', 'space_advantage'],
                                      arrows: [],
                                      highlights: [
                                        { square: 'd4', color: '#96bc4b50' },
                                        { square: 'e4', color: '#96bc4b50' },
                                      ],
                                      isMainLine: true,
                                      children: [
                                        {
                                          id: 'italian-5b-exd4',
                                          san: 'exd4',
                                          uci: 'e5d4',
                                          fen: 'r1bqk2r/pppp1ppp/2n2n2/2b5/2BpP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          explanation:
                                            'Black captures the d4 pawn. This is the most natural response — refusing the exchange with other moves often leads to a cramped position for Black after White takes on e5.',
                                          concepts: ['center_control'],
                                          arrows: [],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'italian-6w-cxd4',
                                              san: 'cxd4',
                                              uci: 'c3d4',
                                              fen: 'r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R b KQkq - 0 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White recaptures with the c-pawn, establishing the powerful pawn duo on d4 and e4. This is the ideal center White was building toward — these pawns control nearly every important central square and give White a space advantage.',
                                              strategicIdea:
                                                'A strong pawn center restricts the opponent\'s pieces and creates outposts for your own. The d4+e4 duo is one of the most desirable pawn structures in chess.',
                                              concepts: ['center_control', 'space_advantage', 'pawn_structure'],
                                              arrows: [],
                                              highlights: [
                                                { square: 'd4', color: '#96bc4b50' },
                                                { square: 'e4', color: '#96bc4b50' },
                                                { square: 'd5', color: '#96bc4b30' },
                                                { square: 'e5', color: '#96bc4b30' },
                                                { square: 'f5', color: '#96bc4b30' },
                                                { square: 'c5', color: '#96bc4b30' },
                                              ],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'italian-6b-Bb4',
                                                  san: 'Bb4+',
                                                  uci: 'c5b4',
                                                  fen: 'r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/5N2/PP3PPP/RNBQK2R w KQkq - 1 7',
                                                  moveNumber: 7,
                                                  color: 'b',
                                                  explanation:
                                                    'Black gives check with the bishop, forcing White to deal with the pin. This is the main line of the Giuoco Piano — by checking on b4, Black disrupts White\'s ideal development and forces a decision about how to block.',
                                                  concepts: ['tactical_threat', 'tempo'],
                                                  arrows: [
                                                    { from: 'b4', to: 'e1', color: 'rgba(202, 52, 49, 0.5)' },
                                                  ],
                                                  highlights: [],
                                                  isMainLine: true,
                                                  children: [
                                                    {
                                                      id: 'italian-7w-Bd2',
                                                      san: 'Bd2',
                                                      uci: 'c1d2',
                                                      fen: 'r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/5N2/PP1B1PPP/RN1QK2R b KQkq - 2 7',
                                                      moveNumber: 7,
                                                      color: 'w',
                                                      explanation:
                                                        'White blocks the check with the bishop. This is the most natural interposition — the bishop develops to d2 where it serves a useful defensive role while keeping all pieces coordinated.',
                                                      strategicIdea:
                                                        'When forced to block a check, choose the piece that benefits most from the new square. The bishop on d2 can later reposition to more active squares.',
                                                      concepts: ['development', 'king_safety'],
                                                      arrows: [],
                                                      highlights: [],
                                                      isMainLine: true,
                                                      children: [
                                                        {
                                                          id: 'italian-7b-Bxd2',
                                                          san: 'Bxd2+',
                                                          uci: 'b4d2',
                                                          fen: 'r1bqk2r/pppp1ppp/2n2n2/8/2BPP3/5N2/PP1b1PPP/RN1QK2R w KQkq - 0 8',
                                                          moveNumber: 8,
                                                          color: 'b',
                                                          explanation:
                                                            'Black captures the bishop, exchanging pieces and giving another check. Trading bishops here simplifies the position slightly while maintaining the tension in the center.',
                                                          concepts: ['tactical_threat'],
                                                          arrows: [],
                                                          highlights: [],
                                                          isMainLine: true,
                                                          children: [
                                                            {
                                                              id: 'italian-8w-Nbxd2',
                                                              san: 'Nbxd2',
                                                              uci: 'b1d2',
                                                              fen: 'r1bqk2r/pppp1ppp/2n2n2/8/2BPP3/5N2/PP1N1PPP/R2QK2R b KQkq - 0 8',
                                                              moveNumber: 8,
                                                              color: 'w',
                                                              explanation:
                                                                'White recaptures with the knight, developing it toward the center. The knight on d2 supports the e4 pawn and can later jump to useful squares like b3 or f1.',
                                                              strategicIdea:
                                                                'When recapturing, consider which piece benefits most from the new square. The knight on d2 centralizes while keeping the queen free to act.',
                                                              concepts: ['development', 'center_control'],
                                                              arrows: [],
                                                              highlights: [],
                                                              isMainLine: true,
                                                              children: [
                                                                {
                                                                  id: 'italian-8b-d5',
                                                                  san: 'd5',
                                                                  uci: 'd7d5',
                                                                  fen: 'r1bqk2r/ppp2ppp/2n2n2/3p4/2BPP3/5N2/PP1N1PPP/R2QK2R w KQkq - 0 9',
                                                                  moveNumber: 9,
                                                                  color: 'b',
                                                                  explanation:
                                                                    'Black strikes in the center with d5, challenging White\'s pawn duo. This is the thematic counter-break — by attacking e4 and d4 simultaneously, Black fights for equality and opens lines for their pieces.',
                                                                  concepts: ['center_control', 'tactical_threat'],
                                                                  arrows: [
                                                                    { from: 'd5', to: 'e4', color: 'rgba(202, 52, 49, 0.4)' },
                                                                    { from: 'd5', to: 'c4', color: 'rgba(202, 52, 49, 0.4)' },
                                                                  ],
                                                                  highlights: [],
                                                                  isMainLine: true,
                                                                  children: [
                                                                    {
                                                                      id: 'italian-9w-exd5',
                                                                      san: 'exd5',
                                                                      uci: 'e4d5',
                                                                      fen: 'r1bqk2r/ppp2ppp/2n2n2/3P4/2BP4/5N2/PP1N1PPP/R2QK2R b KQkq - 0 9',
                                                                      moveNumber: 9,
                                                                      color: 'w',
                                                                      explanation:
                                                                        'White captures on d5, maintaining the pawn in the center. The d5 pawn is temporarily advanced and can become a target, but it also cramps Black\'s position and controls key squares.',
                                                                      concepts: ['center_control', 'pawn_structure'],
                                                                      arrows: [],
                                                                      highlights: [
                                                                        { square: 'd5', color: '#96bc4b40' },
                                                                      ],
                                                                      isMainLine: true,
                                                                      children: [
                                                                        {
                                                                          id: 'italian-9b-Nxd5',
                                                                          san: 'Nxd5',
                                                                          uci: 'f6d5',
                                                                          fen: 'r1bqk2r/ppp2ppp/2n5/3n4/2BP4/5N2/PP1N1PPP/R2QK2R w KQkq - 0 10',
                                                                          moveNumber: 10,
                                                                          color: 'b',
                                                                          explanation:
                                                                            'Black recaptures with the knight, placing it on a strong central outpost. The knight on d5 is well-centralized and exerts pressure in all directions. The position is roughly balanced with play for both sides.',
                                                                          concepts: ['center_control', 'piece_activity'],
                                                                          arrows: [],
                                                                          highlights: [
                                                                            { square: 'd5', color: '#96bc4b40' },
                                                                          ],
                                                                          isMainLine: true,
                                                                          children: [
                                                                            {
                                                                              id: 'italian-10w-Qb3',
                                                                              san: 'Qb3',
                                                                              uci: 'd1b3',
                                                                              fen: 'r1bqk2r/ppp2ppp/2n5/3n4/2BP4/1Q3N2/PP1N1PPP/R3K2R b KQkq - 1 10',
                                                                              moveNumber: 10,
                                                                              color: 'w',
                                                                              explanation:
                                                                                'White develops the queen to b3, targeting the d5 knight and the b7 pawn. This creates dual threats and forces Black to respond accurately to avoid material loss.',
                                                                              strategicIdea:
                                                                                'Activating the queen to attack multiple targets simultaneously puts pressure on the opponent. The b3 square is ideal — the queen supports the d-pawn advance and eyes the b7 weakness.',
                                                                              watchOutFor:
                                                                                'Black needs to be careful about the b7 pawn. The knight on d5 is pinned against the b7 pawn indirectly through the queen\'s diagonal.',
                                                                              concepts: ['tactical_threat', 'piece_activity'],
                                                                              arrows: [
                                                                                { from: 'b3', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
                                                                                { from: 'b3', to: 'b7', color: 'rgba(202, 52, 49, 0.4)' },
                                                                              ],
                                                                              highlights: [],
                                                                              isMainLine: true,
                                                                              children: [
                                                                                {
                                                                                  id: 'italian-10b-Na5',
                                                                                  san: 'Na5',
                                                                                  uci: 'c6a5',
                                                                                  fen: 'r1bqk2r/ppp2ppp/8/n2n4/2BP4/1Q3N2/PP1N1PPP/R3K2R w KQkq - 2 11',
                                                                                  moveNumber: 11,
                                                                                  color: 'b',
                                                                                  explanation:
                                                                                    'Black attacks the queen with the knight, forcing it to move. The knight on a5 also eyes the c4 bishop, and this maneuver creates tactical complications that Black can use to equalize.',
                                                                                  concepts: ['tactical_threat', 'tempo'],
                                                                                  arrows: [
                                                                                    { from: 'a5', to: 'b3', color: 'rgba(202, 52, 49, 0.4)' },
                                                                                    { from: 'a5', to: 'c4', color: 'rgba(202, 52, 49, 0.4)' },
                                                                                  ],
                                                                                  highlights: [],
                                                                                  isMainLine: true,
                                                                                  children: [
                                                                                    {
                                                                                      id: 'italian-11w-Qa4',
                                                                                      san: 'Qa4+',
                                                                                      uci: 'b3a4',
                                                                                      fen: 'r1bqk2r/ppp2ppp/8/n2n4/Q1BP4/5N2/PP1N1PPP/R3K2R b KQkq - 3 11',
                                                                                      moveNumber: 11,
                                                                                      color: 'w',
                                                                                      explanation:
                                                                                        'White retreats the queen to a4 with check, gaining a tempo. The check forces Black to respond, and the queen remains active on the a4 square where it continues to exert pressure along the a4-e8 diagonal.',
                                                                                      concepts: ['tactical_threat', 'tempo'],
                                                                                      arrows: [
                                                                                        { from: 'a4', to: 'e8', color: 'rgba(202, 52, 49, 0.4)' },
                                                                                      ],
                                                                                      highlights: [],
                                                                                      isMainLine: true,
                                                                                      children: [
                                                                                        {
                                                                                          id: 'italian-11b-Nc6',
                                                                                          san: 'Nc6',
                                                                                          uci: 'a5c6',
                                                                                          fen: 'r1bqk2r/ppp2ppp/2n5/3n4/Q1BP4/5N2/PP1N1PPP/R3K2R w KQkq - 4 12',
                                                                                          moveNumber: 12,
                                                                                          color: 'b',
                                                                                          explanation:
                                                                                            'Black blocks the check by returning the knight to c6. The knight is well-placed here, defending the center and supporting the d5 knight. Black has weathered the initial pressure.',
                                                                                          concepts: ['development', 'center_control'],
                                                                                          arrows: [],
                                                                                          highlights: [],
                                                                                          isMainLine: true,
                                                                                          children: [
                                                                                            {
                                                                                              id: 'italian-12w-Qb3',
                                                                                              san: 'Qb3',
                                                                                              uci: 'a4b3',
                                                                                              fen: 'r1bqk2r/ppp2ppp/2n5/3n4/2BP4/1Q3N2/PP1N1PPP/R3K2R b KQkq - 5 12',
                                                                                              moveNumber: 12,
                                                                                              color: 'w',
                                                                                              explanation:
                                                                                                'White returns the queen to b3, maintaining pressure on the d5 knight and b7 pawn. This repetition allows White to recentralize the queen while keeping the threats alive. The position is dynamically balanced with chances for both sides in the middlegame.',
                                                                                              strategicIdea:
                                                                                                'Repeating the queen maneuver is not a waste of time — White has gained information about Black\'s setup and can now plan the next phase with the queen ideally placed on b3.',
                                                                                              concepts: ['piece_activity', 'center_control'],
                                                                                              arrows: [
                                                                                                { from: 'b3', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
                                                                                                { from: 'b3', to: 'b7', color: 'rgba(202, 52, 49, 0.4)' },
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
                            // 4.d3 — Giuoco Pianissimo
                            {
                              id: 'italian-4w-d3',
                              san: 'd3',
                              uci: 'd2d3',
                              fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              branchLabel: 'Giuoco Pianissimo',
                              branchDescription: 'The "Very Quiet Game" — solid, slow buildup with fewer risks',
                              explanation:
                                'The Giuoco Pianissimo ("Very Quiet Game"). White opts for a more patient approach, supporting the e4 pawn and opening the diagonal for the dark-squared bishop. This avoids the sharp tactical lines of c3/d4 in favor of a slow, strategic buildup.',
                              strategicIdea:
                                'Not every opening needs to be sharp. The Pianissimo leads to rich middlegame positions where understanding and planning matter more than memorized tactics.',
                              concepts: ['development', 'king_safety'],
                              arrows: [],
                              highlights: [],
                              isMainLine: false,
                              children: [
                                {
                                  id: 'italian-4b-Nf6-pianissimo',
                                  san: 'Nf6',
                                  uci: 'g8f6',
                                  fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black develops naturally. In the Pianissimo, both sides develop pieces and castle before the real fight begins.',
                                  concepts: ['development'],
                                  arrows: [],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'italian-5w-OO',
                                      san: 'O-O',
                                      uci: 'e1g1',
                                      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b kq - 2 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White castles, tucking the king away to safety and connecting the rooks. With all minor pieces developed and the king safe, White is ready to execute a middlegame plan — typically involving a3, b4 to push the c5 bishop, or Re1 to support the center.',
                                      strategicIdea:
                                        'Castle early, castle often! King safety should always be a priority before launching any attack.',
                                      concepts: ['king_safety', 'development'],
                                      arrows: [],
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

                        // === 3...Nf6 — Two Knights Defense ===
                        {
                          id: 'italian-3b-Nf6',
                          san: 'Nf6',
                          uci: 'g8f6',
                          fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Two Knights Defense',
                          branchDescription: 'Aggressive counter-attack — leads to sharp tactical play and the Fried Liver',
                          explanation:
                            'The Two Knights Defense. Instead of the quiet Bc5, Black immediately counter-attacks the e4 pawn with the knight. This is a more aggressive approach — Black invites complications rather than playing symmetrically.',
                          strategicIdea:
                            'Counter-attacking in the center is often the best response to an opponent\'s pressure. By targeting e4, Black forces White to make a decision.',
                          concepts: ['development', 'tactical_threat', 'center_control'],
                          arrows: [
                            { from: 'f6', to: 'e4', color: 'rgba(202, 52, 49, 0.4)' },
                          ],
                          highlights: [],
                          isMainLine: false,
                          children: [
                            {
                              id: 'italian-4w-Ng5',
                              san: 'Ng5',
                              uci: 'f3g5',
                              fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White plays aggressively! The knight jumps to g5, creating a double attack on f7 — both the bishop on c4 and the knight on g5 now target this weak square. Black must respond accurately or face immediate danger.',
                              strategicIdea:
                                'When two pieces target the same weak point, the pressure becomes very hard to defend. The f7 square is a classic target because it\'s only protected by the king.',
                              watchOutFor:
                                'This is a critical moment. Black must play 4...d5 immediately to counter-attack in the center. Any other move risks a devastating attack on f7.',
                              concepts: ['tactical_threat', 'piece_activity'],
                              arrows: [
                                { from: 'g5', to: 'f7', color: 'rgba(202, 52, 49, 0.6)' },
                                { from: 'c4', to: 'f7', color: 'rgba(202, 52, 49, 0.6)' },
                              ],
                              highlights: [
                                { square: 'f7', color: '#ca343160' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'italian-4b-d5',
                                  san: 'd5',
                                  uci: 'd7d5',
                                  fen: 'r1bqkb1r/ppp2ppp/2n2n2/3pp1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'The only good move! Black strikes back in the center with d5, counter-attacking the bishop on c4 and opening lines for their pieces. This is the critical defensive resource — Black must create counter-threats rather than passively defending f7.',
                                  strategicIdea:
                                    'When under attack, the best defense is often a counter-attack. By pushing d5, Black challenges White\'s center and deflects the bishop from its dangerous diagonal.',
                                  concepts: ['center_control', 'tactical_threat', 'tempo'],
                                  arrows: [
                                    { from: 'd5', to: 'c4', color: 'rgba(202, 52, 49, 0.4)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'italian-5w-exd5',
                                      san: 'exd5',
                                      uci: 'e4d5',
                                      fen: 'r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White captures the d5 pawn. Now Black faces a critical decision that determines the entire character of the game. This is the most important branching point in the Two Knights Defense.',
                                      watchOutFor:
                                        'The natural-looking 5...Nxd5 is actually a serious mistake that leads to the famous Fried Liver Attack! The correct defense is 5...Na5.',
                                      concepts: ['center_control'],
                                      arrows: [],
                                      highlights: [],
                                      isMainLine: true,
                                      children: [
                                        // 5...Na5 — Best defense
                                        {
                                          id: 'italian-5b-Na5',
                                          san: 'Na5',
                                          uci: 'c6a5',
                                          fen: 'r1bqkb1r/ppp2ppp/5n2/n2Pp1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 1 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          branchLabel: 'Na5 Defense (Best)',
                                          branchDescription: 'The correct defense — attacks the bishop while keeping the position balanced',
                                          explanation:
                                            'The best theoretical move! The knight attacks the bishop on c4, forcing it to move. While the knight on a5 looks odd on the rim, it serves a crucial purpose: by driving away the bishop, Black removes one of the attackers from the f7 square and gains time to organize their defense.',
                                          strategicIdea:
                                            'In chess, "a knight on the rim is dim" — but rules have exceptions. Here Na5 attacks a key piece and disrupts White\'s coordination, which is more important than the knight\'s placement.',
                                          concepts: ['tactical_threat', 'tempo'],
                                          arrows: [
                                            { from: 'a5', to: 'c4', color: 'rgba(202, 52, 49, 0.5)' },
                                          ],
                                          highlights: [],
                                          isMainLine: true,
                                          children: [
                                            {
                                              id: 'italian-6w-Bb5',
                                              san: 'Bb5+',
                                              uci: 'c4b5',
                                              fen: 'r1bqkb1r/ppp2ppp/5n2/nB1Pp1N1/8/8/PPPP1PPP/RNBQK2R b KQkq - 2 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White retreats the bishop with check, maintaining pressure. The check forces Black to block, after which White can look to recapture on c6 to damage Black\'s pawn structure.',
                                              concepts: ['tactical_threat', 'pawn_structure'],
                                              arrows: [],
                                              highlights: [],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'italian-6b-c6',
                                                  san: 'c6',
                                                  uci: 'c7c6',
                                                  fen: 'r1bqkb1r/pp3ppp/2p2n2/nB1Pp1N1/8/8/PPPP1PPP/RNBQK2R w KQkq - 0 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'Black blocks the check and attacks the d5 pawn simultaneously. This leads to complex play where both sides have chances. The position is roughly equal with correct play from both sides.',
                                                  concepts: ['center_control', 'tactical_threat'],
                                                  arrows: [],
                                                  highlights: [],
                                                  isMainLine: true,
                                                  children: [],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        // 5...Nxd5 — The trap! (Fried Liver)
                                        {
                                          id: 'italian-5b-Nxd5',
                                          san: 'Nxd5',
                                          uci: 'f6d5',
                                          fen: 'r1bqkb1r/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          branchLabel: 'Fried Liver Trap',
                                          branchDescription: 'A natural-looking but dangerous mistake — White sacrifices a knight on f7!',
                                          explanation:
                                            'This looks natural — recapturing a pawn with development. But it\'s actually a serious mistake! The knight on d5 no longer guards f7, and White has a devastating sacrifice available. This is one of the most famous traps in chess.',
                                          watchOutFor:
                                            'This is the critical error that leads to the Fried Liver Attack. At beginner and intermediate levels, many players fall into this trap. Always consider what your opponent\'s threats are before capturing!',
                                          concepts: ['tactical_threat'],
                                          arrows: [],
                                          highlights: [
                                            { square: 'f7', color: '#ca343150' },
                                          ],
                                          isMainLine: false,
                                          children: [
                                            {
                                              id: 'italian-6w-Nxf7',
                                              san: 'Nxf7',
                                              uci: 'g5f7',
                                              fen: 'r1bqkb1r/ppp2Npp/2n5/3np3/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'The Fried Liver Attack! White sacrifices the knight on f7, forcing the Black king to capture (it\'s the only piece defending f7). After Kxf7, the king is exposed in the center with no pawn shelter. White will follow up with Qf3+ gaining tempo, and the attack is devastating.',
                                              strategicIdea:
                                                'A sacrifice can be worth it when the resulting attack is overwhelming. Here, giving up a knight destroys Black\'s king safety entirely — the king will be hunted across the board.',
                                              watchOutFor:
                                                'After Kxf7, White plays Qf3+ attacking the exposed knight on d5 and threatening further checks. Black\'s position collapses quickly.',
                                              concepts: ['sacrifice', 'king_safety', 'tactical_threat'],
                                              arrows: [
                                                { from: 'f7', to: 'e8', color: 'rgba(202, 52, 49, 0.6)' },
                                              ],
                                              highlights: [
                                                { square: 'f7', color: '#ca343160' },
                                              ],
                                              isMainLine: true,
                                              children: [],
                                            },
                                          ],
                                        },
                                        // 5...Bc5 — Traxler Counter-attack
                                        {
                                          id: 'italian-5b-Bc5',
                                          san: 'Bc5',
                                          uci: 'f8c5',
                                          fen: 'r1bqk2r/ppp2ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 6 5',
                                          moveNumber: 10,
                                          color: 'b',
                                          branchLabel: 'Traxler Counter-attack',
                                          branchDescription: 'A wild counter-sacrifice — Black ignores the threat and attacks f2!',
                                          explanation:
                                            'The Traxler Counter-attack! Instead of defending, Black ignores the threat to f7 and counter-attacks f2 with the bishop. This is an extremely sharp and wild variation where both sides are attacking simultaneously. Not for the faint of heart!',
                                          strategicIdea:
                                            'Sometimes the best defense is a counter-attack. By threatening Bxf2+ (winning the right to castle), Black creates mutual dangers that can confuse an unprepared opponent.',
                                          watchOutFor:
                                            'This leads to incredibly complex positions requiring precise calculation from both sides. It\'s risky but can catch opponents off guard.',
                                          concepts: ['sacrifice', 'tactical_threat'],
                                          arrows: [
                                            { from: 'c5', to: 'f2', color: 'rgba(202, 52, 49, 0.5)' },
                                          ],
                                          highlights: [],
                                          isMainLine: false,
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

                        // === 3...Be7 — Hungarian Defense ===
                        {
                          id: 'italian-3b-Be7',
                          san: 'Be7',
                          uci: 'f8e7',
                          fen: 'r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
                          moveNumber: 6,
                          color: 'b',
                          branchLabel: 'Hungarian Defense',
                          branchDescription: 'A passive but solid response — avoids all tactical tricks',
                          explanation:
                            'The Hungarian Defense. Black develops the bishop to a safe but passive square. While this avoids all tactical tricks (no Fried Liver, no pins), the bishop on e7 is much less active than on c5 — it doesn\'t attack anything or control key diagonals.',
                          strategicIdea:
                            'Playing too safely in the opening can give your opponent a free hand in the center. While Be7 is solid, it lets White build an ideal position without any counter-pressure.',
                          concepts: ['development'],
                          arrows: [],
                          highlights: [],
                          isMainLine: false,
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
