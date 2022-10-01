import { compareVector } from '../math/compare-vector';
import { stringifyVector } from '../math/stringify-vector';
import { vector } from '../math/vector';
import { legalMoveIsKillable } from '../utils/legal-move-is-killable';
import { Checker } from './checker';
import { useGameContext } from './game-provider';
import * as Styled from './styled';

const boardSize = 8;

const cellFactory = Array.from({ length: boardSize * boardSize }).map((_, i) => {
  const row = Math.floor(i / boardSize);

  return {
    x: i - boardSize * row + 1,
    y: row + 1,
    index: i,
  };
});

export const Checkerboard: React.FC = () => {
  const { board, legalMoves, playableCheckers, handleCellClick } = useGameContext();

  return (
    <Styled.Board size={boardSize}>
      {Array.from(board.values()).map(({ id }) => (
        <Checker key={id} id={id} />
      ))}
      <Styled.BoardBackground>
        {cellFactory.map(({ x, y }) => {
          const position = vector(x, y);
          const id = stringifyVector(position);
          const legalMove = legalMoves?.find((legalMove) =>
            compareVector(legalMoveIsKillable(legalMove) ? legalMove.movesTo : legalMove, position)
          );

          const cellsWithPlayableCheckers = playableCheckers?.map(({ position }) => stringifyVector(position));

          return (
            <Styled.BoardCell
              key={id}
              isOddRow={y % 2 === 1}
              isLegalMove={Boolean(legalMove)}
              containsPlayable={Boolean(cellsWithPlayableCheckers?.includes(id))}
              onClick={() => Boolean(legalMove) && handleCellClick(legalMove as App.LegalMove)}
            />
          );
        })}
      </Styled.BoardBackground>
    </Styled.Board>
  );
};
