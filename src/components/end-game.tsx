import { CheckerColor } from '../utils/checker-color';
import { useGameContext } from './game-provider';
import * as Styled from './styled';

export const EndGame: React.FC = () => {
  const { winner, restart } = useGameContext();

  if (!winner) throw new Error('end-game/end-game-rendered-without-winner');

  const winnerTitle = {
    [CheckerColor.BLACK]: 'Black',
    [CheckerColor.WHITE]: 'White',
  }[winner];

  return (
    <Styled.EndGame>
      <h4>{winnerTitle} wins!</h4>
      <button onClick={restart}>Click here to restart</button>
      <button onClick={() => alert('Just close the window lol')}>Click here to stop playing</button>
    </Styled.EndGame>
  );
};
