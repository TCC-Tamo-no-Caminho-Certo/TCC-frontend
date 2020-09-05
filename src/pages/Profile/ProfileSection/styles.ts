import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface NavbarProps {
  selected: string
  navbarOpen: boolean
}

interface ContentProps {
  navbarOpen: boolean
}

interface NavbarBackgroundProps {
  navbarOpen: boolean
}

export const NavbarBackground = styled.div<NavbarBackgroundProps>`
  height: 100vh;

  background-color: ${fromTheme('primary')};

  ${({ navbarOpen }) =>
    navbarOpen
      ? css`
          width: 210px;
        `
      : css`
          width: 72px;
        `}
`

export const Navbar = styled.nav<NavbarProps>`
  ${NavbarBackground} {
    position: fixed;
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

  ${({ selected }) => css`
    ${`#${selected} a`} {
      background-color: ${fromTheme('tertiary')};
    }
  `}
`

export const Content = styled.section<ContentProps>`
  position: absolute;
  top: 0;
  left: ${({ navbarOpen }) => (navbarOpen ? '210px' : '72px')};

  width: ${({ navbarOpen }) => (navbarOpen ? 'calc(100vw - 210px)' : 'calc(100vw - 72px)')};
  height: 100vh;

  > div {
    width: 100%;
    height: 100%;
  }
`

const Style = styled.section``

export default Style
