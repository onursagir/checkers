import { stringifyVector } from '../math/stringify-vector';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { makeChecker } from './make-checker';

export const makeBoard: App.BoardFactory = function () {
  const board: App.Board = new Map();

  const addChecker = (id: number, color: CheckerColor) => {
    const row = Math.floor(id / 8);
    const column = id - 8 * row;

    const getOddRowOffset = () => {
      if (color === CheckerColor.WHITE) return Number(row % 2 !== 0);

      return Number(row % 2 === 0) * -1;
    };
    const position = vector(column + 1 + getOddRowOffset(), row + 1);

    board.set(
      stringifyVector(position),
      makeChecker({
        id,
        color,
        position,
        isCrowned: false,
      })
    );
  };

  for (let i = 0; i <= 22; i += 2) addChecker(i, CheckerColor.WHITE);

  for (let i = 41; i <= 63; i += 2) addChecker(i, CheckerColor.BLACK);

  return board;
};
