import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: subscribe;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${fromTheme('primary')};
`
