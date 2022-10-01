import { addVector } from '../math/add-vector';
import { vector } from '../math/vector';
import { vectorWithinBounds } from '../math/vector-within-bounds';

export const getAdjacentCells: App.GetAdjacentCells = ({ position, color, isCrowned }) =>
  [
    addVector(position, vector(1, 1 * color)),
    addVector(position, vector(-1, 1 * color)),
    ...(isCrowned ? [addVector(position, vector(1, -1 * color)), addVector(position, vector(-1, -1 * color))] : []),
  ].filter(vectorWithinBounds);
