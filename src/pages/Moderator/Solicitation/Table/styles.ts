import { StatusTypes } from './'

import { Role } from 'store/user'

import { darken } from 'polished'
import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

interface RoleTdProps {
  role: Role
}

export const RoleTd = styled.td<RoleTdProps>`
  color: ${({ theme, role }) => theme.roles[role]};
`

export const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'accepted':
        return theme.colors.green
      case 'awaiting':
        return theme.colors.yellow
      case 'rejected':
        return theme.colors.red
      default:
        return theme.colors.white
    }
  }};
`

const Style = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  input {
    width: 90%;
    height: 32px;
    border-radius: 8px;
    padding-left: 16px;
    margin: 0 0 16px 5%;

    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  #tableWrapper {
    width: 100%;
    height: calc(100vh - 2px - 137px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }
  }

  thead {
    width: 100%;
    padding-right: 8px;

    tr {
      display: flex;
      align-items: center;

      width: 100%;
      height: 32px;
    }

    th {
      width: 30%;
      height: 100%;
      text-align: left;

      cursor: pointer;

      button {
        height: 100%;
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

  table {
    border-collapse: collapse;
    width: 100%;

    tbody {
      tr {
        display: flex;
        align-items: center;

        td {
          display: flex;
          align-items: center;

          width: 30%;
          height: 32px;
        }
      }

      tr:hover {
        background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

        cursor: pointer;
      }
    }
  }

  td:last-child,
  th:last-child {
    text-align: right;
    justify-content: flex-end;

    margin-right: 5%;
  }

  .statusCircle {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    margin-left: 5%;
  }
`

export default Style
