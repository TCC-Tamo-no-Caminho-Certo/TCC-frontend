import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;

  width: max(100vw - 8px, 312px);

  @media screen and (min-width: 545px) {
    width: max(100vw - 16px, 200px);
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row-reverse;

    width: max(100vw, 320px);
  }
`

export default Style

Style.displayName = 'Signup-Style'
