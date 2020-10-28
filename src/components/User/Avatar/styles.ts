import styled from 'styled-components'

interface Props {
  size: number
}

const Style = styled.img<Props>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  border-radius: 50%;
`

Style.displayName = 'Avatar-Style'

export default Style