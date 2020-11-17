import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-color: ${fromTheme('tertiary')};
  color: white;
`

export default Style

Style.displayName = 'Student-Style'