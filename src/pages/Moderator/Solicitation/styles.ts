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

    width: max(100%, 280px);
    padding: 16px 16px;
    text-align: left;

    h1 {
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 32px;
    }
  }
`
export default Style

Style.displayName = 'Solicitation-Style'
