import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div``

export const Row = styled.section`
  display: grid;
  background-color: ${fromTheme('quinary')};

  grid:
    'login signup' minmax(100vh, auto)
    'about subscribe' 100vh / 100vw 100vw;

  @media screen and (min-width: 1200px) {
    grid: 'about login signup subscribe' 100vh / 62vw 38vw 38vw 62vw;
  }
`

export default Style
