import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface RowProps {
  registerSlide: string | boolean
}

const Style = styled.div`
  overflow: hidden;
`

export const Row = styled.section<RowProps>`
  display: grid;

  background-color: ${fromTheme('primary')};

  grid:
    'login signup' ${({ registerSlide }) =>
      registerSlide ? 'minmax(100vh, auto)' : '100vh'}
    'about subscribe' 100vh/ 100vw 100vw;

  @media screen and (min-width: 1200px) {
    grid: 'about login signup subscribe' 100vh / 62vw 38vw 38vw 62vw;
  }
`

export default Style
