import styled from 'styled-components'

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
    padding: 16px 16px 0px 8px;

    h1 {
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.3rem);
    }
  }

  .Table {
    th,
    td {
      &#name {
        width: 100%;
      }

      &#role {
        min-width: 100px;
      }

      &#created_at {
        display: flex;
        justify-content: flex-end;

        min-width: 82px;
      }
    }

    th {
      &#created_at button {
        display: flex;
        justify-content: center;
      }

      &#statusCircle {
        &,
        button {
          min-width: 32px;
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    td {
      &#status {
        display: flex;
        align-items: center;
        justify-content: center;

        min-width: 32px;
      }
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 16px 0px 24px;
    }
  }
`

export default Style

Style.displayName = 'Requests-Style'
