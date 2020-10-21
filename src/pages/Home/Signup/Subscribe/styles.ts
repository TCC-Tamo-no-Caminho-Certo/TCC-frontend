import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: 100vw;
  height: 100vh;

  color: ${fromTheme('white')};
  background-color: ${fromTheme('tertiary')};

  @media screen and (min-width: 1000px) {
    width: 62vw;
  }
`

export default Style

Style.displayName = 'Subscribe-Style'
