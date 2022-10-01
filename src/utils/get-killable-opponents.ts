import { addVector } from '../math/add-vector';
import { scaleVector } from '../math/scale-vector';
import { stringifyVector } from '../math/stringify-vector';
import { subtractVector } from '../math/subtract-vector';
import { vectorWithinBounds } from '../math/vector-within-bounds';
import { getAdjacentCells } from './get-adjacent-cells';
import { getChecker } from './get-checker';

export const getKillableOpponents: App.GetKillableOpponents = (board, checkerId) => {
  const checker = getChecker(board, checkerId);

  return getAdjacentCells(checker)
    .map((adjacentCell) => {
      const targetChecker = board.get(stringifyVector(adjacentCell));

      if (!targetChecker || targetChecker.color === checker.color) return null;

      const displacementToTargetChecker = subtractVector(targetChecker.position, checker.position);
      const displacementToTargetCell = scaleVector(displacementToTargetChecker, 2);

      const targetCellPosition = addVector(checker.position, displacementToTargetCell);

      if (!vectorWithinBounds(targetCellPosition) || board.has(stringifyVector(targetCellPosition))) return null;

      return {
        kills: targetChecker.id,
        movesTo: targetCellPosition,
      };
    })
    .filter(Boolean) as App.KillableOpponent[];
};
