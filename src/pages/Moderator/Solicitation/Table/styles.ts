import { StatusTypes } from './'

import { Role } from 'store/user'

import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface RoleTdProps {
  role: Role
}

interface ContentProps {
  role?: Role
  status?: StatusTypes
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

export const ModalContent = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;

  position: relative;

  padding: 24px;
  border-radius: 8px;
  width: 70vw;
  height: 80vh;
  overflow-y: scroll;

  background-color: ${({ theme }) => theme.colors.tertiary};

  > *,
  form > * {
    width: 100%;
  }

  .Textarea {
    margin-top: 16px;
  }

  #CloseIcon {
    position: absolute;
    top: 24px;
    right: 24px;

    height: 16px;
    width: 16px;

    stroke: ${({ theme }) => theme.colors.secondary};
  }

  #avatarAndInfo {
    display: flex;
    align-items: center;

    margin-bottom: 24px;

    #info {
      margin-left: 24px;

      #status {
        color: ${({ theme, status }) => {
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
      }

      ${({ theme, role }) =>
        role &&
        css`
          #role {
            color: ${theme.roles[role]};
          }
        `}
    }
  }

  #buttons {
    display: flex;
    justify-content: space-between;

    button {
      width: 45%;
      padding: 8px 16px;
      border-radius: 4px;
      margin-top: 12px;

      background-color: ${({ theme }) => theme.colors.green};
      color: ${({ theme }) => theme.colors.secondary};

      & + button {
        background-color: ${({ theme }) => theme.colors.red};
      }
    }
  }

  #doc {
    min-height: 1200px;
    background-color: white;
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  form,
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

      .Text {
        border: transparent;
        background-color: red;

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

        .DatePicker {
          width: 50%;

          .DatePicker,
          .InputInDate {
            height: 100%;
          }

          .Text {
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

      width: clamp(100px, 15%, 170px);

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
