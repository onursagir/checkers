import { x } from './x';
import { y } from './y';

const max = 8;

export const vectorWithinBounds: Math.VectorWithinBounds = (vector) =>
  x(vector) >= 1 && x(vector) <= max && y(vector) >= 1 && y(vector) <= max;
