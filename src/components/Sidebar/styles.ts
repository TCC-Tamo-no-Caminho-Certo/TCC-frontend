import fromTheme from 'utils/fromTheme'

import styled, { css } from 'styled-components'

interface ListItemProps {
  bottom?: boolean
}

const Style = styled.nav`
  position: fixed;
  z-index: 1;

  height: 100vh;

  background-color: ${fromTheme('primary')};

  .Hamburger {
    width: 72px;
    height: 72px;
  }

  ul {
    position: relative;
    top: 0;
    left: 0;

    width: 100%;

    li {
      width: 100%;
      height: 72px;

      button {
        display: flex;
        align-items: center;

        width: 100%;

        img {
          width: 24px;
          height: 24px;
          margin: 24px;

          color: #fff;
        }

        span {
          opacity: 0;
          white-space: nowrap;
          color: ${fromTheme('secondary')};
        }
      }
    }
  }
`

export const ListItem = styled.li<ListItemProps>`
  ${({ bottom }) =>
    bottom &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
    `}
`

export default Style

Style.displayName = 'Sidebar-Style'
