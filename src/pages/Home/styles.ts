import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.main`
  position: absolute;
  top: 200vh;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  font-size: 3rem;

  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('tertiary')};

  @media screen and (min-width: 1000px) {
    top: 100vh;
  }
`

export default Style

Style.displayName = 'Home-Style'
