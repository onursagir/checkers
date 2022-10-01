export const getChecker = (board: App.Board, checkerId: number) => {
  const checker = Array.from(board.values()).find(({ id }) => id === checkerId);

  if (!checker) throw new Error('Illegal checker/board combination');

  return checker;
};
