import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'

export const Navbar = styled(motion.nav)`
  width: 300px;
  height: 100vh;

  .Hamburger {
    width: 72px;
    height: 72px;
  }

  ul {
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

export const Content = styled.div`
  width: 100%;
  overflow: hidden;
`

const Style = styled.div`
  display: flex;
`

export default Style
