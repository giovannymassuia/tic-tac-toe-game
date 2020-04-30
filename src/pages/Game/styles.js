import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GameScore = styled.div`
  width: calc(100vh - 30px);
  height: 30px;
  padding: 10px;

  max-width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GameContainer = styled.div`
  height: calc(100vh - 30px);
  width: calc(100vh - 30px);

  max-height: 100vw;
  max-width: 100%;

  margin: auto;
  position: relative;

  flex: 1;
`;

export const GameArea = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    border: 5px solid ${colors.primaryColor};

    @media (max-width: 40rem) {
      padding: 25px;
    }
  }

  .square__top-left {
    border-top: 0;
    border-left: 0;
  }

  .square__top-center {
    border-top: 0;
  }

  .square__top-right {
    border-top: 0;
    border-right: 0;
  }

  .square__center-left {
    border-left: 0;
  }

  .square__center-center {
  }

  .square__center-right {
    border-right: 0;
  }

  .square__bottom-left {
    border-bottom: 0;
    border-left: 0;
  }

  .square__bottom-center {
    border-bottom: 0;
  }

  .square__bottom-right {
    border-bottom: 0;
    border-right: 0;
  }
`;

export const GameOverContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s;

  .columnCenter {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    visibility: hidden;

    &::before {
      content: '';
      width: 20px;
      height: 100%;
      background: red;

      opacity: 0;
      transition: opacity 1s;
    }
  }

  .lineTop,
  .lineCenter,
  .lineBottom,
  .columnLeft,
  .columnCenter,
  .columnRight {
    width: 100%;
    height: 100%;

    display: grid;

    visibility: hidden;

    &::before {
      content: '';
      background: red;

      opacity: 0;
      transition: opacity 1s;

      align-self: center;
      justify-self: center;
    }
  }

  .lineTop,
  .lineCenter,
  .lineBottom {
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 'top' 'center' 'bottom';

    &::before {
      height: 20px;
      width: 100%;
    }
  }

  .lineTop {
    &::before {
      grid-area: top;
    }
  }

  .lineCenter {
    &::before {
      grid-area: center;
    }
  }

  .lineBottom {
    &::before {
      grid-area: bottom;
    }
  }

  .columnLeft,
  .columnCenter,
  .columnRight {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    visibility: hidden;

    &::before {
      width: 20px;
      height: 100%;
    }
  }

  .columnLeft {
    &::before {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  .columnCenter {
    &::before {
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  .columnRight {
    &::before {
      grid-column-start: 3;
      grid-column-end: 4;
    }
  }

  .diagonalTopLeftBottomRight,
  .diagonalTopRightBottomLeft {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    visibility: hidden;

    &::before,
    &::after {
      height: calc(70.71 / 100 * 100% * 2);
      width: 20px;
      background: red;
      position: absolute;
      margin: 0 auto;
      top: -20%;
      left: 0;
      right: 0;

      opacity: 0;
      transition: opacity 1s;
    }
  }

  .diagonalTopLeftBottomRight {
    &::before {
      content: '';
      transform: rotate(-45deg);
    }
  }

  .diagonalTopRightBottomLeft {
    &::after {
      content: '';
      transform: rotate(45deg);
    }
  }

  &.showGameOver,
  &.showGameOver div::before,
  &.showGameOver div::after {
    opacity: 1;
    visibility: visible;
  }
`;

export const GameLoading = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    padding: 20px;

    span {
      font-size: 24px;
    }
  }
`;
