import { darken } from 'polished'
import styled from 'styled-components'

interface CircleProps {
  status?: 'accepted' | 'waiting' | 'refused'
}

export const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 50%;
  transform: translateX(-50%);

  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'accepted':
        return theme.colors.green
      case 'waiting':
        return theme.colors.yellow
      case 'refused':
        return theme.colors.red
      default:
        return theme.colors.white
    }
  }};
`

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
        cursor: pointer;
        text-align: left;

        button {
          text-align: left;
          user-select: none;

          color: ${({ theme }) => theme.colors.secondary};

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

    td:last-child,
    th:last-child {
      padding-right: 24px;
      text-align: right;
    }

    td.statusCircle,
    th.statusCircle {
      width: 32px;
      text-align: center;
    }
  }
`

export default Style
