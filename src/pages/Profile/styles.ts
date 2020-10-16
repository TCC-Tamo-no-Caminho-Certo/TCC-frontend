import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'

export const Content = styled(motion.ul)`
  overflow: hidden;
`

export const Sidebar = styled(motion.nav)`
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
          white-space: nowrap;
          color: ${fromTheme('secondary')};
        }
      }
    }
  }
`

const Style = styled(motion.section)`
  display: flex;
`

export default Style

Style.displayName = 'Style'
Content.displayName = 'Content'
Sidebar.displayName = 'Sidebar'
