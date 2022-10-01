import { randomInt } from '../math/random-int';
import { vector } from '../math/vector';
import { CheckerColor } from './checker-color';

/**
 * Should mainly be used in tests
 * @param data where the returned checker will be made out of, omitted field will supplied with pseudo random values
 */
export const makeChecker: App.MakeChecker = (data) => ({
  id: data.id ?? randomInt(1, 99),
  isCrowned: data.isCrowned ?? Boolean(randomInt(0, 1)),
  position: data.position ?? vector(randomInt(1, 8), randomInt(1, 8)),
  color: data.color ?? [CheckerColor.BLACK, CheckerColor.BLACK][randomInt(0, 1)],
});
