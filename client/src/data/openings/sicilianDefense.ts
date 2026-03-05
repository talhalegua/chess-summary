import type { OpeningDefinition } from '../../types/openings';

export const sicilianDefense: OpeningDefinition = {
  id: 'sicilian-defense',
  name: 'Sicilian Defense',
  eco: 'B20',
  description:
    'The most popular and aggressive response to 1.e4. Black fights for the center asymmetrically with 1...c5, creating an imbalanced pawn structure that gives both sides winning chances. The Sicilian is the weapon of choice for players who want to play for a win as Black.',
  difficulty: 'intermediate',
  playAs: 'black',
  tags: ['1.e4', 'semi-open', 'asymmetrical', 'counterattack'],
  startingFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  keyIdeas: [
    'Fight for the center asymmetrically with c5 instead of mirroring e5',
    'Create an open c-file after the d4/cxd4 exchange for queenside counterplay',
    'Aim for queenside expansion with ...a6 and ...b5',
    'Control the d5 square \u2014 the most important square for Black in the Sicilian',
    'The Sicilian gives Black genuine winning chances, not just equality',
  ],
  commonMistakes: [
    'Playing too passively \u2014 the Sicilian demands active counterplay to justify the asymmetrical pawn structure',
    'Neglecting development for premature pawn moves on the queenside',
    'Forgetting about king safety in sharp tactical positions where both sides are attacking on opposite flanks',
  ],
  moves: [
    {
      id: 'sicilian-1w-e4',
      san: 'e4',
      uci: 'e2e4',
      fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
      moveNumber: 1,
      color: 'w',
      explanation:
        'White opens with the King\'s Pawn, claiming central space and controlling the d5 and f5 squares. This is the most popular first move in chess, and it opens lines for both the queen and the light-squared bishop. As Black, we need to decide how to contest White\'s central claim.',
      strategicIdea:
        'Against 1.e4, Black has a fundamental choice: mirror White\'s center with 1...e5 (symmetrical) or fight for the center indirectly. The Sicilian chooses the latter, creating immediate imbalance.',
      concepts: ['center_control', 'development'],
      arrows: [
        { from: 'e4', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
        { from: 'e4', to: 'f5', color: 'rgba(202, 52, 49, 0.4)' },
      ],
      highlights: [{ square: 'e4', color: '#ca343140' }],
      isMainLine: true,
      children: [
        {
          id: 'sicilian-1b-c5',
          san: 'c5',
          uci: 'c7c5',
          fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
          moveNumber: 2,
          color: 'b',
          explanation:
            'The Sicilian Defense! Instead of mirroring White\'s pawn with 1...e5, Black strikes at the center from the flank with c5. This pawn controls the critical d4 square, preventing White from easily establishing a two-pawn center. The asymmetrical pawn structure guarantees an imbalanced, fighting game where both sides have real winning chances.',
          strategicIdea:
            'The genius of 1...c5 is that it creates an asymmetrical position from the very first move. When White eventually plays d4 and Black captures with cxd4, Black gets a half-open c-file and a central pawn majority \u2014 ideal for queenside counterplay.',
          concepts: ['center_control', 'pawn_structure'],
          arrows: [
            { from: 'c5', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
          ],
          highlights: [{ square: 'c5', color: '#96bc4b40' }],
          isMainLine: true,
          children: [
            {
              id: 'sicilian-2w-Nf3',
              san: 'Nf3',
              uci: 'g1f3',
              fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
              moveNumber: 3,
              color: 'w',
              explanation:
                'White develops the knight to its most natural square, preparing the critical d4 advance. The knight on f3 controls d4 and e5, develops toward the center, and prepares kingside castling. After 2.Nf3, White is ready to play 3.d4, opening the center and entering the Open Sicilian \u2014 the most principled way to challenge Black\'s setup.',
              watchOutFor:
                'White\'s plan is to play d4 next, opening the center while ahead in development. Black must choose their setup carefully \u2014 each response leads to a fundamentally different variation of the Sicilian.',
              concepts: ['development', 'center_control'],
              arrows: [
                { from: 'f3', to: 'd4', color: 'rgba(202, 52, 49, 0.4)' },
              ],
              highlights: [],
              isMainLine: true,
              children: [
                // === 2...d6 — Main Line (Najdorf/Dragon setup) ===
                {
                  id: 'sicilian-2b-d6',
                  san: 'd6',
                  uci: 'd7d6',
                  fen: 'rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'Najdorf/Dragon Setup',
                  branchDescription: 'The most popular choice \u2014 a flexible move that keeps all major Sicilian systems open',
                  explanation:
                    'The most flexible and popular response. By playing 2...d6, Black supports the c5 pawn, controls the e5 square to prevent White\'s knight from jumping there, and keeps options open for virtually every major Sicilian system \u2014 the Najdorf, Dragon, Scheveningen, and Classical. The pawn on d6 is modest but crucial: it forms the backbone of Black\'s position.',
                  strategicIdea:
                    'Flexibility is a powerful weapon in the opening. 2...d6 commits to nothing while keeping every door open. Black waits to see White\'s setup before deciding on a specific variation.',
                  concepts: ['center_control', 'pawn_structure'],
                  arrows: [
                    { from: 'd6', to: 'e5', color: 'rgba(150, 188, 75, 0.5)' },
                  ],
                  highlights: [
                    { square: 'e5', color: '#96bc4b30' },
                  ],
                  isMainLine: true,
                  children: [
                    {
                      id: 'sicilian-3w-d4',
                      san: 'd4',
                      uci: 'd2d4',
                      fen: 'rnbqkbnr/pp2pppp/3p4/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3',
                      moveNumber: 5,
                      color: 'w',
                      explanation:
                        'White strikes at the center with d4, the defining move of the Open Sicilian. White is willing to exchange the d-pawn for Black\'s c-pawn because the resulting position gives White a central space advantage with the pawn on e4. However, this exchange also gives Black exactly what the Sicilian promises \u2014 an open c-file and an asymmetrical pawn structure.',
                      strategicIdea:
                        'White opens the center while ahead in development, hoping the space advantage from the e4 pawn will outweigh Black\'s structural assets. This is the fundamental tension of the Sicilian \u2014 White\'s space versus Black\'s dynamics.',
                      watchOutFor:
                        'Black should capture on d4 immediately. Allowing White to maintain pawns on both d4 and e4 would give White a crushing central advantage.',
                      concepts: ['center_control', 'space_advantage', 'tempo'],
                      arrows: [
                        { from: 'd4', to: 'c5', color: 'rgba(202, 52, 49, 0.4)' },
                      ],
                      highlights: [
                        { square: 'd4', color: '#ca343140' },
                        { square: 'e4', color: '#ca343140' },
                      ],
                      isMainLine: true,
                      children: [
                        {
                          id: 'sicilian-3b-cxd4',
                          san: 'cxd4',
                          uci: 'c5d4',
                          fen: 'rnbqkbnr/pp2pppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
                          moveNumber: 6,
                          color: 'b',
                          explanation:
                            'Black captures the d4 pawn, and this exchange is the heart of the Sicilian\'s strategy. By trading the c-pawn for White\'s d-pawn, Black achieves two crucial things: first, the c-file is blown wide open, giving Black a natural highway for rook activity and queenside counterplay. Second, Black now has a central pawn majority (d and e pawns vs White\'s lone e-pawn), which can become powerful in the endgame.',
                          strategicIdea:
                            'The cxd4 exchange is not just a trade \u2014 it\'s a strategic transformation. Black gives up a flank pawn for a center pawn, gaining the open c-file and an asymmetrical structure where both sides have clear plans.',
                          concepts: ['pawn_structure', 'piece_activity'],
                          arrows: [
                            { from: 'c5', to: 'c1', color: 'rgba(150, 188, 75, 0.3)' },
                          ],
                          highlights: [
                            { square: 'c5', color: '#96bc4b30' },
                            { square: 'c8', color: '#96bc4b20' },
                          ],
                          isMainLine: true,
                          children: [
                            {
                              id: 'sicilian-4w-Nxd4',
                              san: 'Nxd4',
                              uci: 'f3d4',
                              fen: 'rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4',
                              moveNumber: 7,
                              color: 'w',
                              explanation:
                                'White recaptures with the knight, placing it on a powerful central square. The knight on d4 controls key squares and can later retreat to various posts. Importantly, White now has a pawn on e4 with no opposing d-pawn \u2014 this gives White more central space. But Black has the open c-file and the potential for a queenside pawn storm with ...a6 and ...b5.',
                              concepts: ['center_control', 'development', 'piece_activity'],
                              arrows: [
                                { from: 'd4', to: 'c6', color: 'rgba(202, 52, 49, 0.3)' },
                                { from: 'd4', to: 'e6', color: 'rgba(202, 52, 49, 0.3)' },
                                { from: 'd4', to: 'f5', color: 'rgba(202, 52, 49, 0.3)' },
                              ],
                              highlights: [
                                { square: 'd4', color: '#ca343140' },
                              ],
                              isMainLine: true,
                              children: [
                                {
                                  id: 'sicilian-4b-Nf6',
                                  san: 'Nf6',
                                  uci: 'g8f6',
                                  fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5',
                                  moveNumber: 8,
                                  color: 'b',
                                  explanation:
                                    'Black develops the knight to its most active square, immediately putting pressure on the e4 pawn \u2014 the foundation of White\'s central space advantage. The knight on f6 controls d5 (the most critical square in the Sicilian), prepares kingside development, and forces White to defend the center. This is Black\'s most natural and popular developing move.',
                                  strategicIdea:
                                    'Attacking the opponent\'s central pawn while developing a piece is a key Sicilian principle. Every Black move should either develop with purpose or prepare queenside counterplay.',
                                  concepts: ['development', 'center_control', 'tactical_threat'],
                                  arrows: [
                                    { from: 'f6', to: 'e4', color: 'rgba(150, 188, 75, 0.4)' },
                                    { from: 'f6', to: 'd5', color: 'rgba(150, 188, 75, 0.4)' },
                                  ],
                                  highlights: [],
                                  isMainLine: true,
                                  children: [
                                    {
                                      id: 'sicilian-5w-Nc3',
                                      san: 'Nc3',
                                      uci: 'b1c3',
                                      fen: 'rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5',
                                      moveNumber: 9,
                                      color: 'w',
                                      explanation:
                                        'White develops the queenside knight to defend the e4 pawn and control the important d5 square. The knight on c3 is perfectly placed: it supports the center, prepares ideas like Nd5 (a powerful outpost), and develops toward the action. This is the starting position for the most theoretically important Sicilian variations \u2014 Black\'s next move determines the entire character of the game.',
                                      watchOutFor:
                                        'This is the critical crossroads. Black must now commit to a specific Sicilian variation. The two most important choices are 5...a6 (Najdorf) and 5...g6 (Dragon), each leading to completely different types of positions.',
                                      concepts: ['development', 'center_control'],
                                      arrows: [
                                        { from: 'c3', to: 'd5', color: 'rgba(202, 52, 49, 0.4)' },
                                        { from: 'c3', to: 'e4', color: 'rgba(202, 52, 49, 0.3)' },
                                      ],
                                      highlights: [
                                        { square: 'd5', color: '#ca343130' },
                                      ],
                                      isMainLine: true,
                                      children: [
                                        // === 5...a6 — Najdorf Variation (Main Line) ===
                                        {
                                          id: 'sicilian-5b-a6',
                                          san: 'a6',
                                          uci: 'a7a6',
                                          fen: 'rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          branchLabel: 'Najdorf Variation',
                                          branchDescription: 'The King of the Sicilians \u2014 the most theoretically important and deeply analyzed chess opening',
                                          explanation:
                                            'The Najdorf Variation \u2014 the most famous and deeply analyzed opening in all of chess, played by world champions from Bobby Fischer to Garry Kasparov to Magnus Carlsen. This humble pawn move to a6 is far more profound than it appears: it prevents White\'s pieces from using the b5 square (stopping Nb5 and Bb5), prepares the queenside pawn expansion with ...b5, and keeps Black\'s position supremely flexible.',
                                          strategicIdea:
                                            'The Najdorf is built on prophylaxis and flexibility. By playing ...a6, Black removes the b5 square from White\'s plans while preparing ...b5 to seize queenside space. The idea is to combine central control (...e5 or ...e6) with queenside expansion (...b5) to create dynamic counterplay against White\'s central space advantage.',
                                          watchOutFor:
                                            'White has many aggressive tries here: 6.Bg5 (the sharpest, leading to the famous Poisoned Pawn variation), 6.Be2 (classical), 6.Be3 (English Attack), and 6.f3 (also English Attack). Each requires specific knowledge from Black.',
                                          concepts: ['prophylaxis', 'pawn_structure', 'space_advantage'],
                                          arrows: [
                                            { from: 'a6', to: 'b5', color: 'rgba(150, 188, 75, 0.5)' },
                                            { from: 'b7', to: 'b5', color: 'rgba(150, 188, 75, 0.3)' },
                                          ],
                                          highlights: [
                                            { square: 'b5', color: '#96bc4b40' },
                                            { square: 'a6', color: '#96bc4b30' },
                                          ],
                                          isMainLine: true,
                                          children: [],
                                        },
                                        // === 5...g6 — Dragon Variation ===
                                        {
                                          id: 'sicilian-5b-g6',
                                          san: 'g6',
                                          uci: 'g7g6',
                                          fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
                                          moveNumber: 10,
                                          color: 'b',
                                          branchLabel: 'Dragon Variation',
                                          branchDescription: 'The fire-breathing Dragon \u2014 Black fianchettoes the bishop for maximum pressure on the long diagonal',
                                          explanation:
                                            'The Dragon Variation! Black prepares to fianchetto the dark-squared bishop on g7, where it will become a fire-breathing monster along the long h8-a1 diagonal. The Dragon bishop targets the center and the queenside, especially pressuring the d4 knight and the b2 pawn. Combined with the open c-file, this gives Black tremendous counterplay against White\'s queenside.',
                                          strategicIdea:
                                            'The Dragon is all about the power of the fianchettoed bishop on g7. This bishop, combined with the open c-file and potential ...b5 expansion, creates a devastating queenside attack. But be warned \u2014 White often responds with the Yugoslav Attack (Be3, Qd2, O-O-O, Bh6), leading to one of the sharpest and most theoretically dense positions in chess where both sides attack on opposite flanks.',
                                          watchOutFor:
                                            'The Yugoslav Attack (Be3, Qd2, O-O-O) is White\'s most dangerous weapon. White will try to trade the Dragon bishop with Bh6 and launch a kingside pawn storm. Black must counter swiftly on the queenside before White\'s attack arrives.',
                                          concepts: ['piece_activity', 'development', 'pawn_structure'],
                                          arrows: [
                                            { from: 'g7', to: 'a1', color: 'rgba(150, 188, 75, 0.3)' },
                                            { from: 'g7', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                                          ],
                                          highlights: [
                                            { square: 'g7', color: '#96bc4b40' },
                                          ],
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
                },

                // === 2...Nc6 — Classical Sicilian ===
                {
                  id: 'sicilian-2b-Nc6',
                  san: 'Nc6',
                  uci: 'b8c6',
                  fen: 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'Classical Sicilian',
                  branchDescription: 'Develops a piece naturally \u2014 leads to the Sveshnikov, Kalashnikov, and Classical systems',
                  explanation:
                    'The Classical approach. Black develops the knight to its most natural square, immediately reinforcing control of the d4 square and putting pressure on the center. Unlike 2...d6, this move develops a piece right away and keeps the d-pawn free to advance to d5 in one go later. This move order can lead to the Sveshnikov (with ...e5), the Kalashnikov, or the Classical Sicilian with ...d6 and ...Nf6.',
                  strategicIdea:
                    'Developing a piece while fighting for central control is always a good idea. The knight on c6 pressures d4, making it harder for White to maintain a broad center. However, it does commit the knight early, and in some lines White can gain time by attacking it with d4-d5.',
                  concepts: ['development', 'center_control'],
                  arrows: [
                    { from: 'c6', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                    { from: 'c6', to: 'e5', color: 'rgba(150, 188, 75, 0.3)' },
                  ],
                  highlights: [],
                  isMainLine: false,
                  children: [],
                },

                // === 2...e6 — Kan/Taimanov/Scheveningen ===
                {
                  id: 'sicilian-2b-e6',
                  san: 'e6',
                  uci: 'e7e6',
                  fen: 'rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
                  moveNumber: 4,
                  color: 'b',
                  branchLabel: 'Kan/Taimanov/Scheveningen',
                  branchDescription: 'A solid, flexible pawn move \u2014 opens the dark-squared bishop and supports ...d5',
                  explanation:
                    'A sophisticated and flexible choice. The pawn on e6 supports a future ...d5 break in one move (the ideal central counter-strike in many Sicilian positions), opens the diagonal for the dark-squared bishop to develop actively, and creates a solid pawn structure. This move can lead to the Kan (...a6), the Taimanov (...Nc6 and ...a6), or the Scheveningen (...d6 with pawns on e6/d6). The cost is that it locks in the light-squared bishop behind the pawn chain.',
                  strategicIdea:
                    'The idea behind 2...e6 is maximum solidity and flexibility. Black builds a sound structure first, then decides on a plan based on White\'s response. The ...d5 break is always in the air, giving Black a dynamic equalizing resource whenever the time is right.',
                  concepts: ['center_control', 'pawn_structure', 'development'],
                  arrows: [
                    { from: 'd7', to: 'd5', color: 'rgba(150, 188, 75, 0.3)' },
                    { from: 'f8', to: 'c5', color: 'rgba(150, 188, 75, 0.3)' },
                  ],
                  highlights: [
                    { square: 'd5', color: '#96bc4b30' },
                  ],
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
};
