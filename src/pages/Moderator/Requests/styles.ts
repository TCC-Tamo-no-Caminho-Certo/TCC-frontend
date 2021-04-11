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
    justify-content: center;
    align-items: center;

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

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  header {
    display: flex;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 16px 8px;
    text-align: left;

    h1 {
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.3rem);
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 16px;
    }
  }

  @media screen and (min-width: 745px) {
    header {
      padding: 16px 32px;
    }
  }
`

export default Style

Table.displayName = 'Table-Style'
Style.displayName = 'Requests-Style'
