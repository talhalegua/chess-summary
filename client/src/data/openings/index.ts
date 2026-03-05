import type { OpeningDefinition } from '../../types/openings';
import { frenchDefense } from './frenchDefense';
import { italianGame } from './italianGame';
import { londonSystem } from './londonSystem';
import { queensGambit } from './queensGambit';
import { sicilianDefense } from './sicilianDefense';

// Individual exports
export { frenchDefense, italianGame, londonSystem, queensGambit, sicilianDefense };

// All openings array — ordered by difficulty, then by popularity
export const ALL_OPENINGS: OpeningDefinition[] = [
  italianGame,
  londonSystem,
  queensGambit,
  sicilianDefense,
  frenchDefense,
];
