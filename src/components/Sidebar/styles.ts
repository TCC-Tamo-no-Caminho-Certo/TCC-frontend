import { HTMLMotionProps, motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface ListItemProps {
  paths: string[]
  pathname: string
  selected: string
  isOpen: boolean
  bottom?: boolean
}

interface StyleProps extends HTMLMotionProps<'nav'> {
  letters: string
  background: string
  isOpen: boolean
}

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;

  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  button {
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
  }

  ${({ bottom }) =>
    bottom &&
    css`
      position: absolute;
      bottom: 72px;
      left: 0;
    `}

  ${({ pathname, paths, selected }) => {
    const verifyPaths = () => {
      for (let i = 0; i < paths.length; i += 1) {
        const regex = new RegExp(`^${paths[i]}$`)
        if (pathname.match(regex)) return true
      }

      return false
    }

    return (
      verifyPaths() &&
      css`
        ${`#${paths[0]}`} {
          background-color: ${selected};
        }
      `
    )
  }}

  @media screen and (min-width: 545px) {
    visibility: visible;
  }
`

export const SidebarNav = styled(motion.nav)<StyleProps>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;

  min-width: 320px;

  ${({ background }) =>
    background.search(/gradient/)
      ? css`
          background: ${background};
        `
      : css`
          background-color: ${background};
        `}

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
