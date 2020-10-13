import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'

const Style = styled(motion.li)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  overflow: hidden;

  background-color: ${fromTheme('tertiary')};

  .Card + .Card {
    margin-left: 60px;
  }
`

export default Style

Style.displayName = 'Style'
