import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface HeaderProps {
  isOpen: boolean
}

interface ContentProps {
  index: number
  samePage: boolean
  innerWidth: number
  hasScrollBar: boolean
}

interface StyleProps {
  hasScroll?: boolean
}

export const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 72px;

  border-bottom: ${({ theme, isOpen }) =>
    isOpen ? `solid 2px ${theme.sidebar.letters}` : 'none'};

  .Hamburger {
    position: relative;
    z-index: 8000;

    margin: 24px;
  }

  #title {
    display: flex;
    align-items: center;

    height: 72px;
    width: 100%;
    user-select: none;
    white-space: nowrap;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);

    color: ${({ theme }) => theme.sidebar.letters};
  }

  @media screen and (min-width: 545px) {
    border-bottom: ${({ theme }) => `solid 2px ${theme.sidebar.letters}`};
  }
`

export const SidebarNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;

  min-width: 320px;

  ${({ theme }) =>
    theme.sidebar.background.search(/gradient/)
      ? css`
          background: ${theme.sidebar.background};
        `
      : css`
          background-color: ${theme.sidebar.background};
        `}

  @media screen and (min-width: 545px) {
    height: 100vh;
    min-width: 72px;
  }
`

export const Content = styled(motion.div)<ContentProps>`
  section {
    position: relative;
    right: 0px;

    width: 100%;
    min-height: 100vh;
    margin-top: ${({ index, innerWidth }) =>
      index === 0 && innerWidth < 545 ? '72px' : '0px'};

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`

const Style = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;

  width: max(100vw - 8px, 312px);

  @media screen and (min-width: 545px) {
    ${({ hasScroll }) =>
      hasScroll
        ? css`
            width: max(100vw - 16px, 312px);
          `
        : css`
            width: max(100vw, 312px);
          `}
  }
`

export default Style

Header.displayName = 'Header-Style'
Content.displayName = 'Content-Style'
SidebarNav.displayName = 'SidebarNav-Style'
Style.displayName = 'SidebarWrapper-Style'
