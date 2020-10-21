import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1000px) {
    flex-direction: row;
  }
`

export default Style

Style.displayName = 'Signup-Style'
