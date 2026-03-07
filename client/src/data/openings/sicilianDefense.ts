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
                                          children: [
                                            // === 6.Bg5 — English Attack ===
                                            {
                                              id: 'sicilian-6w-Bg5',
                                              san: 'Bg5',
                                              uci: 'c1g5',
                                              fen: 'rnbqkb1r/1p2pppp/p2p1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R b KQkq - 1 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              branchLabel: 'English Attack',
                                              branchDescription: 'The most aggressive system against the Najdorf — White pins the knight and prepares a kingside assault with f3, Qd2, and O-O-O',
                                              explanation:
                                                'The most aggressive and theoretically critical response to the Najdorf. White pins the knight on f6 against the queen, creating immediate tension. This bishop on g5 is a key attacking piece — it pressures the kingside, forces Black to make a concrete decision about how to handle the pin, and prepares the f3-Qd2-O-O-O setup known as the English Attack.',
                                              strategicIdea:
                                                'White\'s plan is straightforward but deadly: develop with Be2 or f3, castle queenside, and launch a full-scale kingside assault with g4-g5. The pin on the knight adds a tactical dimension — Black must always be alert to e5 breakthroughs and Nd5 sacrifices.',
                                              watchOutFor:
                                                'This line leads to some of the sharpest and most analyzed positions in chess. The Poisoned Pawn variation (6...e6 7.f3 Qb6) is one of the most famous and complex lines in all of opening theory.',
                                              concepts: ['piece_activity', 'tactical_threat', 'king_safety'],
                                              arrows: [
                                                { from: 'g5', to: 'f6', color: 'rgba(202, 52, 49, 0.4)' },
                                                { from: 'g5', to: 'd8', color: 'rgba(202, 52, 49, 0.2)' },
                                              ],
                                              highlights: [
                                                { square: 'g5', color: '#ca343140' },
                                                { square: 'f6', color: '#ca343130' },
                                              ],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'sicilian-6b-e6',
                                                  san: 'e6',
                                                  uci: 'e7e6',
                                                  fen: 'rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'The main response, creating a solid pawn chain on d6-e6 while opening the diagonal for the dark-squared bishop. The pawn on e6 supports the d5 square and prepares ...Be7 to break the pin. This move defines the Najdorf\'s classical approach — solid structure first, then dynamic counterplay.',
                                                  strategicIdea:
                                                    'By playing ...e6 rather than ...e5, Black maintains flexibility and keeps the position closed enough to survive White\'s kingside attack. The d5 square becomes a potential outpost, and the ...b5 expansion remains on the agenda.',
                                                  concepts: ['pawn_structure', 'center_control', 'prophylaxis'],
                                                  arrows: [
                                                    { from: 'e6', to: 'd5', color: 'rgba(150, 188, 75, 0.4)' },
                                                    { from: 'f8', to: 'e7', color: 'rgba(150, 188, 75, 0.3)' },
                                                  ],
                                                  highlights: [
                                                    { square: 'e6', color: '#96bc4b30' },
                                                  ],
                                                  isMainLine: true,
                                                  children: [
                                                    {
                                                      id: 'sicilian-7w-f3',
                                                      san: 'f3',
                                                      uci: 'f2f3',
                                                      fen: 'rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N2P2/PPP3PP/R2QKB1R b KQkq - 0 7',
                                                      moveNumber: 13,
                                                      color: 'w',
                                                      explanation:
                                                        'A key move in the English Attack setup. White reinforces the e4 pawn with f3 instead of developing the bishop, signaling aggressive intentions. This pawn on f3 supports a future g4 pawn storm and keeps the center rock-solid. White is preparing to castle queenside and launch a direct kingside attack.',
                                                      strategicIdea:
                                                        'The f3 pawn serves multiple purposes: it over-protects e4, prepares g4-g5 to drive away the f6 knight, and opens the f-file for a rook after the eventual pawn storm. This is the hallmark of the English Attack — slow build-up followed by a devastating kingside assault.',
                                                      concepts: ['pawn_structure', 'king_safety', 'space_advantage'],
                                                      arrows: [
                                                        { from: 'f3', to: 'e4', color: 'rgba(202, 52, 49, 0.3)' },
                                                        { from: 'g2', to: 'g4', color: 'rgba(202, 52, 49, 0.2)' },
                                                      ],
                                                      highlights: [
                                                        { square: 'f3', color: '#ca343130' },
                                                      ],
                                                      isMainLine: true,
                                                      children: [
                                                        {
                                                          id: 'sicilian-7b-Be7',
                                                          san: 'Be7',
                                                          uci: 'f8e7',
                                                          fen: 'rnbqk2r/1p2bppp/p2ppn2/6B1/3NP3/2N2P2/PPP3PP/R2QKB1R w KQkq - 1 8',
                                                          moveNumber: 14,
                                                          color: 'b',
                                                          explanation:
                                                            'Black develops the bishop to e7, breaking the pin on the f6 knight and preparing to castle kingside. The bishop on e7 is modest but solid — it defends the king and can later be redeployed. This is the most classical and reliable approach in the Najdorf against the English Attack.',
                                                          strategicIdea:
                                                            'Getting the king to safety is paramount before launching queenside counterplay. Once castled, Black can focus on the plan of ...b5, ...Bb7, and pressure along the c-file and the long diagonal.',
                                                          concepts: ['development', 'king_safety'],
                                                          arrows: [
                                                            { from: 'e7', to: 'g5', color: 'rgba(150, 188, 75, 0.3)' },
                                                          ],
                                                          highlights: [
                                                            { square: 'e7', color: '#96bc4b30' },
                                                          ],
                                                          isMainLine: true,
                                                          children: [
                                                            {
                                                              id: 'sicilian-8w-Qd2',
                                                              san: 'Qd2',
                                                              uci: 'd1d2',
                                                              fen: 'rnbqk2r/1p2bppp/p2ppn2/6B1/3NP3/2N2P2/PPPQ2PP/R3KB1R b KQkq - 2 8',
                                                              moveNumber: 15,
                                                              color: 'w',
                                                              explanation:
                                                                'White places the queen on d2, connecting the rooks and preparing to castle queenside. The queen on d2 also supports the bishop on g5 and prepares the thematic Bh6 maneuver in some lines. This is a classic English Attack formation — Be3/Bg5, f3, Qd2, O-O-O.',
                                                              strategicIdea:
                                                                'With the queen on d2 and O-O-O coming next, White creates a battery on the d-file and frees the king for queenside castling. The plan is clear: castle long, then push g4-g5-h4-h5 to storm Black\'s kingside.',
                                                              concepts: ['development', 'king_safety', 'piece_activity'],
                                                              arrows: [
                                                                { from: 'd2', to: 'g5', color: 'rgba(202, 52, 49, 0.2)' },
                                                              ],
                                                              highlights: [
                                                                { square: 'd2', color: '#ca343130' },
                                                              ],
                                                              isMainLine: true,
                                                              children: [
                                                                {
                                                                  id: 'sicilian-8b-Nbd7',
                                                                  san: 'Nbd7',
                                                                  uci: 'b8d7',
                                                                  fen: 'r1bqk2r/1p1nbppp/p2ppn2/6B1/3NP3/2N2P2/PPPQ2PP/R3KB1R w KQkq - 3 9',
                                                                  moveNumber: 16,
                                                                  color: 'b',
                                                                  explanation:
                                                                    'Black develops the queenside knight to d7, a flexible square that supports multiple plans. From d7, the knight can reroute to c5 (pressuring e4), b6 (supporting ...d5), or even e5. This knight placement also avoids blocking the c-file, which Black needs for counterplay with ...Rc8.',
                                                                  strategicIdea:
                                                                    'The knight on d7 is the Swiss Army knife of the Najdorf. It doesn\'t commit to one plan but supports many — ...Nc5 to attack e4, ...b5 expansion, and ...d5 breaks. Meanwhile, Black keeps the c-file clear for the rook.',
                                                                  concepts: ['development', 'piece_activity', 'prophylaxis'],
                                                                  arrows: [
                                                                    { from: 'd7', to: 'c5', color: 'rgba(150, 188, 75, 0.4)' },
                                                                    { from: 'd7', to: 'e5', color: 'rgba(150, 188, 75, 0.3)' },
                                                                  ],
                                                                  highlights: [],
                                                                  isMainLine: true,
                                                                  children: [
                                                                    {
                                                                      id: 'sicilian-9w-O-O-O',
                                                                      san: 'O-O-O',
                                                                      uci: 'e1c1',
                                                                      fen: 'r1bqk2r/1p1nbppp/p2ppn2/6B1/3NP3/2N2P2/PPPQ2PP/2KR1B1R b kq - 4 9',
                                                                      moveNumber: 17,
                                                                      color: 'w',
                                                                      explanation:
                                                                        'White castles queenside, completing the English Attack setup. The king is now safely tucked away on the queenside while the h-rook is ready to join the kingside attack. This is the starting position for one of the most famous battles in chess — opposite-side castling where both sides race to attack the enemy king.',
                                                                      watchOutFor:
                                                                        'The race is on! White will push g4-g5 to drive away the f6 knight and open lines against Black\'s king. Black must counter swiftly with ...b5 and ...Bb7 to create threats on the queenside. Speed is everything — whoever attacks first usually wins.',
                                                                      concepts: ['king_safety', 'tempo', 'space_advantage'],
                                                                      arrows: [
                                                                        { from: 'g2', to: 'g4', color: 'rgba(202, 52, 49, 0.3)' },
                                                                        { from: 'h2', to: 'h4', color: 'rgba(202, 52, 49, 0.2)' },
                                                                      ],
                                                                      highlights: [
                                                                        { square: 'c1', color: '#ca343120' },
                                                                      ],
                                                                      isMainLine: true,
                                                                      children: [
                                                                        {
                                                                          id: 'sicilian-9b-b5',
                                                                          san: 'b5',
                                                                          uci: 'b7b5',
                                                                          fen: 'r1bqk2r/3nbppp/p2ppn2/1p4B1/3NP3/2N2P2/PPPQ2PP/2KR1B1R w kq - 0 10',
                                                                          moveNumber: 18,
                                                                          color: 'b',
                                                                          explanation:
                                                                            'The thematic queenside expansion! Black pushes ...b5, gaining space on the queenside and preparing ...Bb7 to activate the light-squared bishop on the long diagonal. This is exactly what the earlier ...a6 was preparing — now the b-pawn advances with tempo and purpose, starting Black\'s counterattack against the white king.',
                                                                          strategicIdea:
                                                                            'This is the critical moment in the Najdorf English Attack. Both sides have castled on opposite wings and the race begins. Black\'s plan is ...Bb7, ...Rc8, ...Nc5 or ...Nb6, and eventually ...b4 to crack open the queenside. Every tempo counts in these razor-sharp positions.',
                                                                          watchOutFor:
                                                                            'White will respond with g4-g5, trying to displace the f6 knight and open lines against Black\'s king. Black must find the right balance between attack and defense — ignoring White\'s threats can be fatal, but playing too passively allows White\'s attack to build unchallenged.',
                                                                          concepts: ['space_advantage', 'tempo', 'pawn_structure'],
                                                                          arrows: [
                                                                            { from: 'b5', to: 'b4', color: 'rgba(150, 188, 75, 0.3)' },
                                                                            { from: 'c8', to: 'b7', color: 'rgba(150, 188, 75, 0.3)' },
                                                                          ],
                                                                          highlights: [
                                                                            { square: 'b5', color: '#96bc4b40' },
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
                                          ],
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
                                          children: [
                                            // === 6.Be3 — Yugoslav Attack setup ===
                                            {
                                              id: 'sicilian-6w-Be3',
                                              san: 'Be3',
                                              uci: 'c1e3',
                                              fen: 'rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 1 6',
                                              moveNumber: 11,
                                              color: 'w',
                                              explanation:
                                                'White begins the Yugoslav Attack setup, the most dangerous weapon against the Dragon. The bishop on e3 develops actively, controls key central and queenside squares, and supports the d4 knight. This is the first step in the Be3-f3-Qd2-O-O-O formation that defines the Yugoslav Attack.',
                                              strategicIdea:
                                                'The Yugoslav Attack is White\'s most principled response to the Dragon. White plans to castle queenside and launch a devastating kingside pawn storm with g4-h4-h5, aiming to rip open the h-file and mate the black king. The bishop on e3 is perfectly placed to support this plan.',
                                              concepts: ['development', 'king_safety', 'piece_activity'],
                                              arrows: [
                                                { from: 'e3', to: 'd4', color: 'rgba(202, 52, 49, 0.3)' },
                                                { from: 'e3', to: 'c5', color: 'rgba(202, 52, 49, 0.2)' },
                                              ],
                                              highlights: [
                                                { square: 'e3', color: '#ca343130' },
                                              ],
                                              isMainLine: true,
                                              children: [
                                                {
                                                  id: 'sicilian-6b-Bg7',
                                                  san: 'Bg7',
                                                  uci: 'f8g7',
                                                  fen: 'rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R w KQkq - 2 7',
                                                  moveNumber: 12,
                                                  color: 'b',
                                                  explanation:
                                                    'Black completes the fianchetto, placing the dark-squared bishop on its dream diagonal. The Dragon bishop on g7 is the heart and soul of Black\'s position — it pressures the entire long diagonal from h8 to a1, targets the d4 knight, and exerts latent pressure on White\'s queenside. This bishop must be preserved at all costs.',
                                                  strategicIdea:
                                                    'The fianchettoed bishop is Black\'s most valuable piece in the Dragon. It controls the long diagonal, supports the d4 counter-pressure, and provides defensive coverage for the kingside. White will often try to trade it with Bh6 — Black must decide whether to allow or prevent this exchange.',
                                                  concepts: ['piece_activity', 'development'],
                                                  arrows: [
                                                    { from: 'g7', to: 'a1', color: 'rgba(150, 188, 75, 0.3)' },
                                                    { from: 'g7', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                                                  ],
                                                  highlights: [
                                                    { square: 'g7', color: '#96bc4b40' },
                                                  ],
                                                  isMainLine: true,
                                                  children: [
                                                    {
                                                      id: 'sicilian-7w-f3-dragon',
                                                      san: 'f3',
                                                      uci: 'f2f3',
                                                      fen: 'rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R b KQkq - 0 7',
                                                      moveNumber: 13,
                                                      color: 'w',
                                                      explanation:
                                                        'White reinforces the e4 pawn with f3, the second step of the Yugoslav Attack. This pawn bolsters the center and prepares the Qd2 and O-O-O formation. Just like in the Najdorf English Attack, f3 also prepares a future g4 push to start the kingside pawn storm.',
                                                      strategicIdea:
                                                        'The f3 pawn is a multi-purpose move: it makes e4 rock-solid, prevents any ...Ng4 tricks, and sets up the g4-h4-h5 pawn avalanche that is the hallmark of the Yugoslav Attack. White is building a war machine before launching the assault.',
                                                      concepts: ['pawn_structure', 'center_control', 'space_advantage'],
                                                      arrows: [
                                                        { from: 'f3', to: 'e4', color: 'rgba(202, 52, 49, 0.3)' },
                                                        { from: 'g2', to: 'g4', color: 'rgba(202, 52, 49, 0.2)' },
                                                      ],
                                                      highlights: [
                                                        { square: 'f3', color: '#ca343130' },
                                                      ],
                                                      isMainLine: true,
                                                      children: [
                                                        {
                                                          id: 'sicilian-7b-O-O',
                                                          san: 'O-O',
                                                          uci: 'e8g8',
                                                          fen: 'rnbq1rk1/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R w KQ - 1 8',
                                                          moveNumber: 14,
                                                          color: 'b',
                                                          explanation:
                                                            'Black castles kingside, putting the king in its natural shelter behind the fianchettoed bishop. Castling early is essential in the Dragon — Black needs the king safe before the tactical storm begins. The rook also moves to f8, potentially supporting a future ...f5 break.',
                                                          strategicIdea:
                                                            'Castling completes Black\'s kingside development and connects the rooks. The king is reasonably safe behind the g7 bishop and the g6-f7 pawn chain, though White will target this exact structure with h4-h5 and Bh6. Black must be ready to counter swiftly on the queenside.',
                                                          concepts: ['king_safety', 'development'],
                                                          arrows: [],
                                                          highlights: [
                                                            { square: 'g8', color: '#96bc4b30' },
                                                          ],
                                                          isMainLine: true,
                                                          children: [
                                                            {
                                                              id: 'sicilian-8w-Qd2-dragon',
                                                              san: 'Qd2',
                                                              uci: 'd1d2',
                                                              fen: 'rnbq1rk1/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R b KQ - 2 8',
                                                              moveNumber: 15,
                                                              color: 'w',
                                                              explanation:
                                                                'White places the queen on d2, the penultimate step in the Yugoslav Attack formation. The queen connects the rooks, supports a future Bh6 exchange of the Dragon bishop, and prepares queenside castling. The classic Yugoslav setup — Be3, f3, Qd2, O-O-O — is nearly complete.',
                                                              watchOutFor:
                                                                'After White castles queenside, the Bh6 maneuver becomes a major threat. Trading the Dragon bishop dramatically weakens Black\'s kingside and is often the prelude to a devastating attack. Black must decide whether to allow or prevent this exchange.',
                                                              concepts: ['development', 'piece_activity', 'king_safety'],
                                                              arrows: [
                                                                { from: 'd2', to: 'h6', color: 'rgba(202, 52, 49, 0.3)' },
                                                              ],
                                                              highlights: [
                                                                { square: 'd2', color: '#ca343130' },
                                                              ],
                                                              isMainLine: true,
                                                              children: [
                                                                {
                                                                  id: 'sicilian-8b-Nc6',
                                                                  san: 'Nc6',
                                                                  uci: 'b8c6',
                                                                  fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 3 9',
                                                                  moveNumber: 16,
                                                                  color: 'b',
                                                                  explanation:
                                                                    'Black develops the queenside knight to c6, increasing pressure on the d4 knight and the center. The knight on c6 is well-placed: it attacks d4, supports a future ...d5 break, and can reroute to e5 or a5 depending on the needs of the position. This is the most natural developing move in the Dragon.',
                                                                  strategicIdea:
                                                                    'By challenging the d4 knight, Black forces White to make a decision. If the knight retreats or gets exchanged, Black\'s central control improves significantly. The knight on c6 also supports the key ...d5 pawn break that can blow open the center in Black\'s favor.',
                                                                  concepts: ['development', 'center_control', 'piece_activity'],
                                                                  arrows: [
                                                                    { from: 'c6', to: 'd4', color: 'rgba(150, 188, 75, 0.5)' },
                                                                    { from: 'c6', to: 'e5', color: 'rgba(150, 188, 75, 0.3)' },
                                                                  ],
                                                                  highlights: [],
                                                                  isMainLine: true,
                                                                  children: [
                                                                    {
                                                                      id: 'sicilian-9w-O-O-O-dragon',
                                                                      san: 'O-O-O',
                                                                      uci: 'e1c1',
                                                                      fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R b - - 4 9',
                                                                      moveNumber: 17,
                                                                      color: 'w',
                                                                      explanation:
                                                                        'White castles queenside, completing the Yugoslav Attack formation. The stage is set for one of the most dramatic battles in chess: opposite-side castling with both sides launching full-scale attacks against the enemy king. White will push h4-h5 to crack open the h-file, while Black must race with ...Rc8, ...Ne5, and ...Qa5 or ...a5-a4 on the queenside.',
                                                                      strategicIdea:
                                                                        'This is the starting gun for the Dragon\'s famous opposite-side attacking race. White\'s plan is h4-h5xg6, opening the h-file, combined with Bh6 to trade the Dragon bishop. Black\'s plan is ...Rc8, ...Ne5, ...Nc4 or ...a5-a4 to break through on the queenside first. Precision and speed decide everything.',
                                                                      watchOutFor:
                                                                        'The Yugoslav Attack is one of the sharpest lines in all of chess. Both sides must attack with maximum speed — a single wasted tempo can be the difference between winning and losing. Black should prioritize ...Rc8 and queenside counterplay immediately.',
                                                                      concepts: ['king_safety', 'tempo', 'tactical_threat'],
                                                                      arrows: [
                                                                        { from: 'h2', to: 'h4', color: 'rgba(202, 52, 49, 0.3)' },
                                                                        { from: 'h4', to: 'h5', color: 'rgba(202, 52, 49, 0.2)' },
                                                                      ],
                                                                      highlights: [
                                                                        { square: 'c1', color: '#ca343120' },
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
