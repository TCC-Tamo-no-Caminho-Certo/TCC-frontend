import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface NavbarProps {
  selected: string
  navbarOpen: boolean
  openWidth: number
}

interface NavbarBackoundProps {
  openWidth: number
  navbarOpen: boolean
}

interface ContentProps {
  navbarOpen: boolean
  openWidth: number
}

export const NavbarBackground = styled.div<NavbarBackoundProps>`
  height: 100vh;

  background-color: ${fromTheme('primary')};

  ${({ navbarOpen, openWidth }) =>
    navbarOpen
      ? css`
          width: ${`${openWidth}px`};
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

  ul {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;

    height: 100vh;

    .Hamburger {
      width: 72px;
      height: 70px;
    }
  }

  ${({ selected }) => css`
    ${`#${selected} a`} {
      background-color: ${fromTheme('tertiary')};
    }
  `}

  ul, .Li {
    ${({ navbarOpen, openWidth }) =>
      navbarOpen
        ? css`
            width: ${`${openWidth}px`};
          `
        : css`
            width: 72px;
          `}
  }
`

export const Content = styled.section<ContentProps>`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
  }

  ${({ navbarOpen, openWidth }) =>
    navbarOpen
      ? css`
          width: ${`calc(-${openWidth}px + 100vw)`};
          left: ${`${openWidth}px`};
        `
      : css`
          width: calc(-72px + 100vw);
          left: 72px;
        `}
`

export const Li = styled.li``

const Style = styled.section``

export default Style
