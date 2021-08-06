import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  width: 100%;

  form {
    background-color: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 8px;
    }

    thead tr {
      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39);

      th {
        cursor: pointer;
        text-align: left;

        .ArrowIcon {
          width: 18px;
          margin-right: 8px;

          fill: ${({ theme }) => theme.colors.secondary};
        }

        &:first-child {
          padding-left: 40px;
        }
      }
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

  #loader {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
  }
`

export default Style

Style.displayName = 'Table-Style'
