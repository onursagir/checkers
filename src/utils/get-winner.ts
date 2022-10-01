import { CheckerColor } from './checker-color';

export const getWinner: App.GetWinner = (board) => {
  // white wins
  if (!Array.from(board.values()).some(({ color }) => color === CheckerColor.BLACK)) return CheckerColor.WHITE;

  // Black wins
  if (!Array.from(board.values()).some(({ color }) => color === CheckerColor.WHITE)) return CheckerColor.BLACK;

  return null;
};
