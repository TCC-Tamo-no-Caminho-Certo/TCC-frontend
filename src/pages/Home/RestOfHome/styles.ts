import styled from 'styled-components'

const Style = styled.main`
  position: absolute;
  top: 200vh;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  font-size: 3rem;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: transparent;

  @media screen and (min-width: 1200px) {
    top: 100vh;
  }
`

export default Style

Style.displayName = 'Home-Style'
