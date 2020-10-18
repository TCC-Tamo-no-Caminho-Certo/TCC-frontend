import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 62vw;
  height: 100vh;

  color: ${fromTheme('white')};
  background-color: ${fromTheme('tertiary')};
`

export default Style

Style.displayName = 'Subscribe-Style'
