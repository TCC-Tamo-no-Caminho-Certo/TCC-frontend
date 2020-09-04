import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface NavbarProps {
  selected: string
  minimizeMenu: string | boolean
}

export const NavbarBackground = styled.div`
  width: 72px;
  height: 100vh;

  background-color: ${fromTheme('primary')};
`

const Style = styled.nav<NavbarProps>`
  ${NavbarBackground} {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  display: flex;
  flex-direction: column;

  width: 72px;
  height: 100vh;

  ul {
    li a,
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
    ${`#${selected} a`} {
      background-color: ${fromTheme('tertiary')};
    }
  `}
`

export default Style
