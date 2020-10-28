import { motion } from 'framer-motion'
import styled from 'styled-components'

export const MotionRect = styled(motion.rect).attrs({
  width: '24',
  height: '3',
  fill: '#fff',
  rx: '2',
})``

const Style = styled.button.attrs({
  type: 'button',
  className: 'Hamburger',
})`
  width: 72px;
  height: 70px;

  svg {
    overflow: visible;
  }
`

export default Style

MotionRect.displayName = 'Rect-Style'
Style.displayName = 'Hamburger-Style'
