import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  flex-direction: column;

  width: 90%;

  color: ${({ theme }) => theme.colors.secondary};

  input {
    height: 32px;
    border-radius: 8px;
    padding-left: 16px;
    margin: 24px 0;

    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  table {
    border-collapse: collapse;

    tr {
      th,
      td {
        height: 32px;
      }
    }

    thead {
      th {
        text-align: left;

        cursor: pointer;

        div {
          user-select: none;

          .Icon {
            width: 12px;
            margin-right: 8px;

            fill: ${({ theme }) => theme.colors.secondary};
          }
        }
      }
    }

    tbody {
      tr:hover {
        background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

        cursor: pointer;
      }
    }

    td:first-child,
    th:first-child {
      padding-left: 24px;
    }

    td:last-child,
    th:last-child {
      padding-right: 24px;
      text-align: right;
    }
  }
`

export default Style
