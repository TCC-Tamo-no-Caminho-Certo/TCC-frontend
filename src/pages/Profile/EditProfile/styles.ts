import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
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

Style.displayName = 'EditProfile-Style'
