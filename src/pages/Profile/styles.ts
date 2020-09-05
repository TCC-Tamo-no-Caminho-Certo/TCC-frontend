import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: blue;
  color: ${fromTheme('white')};
`

export default Style
