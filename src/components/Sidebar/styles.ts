import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

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
          padding: 24px;
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

export const BackButton = styled.div`
  position: absolute;
  bottom: 0;

  padding: 24px;

  width: 100%;
  height: 72px;

  button {
    display: flex;
    align-items: center;

    width: 100%;

    span {
      padding: 0 14px;
      white-space: nowrap;
      color: white;
    }
  }
`

export default Style

Style.displayName = 'Sidebar-Style'
