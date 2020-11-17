import fromTheme from 'utils/fromTheme'

import styled, { css } from 'styled-components'

interface ListItemProps {
  bottom?: boolean
  pathname: string
  buttonId: string
}

const Style = styled.nav`
  position: fixed;
  z-index: 1;

  height: 100vh;

  background-color: ${fromTheme('primary')};

  ul {
    position: relative;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    li {
      width: 100%;
      height: 72px;

      button {
        display: flex;
        align-items: center;

        width: 100%;

        .Icon {
          min-width: 24px;
          min-height: 24px;
          width: 24px;
          height: 24px;
          margin: 24px;

          fill: #fcfcfc;
          stroke: #fcfcfc;
        }

        span {
          opacity: 0;
          white-space: nowrap;
          color: ${fromTheme('secondary')};
        }
      }
    }
  }

  .Hamburger {
    width: 72px;
    height: 72px;
  }
`

export const ListItem = styled.li<ListItemProps>`
  ${({ bottom }) =>
    bottom &&
    css`
      position: absolute;
      bottom: 72px;
      left: 0;
    `}

  ${({ pathname, buttonId }) => {
    return (
      pathname.includes(buttonId) &&
      css`
        ${`#${buttonId}`} {
          background-color: ${fromTheme('tertiary')};
        }
      `
    )
  }}
`

export default Style

Style.displayName = 'Sidebar-Style'
