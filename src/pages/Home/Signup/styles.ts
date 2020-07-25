import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: signup;
  width: 100%;
  min-height: 100%;
  padding: 5vh 0 5vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${fromTheme('background')};
`
