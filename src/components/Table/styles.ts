import { darken } from 'polished'
import styled from 'styled-components'

export const FilterButton = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  .Submit {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 40px;

    border-radius: 16px 0 0 16px;

    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      height: 16px;
      margin-right: 12px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    & + button {
      align-self: flex-end;

      height: 40px;
      width: 200px;
      padding: 4px 16px;
      transition: all 0.2s;
      border-radius: 0 16px 16px 0;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }
    }
  }
`

const Style = styled.div`
  position: relative;

  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  form {
    background-color: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    overflow-y: scroll;
    border-spacing: 0px;

    th,
    td {
      padding: 8px;
      user-select: none;
    }

    thead {
      z-index: 2;

      width: 100%;
      background-color: ${({ theme }) => theme.colors.tertiary};

      tr {
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
    }

    tbody {
      tr {
        height: 32px;

        &:hover {
          cursor: pointer;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
        }

        &:first-child td {
          padding-top: 12px;
        }

        &:first-child:hover {
          box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39) inset;
        }
      }
    }
  }

  #TableRefreshIcon {
    position: absolute;
    top: 0;
    z-index: 3;

    width: 18px;
    height: 24px;
    margin-left: 8px;
    transform: translateY(25%);

    fill: ${({ theme }) => theme.colors.secondary};
  }

  #loader {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-top: 32px;
  }
`

export default Style

FilterButton.displayName = 'FilterButton-Style'
Style.displayName = 'Table-Style'
