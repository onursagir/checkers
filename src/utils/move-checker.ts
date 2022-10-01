import { y } from '../math/y';
import { CheckerColor } from './checker-color';

export const moveChecker: App.MoveChecker = (checker, to) => {
  const copy = { ...checker };

  copy.position = to;

  if (copy.isCrowned) return copy;

  copy.isCrowned =
    (copy.color === CheckerColor.BLACK && y(copy.position) === 1) ||
    (copy.color === CheckerColor.WHITE && y(copy.position) === 8);

  return copy;
};
