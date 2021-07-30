import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};

  @media screen and (min-width: 1200px) {
    width: 62vw;
  }
`

export default Style

Style.displayName = 'Subscribe-Style'
