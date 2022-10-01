type CheckerColor = import('./utils/checker-color').CheckerColor;

declare namespace Math {
  export type Vector = [x: number, y: number];

  export type StringifiedVector = string;

  export interface VectorFactory {
    (x: number, y: number): Vector;
  }

  export interface ScaleVector {
    (vector: Vector, scale: number): Vector;
  }

  export interface AddVector {
    (left: Vector, right: Vector): Vector;
  }

  export interface AddVector {
    (left: Vector, right: Vector): Vector;
  }

  export interface SubtractVector {
    (left: Vector, right: Vector): Vector;
  }

  export interface CompareVector {
    (left: Vector, right): boolean;
  }

  export interface VectorWithinBounds {
    (vector: Vector): boolean;
  }

  export interface StringifyVector {
    (vector: Vector): StringifiedVector;
  }

  export interface Y {
    (vector: Vector): number;
  }

  export interface RandomInt {
    (min: number, max: number): number;
  }
}

declare namespace App {
  export interface CellLike {
    position: Math.Vector;
  }

  export interface Cell extends CellLike {
    id: string;
  }

  export interface Checker extends CellLike {
    id: number;
    isCrowned: boolean;
    color: CheckerColor;
  }

  export type Board = Map<Math.StringifiedVector, Checker>;

  export interface KillableOpponent {
    kills: Checker['id'];
    movesTo: Math.Vector;
  }

  export interface GetKillableOpponents {
    (board: Board, checkerId: Checker['id']): KillableOpponent[];
  }

  export type LegalMove = Math.Vector | KillableOpponent;

  export type LegalMoves = LegalMove[];

  export interface GetLegalMoves {
    (board: Board, checkerId: Checker['id']): LegalMoves;
  }

  export interface GetAdjacentCells {
    (checker: Pick<Checker, 'color' | 'position' | 'isCrowned'>): Math.Vector[];
  }

  export interface MoveChecker {
    (checker: Checker, to: Vector): Checker;
  }

  export interface GetWinner {
    (board: Board): CheckerColor | null;
  }

  export interface MakeChecker {
    (data: Partial<Checker>): Checker;
  }

  export interface GetPlayableCheckers {
    (board: Board, color: CheckerColor): Checker[] | null;
  }

  export interface BoardFactory {
    (): Board;
  }
}
