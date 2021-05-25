import styled from 'styled-components'

const Style = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: clamp(320px, 80%, 600px);

  & + li {
    margin-top: 24px;
  }

  p {
    margin-bottom: 24px;
  }

  #name {
    z-index: 2;

    width: 100%;
    height: 72px;
    padding: 16px 48px;

    border-radius: 24px 24px 0 0;
    font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }

  #info {
    height: 0px;
    width: 100%;
    border-radius: 0 0 24px 24px;

    color: ${({ theme }) => theme.colors.tertiary};
    background-color: ${({ theme }) => theme.colors.secondary};

    > * {
      margin-top: 24px;

      &:first-child {
        margin-top: 0px;
      }
    }

    #title {
      width: 100%;
      font-weight: 600;
      text-align: center;
      margin-bottom: 24px;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2.2rem);

      color: ${({ theme }) => theme.colors.primary};
    }

    table {
      width: 100%;
      border-collapse: collapse;

      border: solid 2px ${({ theme }) => theme.colors.tertiary};

      tr {
        th,
        td {
          padding: 8px 0px;
          height: 42px;
          text-align: center;

          border: solid 1px ${({ theme }) => theme.colors.tertiary};
        }

        th {
          width: 50%;
        }
      }
    }

    .Submit {
      margin-top: 16px;
      width: 100%;
    }
  }
`

export default Style
