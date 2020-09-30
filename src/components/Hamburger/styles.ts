import styled from 'styled-components'

import { motion } from 'framer-motion'

export const MotionRect = styled(motion.rect).attrs({
  width: '24',
  height: '3',
  fill: '#fff',
  rx: '2',
})``

const Style = styled.button.attrs({
  type: 'button',
})`
  width: 72px;
  height: 70px;

  svg {
    overflow: visible;
  }
`

export default Style
