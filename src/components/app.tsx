import { Game } from './game';
import { GameProvider } from './game-provider';
import * as Styled from './styled';

export const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <GameProvider>
      <Styled.App>
        <Game />
      </Styled.App>
    </GameProvider>
  );
};
