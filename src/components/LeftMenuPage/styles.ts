import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface NavbarBackoundProps {
  openWidth: number
  navbarOpen: boolean
}

interface NavbarProps {
  selected: string
  navbarOpen: boolean
  openWidth: number
}

interface ContentProps {
  navbarOpen: boolean
  openWidth: number
}

export const NavbarBackground = styled.div<NavbarBackoundProps>`
  height: 100vh;

  background-color: ${fromTheme('primary')};
  transition: width 300ms ease-in-out;

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
    transition: width 300ms ease-in-out;

    li {
      a {
        display: flex;
        align-items: center;

        width: 100%;
        height: 70px;
        padding: 0 24px;

        div {
          margin-left: 24px;

          color: white;
          white-space: nowrap;
        }
      }
    }

    .Hamburger {
      width: 72px;
      height: 70px;
    }

    ${({ selected }) => css`
      ${`#${selected} a`} {
        background-color: ${fromTheme('tertiary')};
      }
    `}

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

export const Content = styled.div<ContentProps>`
  position: absolute;
  top: 0;

  transition: all 300ms ease-in-out;

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
