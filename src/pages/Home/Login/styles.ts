import { Overflow } from 'App'
import { motion } from 'framer-motion'
import styled from 'styled-components'

interface StyleProps {
  overflow?: Overflow
}

const Style = styled(motion.section)<StyleProps>`
  display: flex;
  flex-direction: column;

  width: max(100vw, 320px);

  @media screen and (min-width: 545px) {
    width: max(100vw, 320px);
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row-reverse;

    width: max(100vw, 320px);
  }
`

export default Style

Style.displayName = 'Login-Style'
