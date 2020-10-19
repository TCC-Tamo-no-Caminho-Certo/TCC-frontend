import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  position: relative;
  width: 100vw;
  height: 200vh;

  background-color: ${fromTheme('white')};
`

export default Style

Style.displayName = 'Map-Style'
