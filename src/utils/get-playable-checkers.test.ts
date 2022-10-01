import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { getPlayableCheckers } from './get-playable-checkers';
import { makeBoard } from './make-board';
import { makeChecker } from './make-checker';

test("returns null if there isn't a checker that can be killed", () => {
  const board: App.Board = makeBoard();

  expect(getPlayableCheckers(board, CheckerColor.WHITE)).toEqual(null);
});

test('returns the playable checker if a color can kill an opponent', () => {
  const board: App.Board = new Map();

  board.set('(2, 1)', makeChecker({ id: 1, color: CheckerColor.WHITE, position: vector(2, 1) }));
  board.set('(4, 1)', makeChecker({ id: 2, color: CheckerColor.WHITE, position: vector(4, 1) }));
  board.set('(6, 1)', makeChecker({ id: 3, color: CheckerColor.WHITE, position: vector(6, 1) }));
  board.set('(3, 2)', makeChecker({ id: 4, color: CheckerColor.BLACK, position: vector(3, 2) }));

  expect(getPlayableCheckers(board, CheckerColor.WHITE)).toMatchObject([{ id: 1 }, { id: 2 }]);
});

test('returns the playable checker if a color can kill an opponent - 2', () => {
  const board: App.Board = new Map();

  board.set('(3, 1)', makeChecker({ color: CheckerColor.WHITE, position: vector(3, 1) }));
  board.set('(6, 2)', makeChecker({ color: CheckerColor.WHITE, position: vector(6, 2) }));
  board.set('(2, 4)', makeChecker({ color: CheckerColor.WHITE, position: vector(2, 4) }));
  board.set('(4, 4)', makeChecker({ color: CheckerColor.WHITE, position: vector(4, 4) }));
  board.set('(4, 2)', makeChecker({ id: 1, color: CheckerColor.BLACK, position: vector(4, 2) }));
  board.set('(3, 3)', makeChecker({ id: 2, color: CheckerColor.BLACK, position: vector(3, 3), isCrowned: true }));
  board.set('(5, 3)', makeChecker({ id: 3, color: CheckerColor.BLACK, position: vector(5, 3) }));

  expect(getPlayableCheckers(board, CheckerColor.BLACK)).toMatchObject([{ id: 2 }, { id: 3 }]);
});
