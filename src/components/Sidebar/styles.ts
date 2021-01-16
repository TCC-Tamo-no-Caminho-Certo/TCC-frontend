import { FC } from 'react'

import { HTMLMotionProps, motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface StyleProps extends HTMLMotionProps<'nav'> {
  letters: string
  background: string
}

interface ListItemProps {
  paths: string[]
  pathname: string
  selected: string
  bottom?: boolean
}

export const SidebarNav = styled(motion.nav as FC<StyleProps>)`
  position: fixed;
  left: 0;
  top: 0;

  height: 100vh;
  z-index: 3;

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
    white-space: nowrap;

    color: ${({ letters }) => letters};

    user-select: none;
    width: 100%;
  }

  #title {
    font-size: 1.8rem;
  }

  #header {
    display: flex;
    align-items: center;

    width: 100%;
    height: 72px;

    border-bottom: solid 2px ${({ letters }) => letters};
  }

  .Hamburger {
    margin: 24px;
  }

  ul {
    position: relative;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    li,
    button {
      display: flex;
      align-items: center;

      width: 100%;
      height: 72px;
    }
  }
`

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;

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
`

SidebarNav.displayName = 'SidebarNav-Style'
ListItem.displayName = 'ListItem-Style'
