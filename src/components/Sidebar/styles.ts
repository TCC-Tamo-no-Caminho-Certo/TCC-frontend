import { HTMLMotionProps, motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface ContentProps {
  index: number
  samePage: boolean
  innerWidth: number
  hasScrollBar: boolean
}

interface ListItemProps {
  isOpen: boolean
  pathname: string
  selected: string
  itemPaths: string[]
}

interface StyleProps extends HTMLMotionProps<'nav'> {
  letters: string
  isOpen: boolean
  background: string
}

export const Content = styled(motion.div)<ContentProps>`
  section {
    position: relative;
    right: 0px;

    padding-left: 8px;
    min-width: 320px;
    min-height: 100vh;
    margin-top: ${({ index, innerWidth }) =>
      index === 0 && innerWidth < 545 ? '72px' : '0px'};

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  ${({ pathname, itemPaths, selected }) =>
    itemPaths?.find(itemPath => itemPath === pathname) &&
    css`
      background-color: ${selected};
    `}

  @media screen and (min-width: 545px) {
    visibility: visible;
  }
`

export const SidebarNav = styled(motion.nav)<StyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;

  min-width: 320px;

  ul {
    width: 100%;

    &#bottomRoutes {
      position: absolute;
      bottom: 0;
      left: 0;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
    }

    li,
    button {
      display: flex;
      align-items: center;

      width: 100%;
      height: 72px;
    }
  }

  .icon {
    width: 24px;
    height: 24px;
    margin: 24px;

    user-select: none;

    svg {
      width: 24px;
      height: 24px;

      fill: ${({ letters }) => letters};
      stroke: ${({ letters }) => letters};
    }
  }

  .label,
  #title {
    display: flex;
    align-items: center;

    height: 72px;
    width: 100%;
    user-select: none;
    white-space: nowrap;

    color: ${({ letters }) => letters};
  }

  #title {
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);
  }

  #header {
    display: flex;
    align-items: center;

    width: 100%;
    height: 72px;

    border-bottom: ${({ letters, isOpen }) =>
      isOpen ? `solid 2px ${letters}` : 'none'};
  }

  .Hamburger {
    position: relative;
    z-index: 8000;

    margin: 24px;
  }

  ${({ background }) =>
    background.search(/gradient/)
      ? css`
          background: ${background};
        `
      : css`
          background-color: ${background};
        `}

  @media screen and (min-width: 545px) {
    min-width: 72px;
    height: 100vh;

    #header {
      border-bottom: ${({ letters }) => `solid 2px ${letters}`};
    }
  }
`

const Style = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 300px;
  overflow-x: hidden;
`

export default Style

Content.displayName = 'Content-Style'
ListItem.displayName = 'ListItem-Style'
SidebarNav.displayName = 'SidebarNav-Style'
Style.displayName = 'SidebarWrapper-Style'
