import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

interface StyleProps {
  size: number
  shadow: boolean
}

const Style = styled.div<StyleProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .circle {
    position: relative;
    transform: translateY(-105%);

    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    border-radius: 50%;
    overflow: hidden;
    opacity: 0.7;

    background: transparent;
    color: white;
    pointer-events: none;

    .Camera {
      position: absolute;
      bottom: 16%;
      left: 50%;
      z-index: 2;

      width: 24px;
      transform: translate(-50%, 50%);
      cursor: pointer;

      path {
      }
    }

    &:hover {
      .Camera path {
        stroke: ${fromTheme('primary')};
      }
    }
  }

  .circle:after {
    position: absolute;
    bottom: 0px;

    display: block;

    width: 100%;
    height: 32%;

    background: black;

    content: '';
    cursor: pointer;
    pointer-events: all;
  }
`

export default Style

Style.displayName = 'Avatar-Style'
