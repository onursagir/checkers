import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { getWinner } from './get-winner';
import { makeChecker } from './make-checker';

test('returns the correct winner', () => {
  const board: App.Board = new Map();

  board.set('(1, 1)', {
    id: 1,
    isCrowned: false,
    position: vector(1, 1),
    color: CheckerColor.WHITE,
  });

  board.set('(1, 2)', {
    id: 2,
    isCrowned: false,
    position: vector(1, 2),
    color: CheckerColor.BLACK,
  });

  expect(getWinner(board)).toEqual(null);

  board.delete('(1, 2)');

  expect(getWinner(board)).toEqual(CheckerColor.WHITE);

  board.set('(1, 1)', makeChecker({ color: CheckerColor.BLACK }));

  expect(getWinner(board)).toEqual(CheckerColor.BLACK);
});
