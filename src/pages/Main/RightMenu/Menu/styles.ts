import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface InitialMenuProps {
  width: string
  height: string
  changeRole: boolean
}

export const InitialMenu = styled(motion.ul)<InitialMenuProps>`
  position: absolute;
  top: 112px;
  left: 0px;
  z-index: 3;

  width: max(100vw, 300px);

  height: ${({ height }) => height};

  & > * {
    opacity: 0;
  }

  hr {
    position: absolute;
    top: 0;
    left: 16px;

    height: 2px;
    width: calc(100% - 32px);

    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  li {
    a:hover,
    button:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    button {
      ${({ changeRole }) =>
        changeRole &&
        css`
          background-color: ${({ theme }) => theme.colors.primary};
        `}
    }
  }

  li a,
  li button {
    padding: 16px;
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    user-select: none;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

    color: ${({ theme }) => theme.colors.secondary};

    .Icon {
      height: 24px;
    }
  }

  #logout {
    position: absolute;
    right: 16px;
    bottom: 16px;

    display: flex;
    align-items: center;

    opacity: 0;
    height: 24px;

    color: ${({ theme }) => theme.colors.secondary};

    span#leave {
      margin-left: 8px;
      user-select: none;
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

      cursor: pointer;
    }

    .Icon {
      width: 20px;
      margin: 0px;
      height: 20px;
      margin-left: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media screen and (min-width: 545px) {
    right: 0;

    width: 300px;
    min-width: 300px;

    #selectRoles {
      right: ${({ width }) => width};

      width: 230px;
    }
  }
`

const Style = styled(Presence)``

export default Style

InitialMenu.displayName = 'InitialMenu-Style'
Style.displayName = 'Menu-Style'
