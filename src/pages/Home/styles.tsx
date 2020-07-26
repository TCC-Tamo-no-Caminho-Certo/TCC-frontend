import styled from 'styled-components'

interface StyleProps {
  register: string | boolean
}

export const Style = styled.div<StyleProps>`
  display: grid;
  overflow: hidden;

  grid:
    'login signup' ${({ register }) =>
      register === 'registering' ? 'minmax(100vh, auto)' : '100vh'}
    'about .' 100vh/ 100vw 100vw;

  @media screen and (min-width: 1200px) {
    grid: 'about login signup subscribe' 100vh / 70vw 30vw 30vw 70vw;
  }
`
