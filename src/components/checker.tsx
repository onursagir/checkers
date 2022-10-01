import { memo, useMemo } from 'react';
import { Crown } from './crown';
import { useGameContext } from './game-provider';
import * as Styled from './styled';

interface Props {
  id: number;
}

const CheckerComponent: React.FC<Props> = ({ id }) => {
  const { forcePlayingChecker, playing, board, handleCheckerClick } = useGameContext();

  const checker = Array.from(board.values()).find((checker) => checker.id === id);

  if (!checker) throw new Error('checker/unable-to-find-self');

  const { position, color, isCrowned } = checker;

  const isPlayable = useMemo(() => {
    if (forcePlayingChecker) return forcePlayingChecker.id === id;

    return color === playing;
  }, [forcePlayingChecker, playing]);

  return (
    <Styled.Checker
      row={position[1]}
      column={position[0]}
      checkerColor={color}
      isPlayable={isPlayable}
      onClick={() => isPlayable && handleCheckerClick(checker)}
    >
      {isCrowned && <Crown />}
    </Styled.Checker>
  );
};

export const Checker = memo(CheckerComponent);
