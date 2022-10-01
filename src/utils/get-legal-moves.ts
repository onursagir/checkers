import { stringifyVector } from '../math/stringify-vector';
import { getAdjacentCells } from './get-adjacent-cells';
import { getChecker } from './get-checker';
import { getKillableOpponents } from './get-killable-opponents';

/**
 * Gets legal moves for a given checker
 */
export const getLegalMoves: App.GetLegalMoves = (board, checkerId) => {
  const checker = getChecker(board, checkerId);

  const killableOpponents = getKillableOpponents(board, checkerId);

  if (killableOpponents.length) return killableOpponents;

  const adjacentCells = getAdjacentCells(checker);

  return adjacentCells.filter((cell) => !board.has(stringifyVector(cell)));
};
