import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { getLegalMoves } from './get-legal-moves';

test('without other checkers on the board', () => {
  const board: App.Board = new Map();

  board.set('(1, 1)', {
    id: 1,
    position: vector(1, 1),
    color: CheckerColor.WHITE,
  });

  board.set('(2, 1)', {
    id: 2,
    position: vector(2, 1),
    color: CheckerColor.WHITE,
  });

  expect(getLegalMoves(board, 1)).toMatchObject([vector(2, 2)]);

  expect(getLegalMoves(board, 2)).toMatchObject([vector(3, 2), vector(1, 2)]);
});

test('cannot move onto a tile if occupied', () => {
  const board: App.Board = new Map();

  board.set('(2, 1)', {
    id: 1,
    position: vector(2, 1),
    color: CheckerColor.WHITE,
  });

  board.set('(3, 2)', {
    id: 2,
    position: vector(3, 2),
    color: CheckerColor.WHITE,
  });

  board.set('(1, 2)', {
    id: 3,
    position: vector(1, 2),
    color: CheckerColor.WHITE,
  });

  board.set('(4, 3)', {
    id: 4,
    position: vector(4, 3),
    color: CheckerColor.BLACK,
  });

  board.set('(5, 4)', {
    id: 5,
    position: vector(5, 4),
    color: CheckerColor.BLACK,
  });

  expect(getLegalMoves(board, 1)).toMatchObject([]);

  expect(getLegalMoves(board, 2)).toMatchObject([vector(2, 3)]);
});
