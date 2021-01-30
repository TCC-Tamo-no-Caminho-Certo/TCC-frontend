import { Role } from 'store/user'

import { darken } from 'polished'
import styled from 'styled-components'

interface RoleTdProps {
  role: Role
}

export const RoleTd = styled.td<RoleTdProps>`
  color: ${({ theme, role }) => theme.roles[role]};
`

export const BodyWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 147px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  table {
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

        td.statusCircle {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 32px;
          margin-left: 5%;
        }

        td:last-child {
          text-align: right;
          justify-content: flex-end;

          margin-right: 5%;
        }
      }

      tr:hover {
        background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

        cursor: pointer;
      }
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  #row {
    display: flex;
    justify-content: space-between;

    width: 90%;
    height: 42px;
    margin-bottom: 16px;

    #filters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      width: 80%;
      height: 100%;
      border-radius: 8px;
      margin-right: 24px;

      border: solid 1px ${({ theme }) => theme.colors.secondary};
      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.2);

      .InputSearch {
        width: 40%;
        height: 100%;
        padding-right: 16px;

        background-color: transparent;
        border: none;
        color: ${({ theme }) => theme.colors.secondary};

        .iconSpace {
          width: 48px;
        }

        input {
          color: ${({ theme }) => theme.colors.secondary};
          -webkit-text-fill-color: ${({ theme }) => theme.colors.secondary};

          &::placeholder {
            color: ${({ theme }) => theme.colors.secondary};
            -webkit-text-fill-color: ${({ theme }) => theme.colors.secondary};
          }
        }
      }

      #dates {
        display: flex;
        align-items: center;

        width: 50%;

        .InputDate {
          width: 50%;

          .DatePicker,
          .InputInDate {
            height: 100%;
          }

          .Input {
            border: none;

            .Icon {
              width: 12px;

              fill: ${({ theme }) => theme.colors.secondary};
            }

            input::placeholder {
              color: ${({ theme }) => theme.colors.secondary};
            }
          }

          .iconSpace {
            width: 28px;
          }
        }
      }
    }

    #searchButton {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 15%;
      max-width: 170px;
      height: 100%;
      border-radius: 8px;

      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);

      .Icon {
        margin-right: 12px;
        fill: ${({ theme }) => theme.colors.secondary};
        height: 20px;
      }
    }
  }

  .DotsLoader {
    position: absolute;
    top: 0;
    left: 50%;
  }
`

export default Style

Style.displayName = 'Table-Style'
BodyWrapper.displayName = 'BodyWrapper-Style'
