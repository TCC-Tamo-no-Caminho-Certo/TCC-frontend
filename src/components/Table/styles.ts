import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
    }

    thead tr {
      th {
        text-align: left;

        &:first-child {
          padding-left: 40px;
        }
      }

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39);
    }

    tbody tr {
      &:hover {
        cursor: pointer;

        background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
      }

      &:first-child td {
        padding-top: 12px;
      }

      &:first-child:hover {
        box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39) inset;
      }
    }
  }

  #TableRefreshIcon {
    position: absolute;

    height: 24px;
    width: 18px;
    margin-left: 8px;

    transform: translateY(25%);
    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export default Style

Style.displayName = 'Table-Style'
