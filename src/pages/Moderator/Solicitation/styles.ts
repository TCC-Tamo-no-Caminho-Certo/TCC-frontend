import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  overflow-y: hidden;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  header {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 16px 16px;
    text-align: left;
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 32px;
    }
  }
`
export default Style

Style.displayName = 'Solicitation-Style'
