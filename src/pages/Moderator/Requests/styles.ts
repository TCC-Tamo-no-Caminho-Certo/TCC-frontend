import styled from 'styled-components'

export const Table = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 48px;
  }
`

const Style = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  overflow-y: hidden;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  header {
    display: flex;
    text-align: left;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 16px 8px;

    h1 {
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.3rem);
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 32px;
    }
  }
`

export default Style

Table.displayName = 'Table-Style'
Style.displayName = 'Requests-Style'
