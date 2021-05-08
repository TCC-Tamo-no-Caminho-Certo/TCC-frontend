import { HTMLMotionProps, motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface ListItemProps {
  itemPaths: string[]
  isOpen: boolean
  pathname: string
  selected: string
  bottom?: boolean
}

interface StyleProps extends HTMLMotionProps<'nav'> {
  letters: string
  isOpen: boolean
  background: string
}

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  ${({ bottom }) =>
    bottom &&
    css`
      position: absolute;
      left: 0;
      bottom: 72px;
    `}

  ${({ pathname, itemPaths, selected }) => {
    return (
      itemPaths?.find(itemPath => itemPath === pathname) &&
      css`
        background-color: ${selected};
      `
    )
  }}

  @media screen and (min-width: 545px) {
    visibility: visible;
  }
`

export const SidebarNav = styled(motion.nav)<StyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  min-width: 320px;

  ul {
    position: relative;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

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
    width: 72px;
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

ListItem.displayName = 'ListItem-Style'
SidebarNav.displayName = 'SidebarNav-Style'
Style.displayName = 'SidebarWrapper-Style'
