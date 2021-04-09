import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.div)`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    flex-direction: row-reverse;
  }
`

export default Style

Style.displayName = 'Login-Style'
