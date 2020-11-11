import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

interface StyleProps {
  size: number
  shadow: boolean
}

const Style = styled.div<StyleProps>`
  &,
  #Avatar {
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
  }

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

    .Icon {
      position: absolute;
      bottom: 16%;
      left: 50%;
      z-index: 2;

      width: 24px;
      transform: translate(-50%, 50%);
      transition: all 300ms ease-in-out;
      cursor: pointer;

      fill: ${fromTheme('primary')};
      opacity: 0.3;
    }

    &:hover {
      .Icon {
        opacity: 1;
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
