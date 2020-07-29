import styled from 'styled-components'

interface RowProps {
  registerSlide: string | boolean
}

export const Style = styled.div`
  /* overflow: hidden; */
`

export const Row = styled.section<RowProps>`
  display: grid;

  grid:
    'login signup' ${({ registerSlide }) =>
      registerSlide ? 'minmax(100vh, auto)' : '100vh'}
    'about .' 100vh/ 100vw 100vw;

  @media screen and (min-width: 1200px) {
    grid: 'about login signup subscribe' 100vh / 70vw 30vw 30vw 70vw;
  }
`
