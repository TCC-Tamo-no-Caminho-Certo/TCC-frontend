import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  display: flex;
  flex-direction: column;

  height: 200vh;

  background-color: ${fromTheme('primary')};
`

export default Style
