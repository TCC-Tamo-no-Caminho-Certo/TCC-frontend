import { motion } from 'framer-motion'
import styled from 'styled-components'

interface HeaderProps {
  isOpen: boolean
}

interface ContentProps {
  index: number
  isLarge: boolean
  samePage: boolean
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
    z-index: 101;

    margin: 24px;
  }

  #title {
    display: flex;
    align-items: center;

    width: 100%;
    height: 72px;
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
  z-index: 100;

  background-color: ${({ theme }) => theme.sidebar.background};

  @media screen and (min-width: 545px) {
    height: 100vh;
  }
`

export const Content = styled(motion.div)<ContentProps>`
  position: relative;
  right: 0px;

  section {
    position: relative;
    right: 0px;

    min-height: 100vh;
    margin-top: ${({ index, isLarge, samePage }) => {
      if (samePage) return !isLarge && index === 0 ? '72px' : '0px'
      return isLarge ? '0px' : '72px'
    }};

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`

const Style = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;

  width: max(100%, 312px);

  @media screen and (min-width: 545px) {
    width: max(100%, 312px);
  }
`

export default Style

Header.displayName = 'Header-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'SidebarWrapper-Style'
SidebarNav.displayName = 'SidebarNav-Style'
