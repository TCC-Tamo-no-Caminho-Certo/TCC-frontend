import { motion } from 'framer-motion'
import styled from 'styled-components'

interface StyleProps {
  width: string
  height: string
}

export const MotionRect = styled(motion.rect).attrs({
  width: '24',
  height: '3',
  rx: '2'
})``

const Style = styled.button.attrs({
  type: 'button',
  className: 'Hamburger'
})<StyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  svg {
    overflow: visible;
  }
`

export default Style

MotionRect.displayName = 'Rect-Style'
Style.displayName = 'Hamburger-Style'
