import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Loader = styled.span`
  border: 3px solid ${fromTheme('quaternary')};
  border-radius: 50%;
  border-top: 3px solid #fff;
  width: 18px;
  height: 18px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

Loader.displayName = 'Loader'

export default Loader
