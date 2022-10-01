import styled, { css } from 'styled-components';
import { CheckerColor } from '../utils/checker-color';

export const App = styled.div`
  width: 100%;
  height: 80vh;
  display: grid;
  place-items: center;

  * {
    box-sizing: border-box;
  }
`;

export const Board = styled.div<{ size: number }>`
  display: grid;
  aspect-ratio: 1;
  position: relative;
  align-self: stretch;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(${({ size }) => size}, 1fr);
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
  border-radius: 15px;
  overflow: hidden;
  border: 10px solid #1b3342;
`;

export const BoardBackground = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  position: absolute;
  grid-template-rows: inherit;
  grid-template-columns: inherit;
`;

export const BoardCell = styled.div<{
  isOddRow: boolean;
  isLegalMove?: boolean;
}>`
  display: grid;
  place-items: center;

  ${({ isOddRow, isLegalMove }) => {
    const lightColor = '#4f788e';
    const darkColor = isLegalMove ? '#87b5da' : '#1c3f5b';
    const bg = isOddRow ? lightColor : darkColor;
    const oBg = isOddRow ? darkColor : lightColor;

    return css`
      cursor: ${isLegalMove ? 'pointer' : 'default'};
      background: ${bg};

      :nth-child(odd) {
        background: ${oBg};
      }
    `;
  }}
`;

export const Crown = styled.svg``;

export const Checker = styled.div<{
  row: number;
  column: number;
  isPlayable: boolean;
  checkerColor: CheckerColor;
}>`
  width: 80%;
  z-index: 1;
  aspect-ratio: 1;
  border-radius: 100%;
  grid-row: ${({ row }) => row};
  grid-column: ${({ column }) => column};
  padding: 20px;
  display: flex;

  align-items: stretch;
  background-color: ${({ checkerColor }) => (checkerColor === CheckerColor.BLACK ? '#03a5ea' : '#fafafa')};
  color: ${({ checkerColor }) => (checkerColor === CheckerColor.BLACK ? '#03a5ea' : '#fafafa')};

  cursor: ${({ isPlayable }) => (isPlayable ? 'pointer' : 'default')};
`;

export const EndGame = styled.div`
  display: flex;
  row-gap: 10px;
  text-align: center;
  flex-direction: column;
`;
