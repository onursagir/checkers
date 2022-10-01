import { createContext, useCallback, useContext } from 'react';
import { CheckerColor } from '../utils/checker-color';
import { legalMoveIsKillable } from '../utils/legal-move-is-killable';
import { useGameReducer } from './use-game-reducer';

interface Value {
  board: App.Board;
  playing: CheckerColor;
  winner: CheckerColor | null;
  legalMoves: App.LegalMoves | null;
  playableCheckers: App.Checker[] | null;
  forcePlayingChecker?: App.Checker | null;
  handleCheckerClick(checker: App.Checker): void;
  handleCellClick(moveTo: App.LegalMove): void;
  restart(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GameContext = createContext<Value>({} as any);

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { state, moveChecker, selectChecker, killOpponent, restart } = useGameReducer();

  const handleCheckerClick: Value['handleCheckerClick'] = (checker) => {
    selectChecker(checker);
  };

  const handleCellClick: Value['handleCellClick'] = useCallback((moveTo) => {
    if (legalMoveIsKillable(moveTo)) return killOpponent(moveTo.kills, moveTo.movesTo);

    moveChecker(moveTo);
  }, []);

  return (
    <GameContext.Provider
      value={{
        board: state.board,
        winner: state.winner,
        playing: state.playing,
        legalMoves: state.legalMoves,
        playableCheckers: state.playableCheckers,
        forcePlayingChecker: state.forcePlayingChecker,
        handleCheckerClick,
        handleCellClick,
        restart,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
