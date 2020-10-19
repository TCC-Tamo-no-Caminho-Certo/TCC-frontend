import { animated } from 'react-spring'
import styled from 'styled-components'

interface StyleProps {
  size: string
  gap: string
}

interface DotProps {
  style: any
}

export const Dot = styled(animated.button)<DotProps>``

const Style = styled.div.attrs({ className: 'Dots' })<StyleProps>`
  display: flex;

  ${Dot} {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 100%;

    background-color: white;
  }

  ${Dot} + ${Dot} {
    margin-left: ${({ gap }) => gap};
  }
`

export default Style

Dot.displayName = 'Dot-Style'
Style.displayName = 'Dots-Style'
