import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface NavbarProps {
  selected: string
  minimizeMenu: string | boolean
}

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;

  min-width: 320px;
  min-height: 100vh;
  padding: 73px 0 73px 0;

  background-color: ${fromTheme('secondary')};
`

export const NavbarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 72px;
  height: 100vh;

  background-color: ${fromTheme('primary')};
`

export const Navbar = styled.nav<NavbarProps>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  width: 72px;
  height: 100vh;

  ul {
    li button {
      position: relative;
      z-index: 1;

      display: flex;
      align-items: center;

      width: 100%;
      height: 70px;
      padding: 0 24px;

      span {
        white-space: nowrap;
        margin-left: 24px;
        line-height: 70px;
      }

      img,
      span {
        color: ${fromTheme('secondary')};
      }
    }
  }

  #menuButton button {
    display: flex;
    align-items: center;
    justify-content: start;

    height: 70px;
    padding: 0 24px;

    background-color: transparent;

    svg {
      overflow: visible;
    }
  }

  ${({ selected }) => css`
    ${`#${selected} button`} {
      background-color: ${fromTheme('tertiary')};
    }
  `}
`

export default Style
