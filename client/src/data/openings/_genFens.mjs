import { Chess } from 'chess.js';

function getFens(moves) {
  const g = new Chess();
  const results = [{ fen: g.fen(), san: 'start' }];
  for (const m of moves) {
    const r = g.move(m);
    if (!r) { console.error('Invalid move:', m, 'at', g.fen()); break; }
    results.push({ fen: g.fen(), san: r.san, uci: r.from + r.to });
  }
  return results;
}

console.log('=== Italian Main (1.e4 e5 2.Nf3 Nc6 3.Bc4) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Giuoco Piano (3...Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb4+) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Bc5','c3','Nf6','d4','exd4','cxd4','Bb4+']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Giuoco Pianissimo (3...Bc5 4.d3 Nf6 5.O-O) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Bc5','d3','Nf6','O-O']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Two Knights (3...Nf6 4.Ng5 d5 5.exd5) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','d5','exd5']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Fried Liver (5...Nxd5 6.Nxf7) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','d5','exd5','Nxd5','Nxf7']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Na5 Defense (5...Na5 6.Bb5+ c6 7.dxc6 bxc6) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','d5','exd5','Na5','Bb5+','c6','dxc6','bxc6']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Nd4 Traxler (5...Bc5 threatening Bxf2+) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Nf6','Ng5','Bc5']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));

console.log('\n=== Hungarian (3...Be7) ===');
getFens(['e4','e5','Nf3','Nc6','Bc4','Be7']).forEach(r => console.log(`${r.san}: ${r.fen} ${r.uci || ''}`));
