import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
  position: absolute;
  top: 0px;

  display: flex;
  flex-direction: column;

  width: max(100vw - 8px, 312px);

  @media screen and (min-width: 545px) {
    width: max(100vw - 16px, 312px);
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;

    width: max(100vw, 312px);
  }
`

export default Style

Style.displayName = 'Signup-Style'
