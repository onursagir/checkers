import { useCallback, useReducer } from 'react';
import { stringifyVector } from '../math/stringify-vector';
import { CheckerColor } from '../utils/checker-color';
import { getKillableOpponents } from '../utils/get-killable-opponents';
import { getLegalMoves } from '../utils/get-legal-moves';
import { getPlayableCheckers } from '../utils/get-playable-checkers';
import { getWinner } from '../utils/get-winner';
import { makeBoard } from '../utils/make-board';
import { moveChecker } from '../utils/move-checker';

interface State {
  board: App.Board;
  playing: CheckerColor;
  winner: CheckerColor | null;
  legalMoves: App.LegalMoves | null;
  selectedChecker: App.Checker | null;
  playableCheckers: App.Checker[] | null;
  forcePlayingChecker: App.Checker | null;
}

interface MoveAction {
  type: 'move';
  moveTo: Math.Vector;
}

interface SelectChecker {
  type: 'selectChecker';
  checker: App.Checker;
}

interface KillOpponent {
  type: 'kill';
  victimId: number;
  moveTo: Math.Vector;
}

interface Restart {
  type: 'restart';
}

type Action = MoveAction | SelectChecker | KillOpponent | Restart;

const getInvertedPlaying = (playing: CheckerColor) =>
  playing === CheckerColor.WHITE ? CheckerColor.BLACK : CheckerColor.WHITE;

const makeState = (): State => ({
  winner: null,
  legalMoves: null,
  board: makeBoard(),
  selectedChecker: null,
  playableCheckers: null,
  forcePlayingChecker: null,
  playing: CheckerColor.WHITE,
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'move': {
      if (!state.selectedChecker) throw new Error('reducer/no-selected-checker');

      const boardCopy = new Map(state.board);

      boardCopy.set(stringifyVector(action.moveTo), moveChecker(state.selectedChecker, action.moveTo));

      boardCopy.delete(stringifyVector(state.selectedChecker.position));

      const playing = getInvertedPlaying(state.playing);

      return {
        ...state,
        playing,
        board: boardCopy,
        legalMoves: null,
        playableCheckers: getPlayableCheckers(boardCopy, playing),
      };
    }
    case 'selectChecker': {
      return {
        ...state,
        selectedChecker: action.checker,
        legalMoves: getLegalMoves(state.board, action.checker.id),
      };
    }
    case 'kill': {
      if (!state.selectedChecker) throw new Error('reducer/no-selected-checker');

      const boardSlice = Array.from(state.board).find(([, { id }]) => id === action.victimId);

      if (!boardSlice) throw new Error('reducer/unable-to-find-victim');

      const [victimPosition] = boardSlice;

      const copy = new Map(state.board);

      copy.delete(victimPosition);

      const newSelectedChecker = moveChecker(state.selectedChecker, action.moveTo);

      copy.set(stringifyVector(action.moveTo), newSelectedChecker);

      copy.delete(stringifyVector(state.selectedChecker.position));

      const consequentialKills = getKillableOpponents(copy, state.selectedChecker.id);

      if (consequentialKills.length)
        return {
          ...state,
          board: copy,
          winner: getWinner(copy),
          legalMoves: consequentialKills,
          selectedChecker: newSelectedChecker,
          forcePlayingChecker: newSelectedChecker,
          playableCheckers: [newSelectedChecker],
        };

      const playing = getInvertedPlaying(state.playing);

      return {
        ...state,
        playing,
        board: copy,
        legalMoves: null,
        selectedChecker: null,
        winner: getWinner(copy),
        forcePlayingChecker: null,
        playableCheckers: getPlayableCheckers(copy, playing),
      };
    }
    case 'restart':
      return makeState();
    default:
      throw new Error('Unknown action');
  }
};

export const useGameReducer = () => {
  const [state, dispatch] = useReducer(reducer, makeState());

  const moveChecker = useCallback((moveTo: Math.Vector) => {
    dispatch({ type: 'move', moveTo });
  }, []);

  const selectChecker = useCallback((checker: App.Checker) => {
    dispatch({ type: 'selectChecker', checker });
  }, []);

  const killOpponent = useCallback((victimId: number, moveTo: Math.Vector) => {
    dispatch({ type: 'kill', victimId, moveTo });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'restart' });
  }, []);

  return { state, moveChecker, selectChecker, killOpponent, restart };
};
