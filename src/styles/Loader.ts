import styled, { keyframes } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface LoadingComponentProps {
  border: string
  size: string
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
    }`

const Loader = styled.div<LoadingComponentProps>`
  border: ${props => props.border} solid ${fromTheme('tertiary')};
  border-radius: 50%;
  border-top: ${props => props.border} solid #fff;
  width: ${props => props.size};
  height: ${props => props.size};
  animation: ${spin} 2s linear infinite;
`

export default Loader
