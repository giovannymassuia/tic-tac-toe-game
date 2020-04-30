import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.div``;

export const X = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &.x__placeholder {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover.x__placeholder {
    opacity: 0.2;
  }

  &::before,
  &::after {
    content: '';
    height: calc(70.71 / 100 * 100% * 2);
    width: 20px;
    background: ${colors.xColor};
    position: absolute;
    margin: 0 auto;
    top: -20%;
    left: 0;
    right: 0;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  @media (max-width: 40rem) {
    &::before,
    &::after {
      content: '';
      width: 10px;
    }
  }
`;

export const O = styled.div`
  width: 100%;
  height: 100%;
  border: 20px solid ${colors.oColor};
  border-radius: 50%;

  &.o__placeholder {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover.o__placeholder {
    opacity: 0.2;
  }

  @media (max-width: 40rem) {
    border-width: 10px;
  }
`;
