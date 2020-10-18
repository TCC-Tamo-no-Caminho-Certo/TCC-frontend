import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Loader = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 50%;

  border-top: 3px solid #fff;
  border: 3px solid ${fromTheme('quaternary')};
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

export default Loader

Loader.displayName = 'Loader-Style'
