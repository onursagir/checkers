import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { getKillableOpponents } from './get-killable-opponents';

// test("for a selected checker correct kills and movements are returned", () => {
//   const board: App.Board = new Map();

//   board.set("(2, 3)", {
//     id: 1,
//     position: vector(2, 3),
//     color: CheckerColor.WHITE,
//   });

//   board.set("(4, 3)", {
//     id: 2,
//     position: vector(4, 3),
//     color: CheckerColor.WHITE,
//   });

//   board.set("(3, 4)", {
//     id: 3,
//     position: vector(3, 4),
//     color: CheckerColor.BLACK,
//   });

//   board.set("(2, 5)", {
//     id: 4,
//     position: vector(2, 5),
//     color: CheckerColor.BLACK,
//   });

//   expect(getKillableOpponents(board, 3)).toMatchObject([
//     { kills: 2, movesTo: vector(5, 2) },
//     { kills: 1, movesTo: vector(1, 2) },
//   ]);

//   expect(getKillableOpponents(board, 1)).toMatchObject([
//     { kills: 3, movesTo: vector(4, 5) },
//   ]);

//   expect(getKillableOpponents(board, 2)).toMatchObject([]);
// });

test('cannot kill opponent when opponent is backed up', () => {
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

  expect(getKillableOpponents(board, 2)).toMatchObject([]);
});
