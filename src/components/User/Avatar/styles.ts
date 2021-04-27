import styled from 'styled-components'

interface StyledAvatarProps {
  size: number
  shadow: boolean
  border: boolean
}

export const StyledAvatar = styled.div<StyledAvatarProps>`
  &,
  #DefaultAvatar {
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

    overflow: hidden;
    border-radius: 50%;
    pointer-events: none;
    transform: translateY(-103%);
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};

    opacity: 0.7;
    background: transparent;
    color: ${({ theme }) => theme.colors.white};

    .Icon {
      position: absolute;
      bottom: 16%;
      left: 50%;
      z-index: 2;

      width: 24px;
      opacity: 0.3;
      cursor: pointer;
      transform: translate(-50%, 50%);
      transition: all 300ms ease-in-out;

      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  .circle:after {
    position: absolute;
    bottom: 0px;

    display: block;

    content: '';
    width: 100%;
    height: 32%;
    cursor: pointer;
    pointer-events: all;

    background: black;
  }

  &:hover {
    .Icon {
      opacity: 1;
    }
  }
`

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 24px;
`

export default Style

StyledAvatar.displayName = 'Avatar-StyledAvatar'
