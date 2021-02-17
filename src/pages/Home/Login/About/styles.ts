import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: max(100vw, 320px);
  height: 100vh;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: transparent;

  @media screen and (min-width: 1200px) {
    width: 62vw;
  }
`

export default Style

Style.displayName = 'About-Style'
