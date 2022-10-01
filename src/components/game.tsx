import { Checkerboard } from './checkerboard';
import { EndGame } from './end-game';
import { useGameContext } from './game-provider';

export const Game: React.FC = () => {
  const { winner } = useGameContext();

  return winner !== null ? <EndGame /> : <Checkerboard />;
};
