import { expect, test } from 'vitest';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';
import { moveChecker } from './move-checker';

test('moves a checker correctly', () => {
  const checker: App.Checker = {
    id: 1,
    color: CheckerColor.WHITE,
    isCrowned: false,
    position: vector(1, 1),
  };

  const moveTo = vector(2, 2);

  expect(moveChecker(checker, moveTo)).toMatchObject({
    ...checker,
    position: moveTo,
  });
});

test('crowns a checker correctly', () => {
  const checker: App.Checker = {
    id: 1,
    color: CheckerColor.WHITE,
    isCrowned: false,
    position: vector(1, 7),
  };

  const moveTo = vector(2, 8);

  expect(moveChecker(checker, moveTo)).toMatchObject({
    ...checker,
    position: moveTo,
    isCrowned: true,
  });
});
