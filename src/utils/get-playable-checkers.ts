import { getKillableOpponents } from './get-killable-opponents';

/**
 * Checks if there are checkers that can kill an opponent, if they can these checkers are returned.
 * If there is no checker that can kill an opponent null is returned and the user should be free to move any checker they desire.
 */
export const getPlayableCheckers: App.GetPlayableCheckers = (board, color) => {
  const playableCheckers = Array.from(board.values()).filter(
    (checker) => checker.color === color && getKillableOpponents(board, checker.id).length
  );

  return playableCheckers.length ? playableCheckers : null;
};
