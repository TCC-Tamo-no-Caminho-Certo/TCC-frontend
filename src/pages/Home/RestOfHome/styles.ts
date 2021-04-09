import styled from 'styled-components'

const Style = styled.main`
  position: absolute;
  top: 200vh;
  z-index: -1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};

  @media screen and (min-width: 1200px) {
    top: 100vh;
  }
`

export default Style

Style.displayName = 'RestOfHome-Style'
