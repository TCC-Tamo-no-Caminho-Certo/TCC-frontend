import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.section`
  grid-area: about;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: 100%;
  height: 100%;

  color: ${fromTheme('white')};
  background-color: ${fromTheme('background')};
`

export default Style
