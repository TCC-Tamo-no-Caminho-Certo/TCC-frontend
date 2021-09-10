import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface ListItemProps {
  isOpen: boolean
  pathname: string
  itemPaths: string[]
}

interface StyleProps {
  bottom: boolean
}

export const ListItem = styled.li<ListItemProps>`
  cursor: pointer;
  font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  ${({ pathname, itemPaths, theme }) =>
    itemPaths?.find(itemPath => itemPath === pathname) &&
    css`
      background-color: ${theme.colors.sidebar.selected};
    `}

  #icon {
    width: 24px;
    height: 24px;
    margin: 24px;

    user-select: none;

    svg {
      width: 24px;
      height: 24px;

      fill: ${({ theme }) => theme.colors.sidebar.letters};
      stroke: ${({ theme }) => theme.colors.sidebar.letters};
    }
  }

  #label {
    display: flex;
    align-items: center;

    height: 72px;
    width: 100%;
    user-select: none;
    white-space: nowrap;

    color: ${({ theme }) => theme.colors.sidebar.letters};
  }

  @media screen and (min-width: 545px) {
    visibility: visible;
  }
`

const Style = styled(motion.ul)<StyleProps>`
  width: 100%;

  ${({ bottom }) =>
    bottom &&
    css`
      position: absolute;
      bottom: 0;
      left: 0;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: column;
    `}

  li,
  button {
    display: flex;
    align-items: center;

    width: 100%;
    height: 72px;
  }
`

export default Style

ListItem.displayName = 'ListItem-Style'
Style.displayName = 'List-Style'
