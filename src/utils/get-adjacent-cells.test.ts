import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { getAdjacentCells } from './get-adjacent-cells';
import { makeChecker } from './make-checker';

test('white color', () => {
  expect(getAdjacentCells(makeChecker({ position: vector(1, 1), color: CheckerColor.WHITE }))).toMatchObject([
    vector(2, 2),
  ]);

  expect(getAdjacentCells(makeChecker({ position: vector(2, 1), color: CheckerColor.WHITE }))).toMatchObject([
    vector(3, 2),
    vector(1, 2),
  ]);
});

test('black color', () => {
  expect(getAdjacentCells(makeChecker({ position: vector(1, 8), color: CheckerColor.BLACK }))).toMatchObject([
    vector(2, 7),
  ]);

  expect(getAdjacentCells(makeChecker({ position: vector(2, 8), color: CheckerColor.BLACK }))).toMatchObject([
    vector(3, 7),
    vector(1, 7),
  ]);
});
