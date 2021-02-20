import { StatusTypes } from './'

import { Role } from 'store/user'

import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface RoleTdProps {
  role: Role
}

interface ModalContentProps {
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
      border: none;

      tr {
        display: flex;
        align-items: center;

        width: 100%;
        min-height: 32px;
        padding: 0 16px 0 8px;

        &:hover {
          cursor: pointer;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
        }

        td {
          display: flex;
          align-items: center;

          height: 100%;

          &.statusCircle {
            display: flex;
            align-items: center;
            justify-content: center;

            min-width: 24px;
            height: 32px;
            font-size: 1.6rem;
          }

          &.status {
            display: none;

            min-width: 100px;
          }

          &.name {
            width: 100%;
          }

          &.role {
            min-width: 80px;
          }

          &.date {
            justify-content: center;

            min-width: 64px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 745px) {
    table tbody tr {
      padding: 0 8px;
    }
  }

  @media screen and (min-width: 745px) {
    table tbody tr {
      padding: 0 32px;

      td.statusCircle {
        min-width: 32px;
      }
    }
  }
`

export const ModalContent = styled.div<ModalContentProps>`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 70vw;
  height: 80vh;
  padding: 24px;
  border-radius: 8px;
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
      margin-top: 12px;
      border-radius: 0 8px;
      transition: all 0.2s ease-in-out;

      background-color: ${({ theme }) => theme.colors.green};
      color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        background-color: ${({ theme }) => darken(0.1, theme.colors.green)};
      }

      & + button {
        border-radius: 8px 0;

        background-color: ${({ theme }) => theme.colors.red};

        &:hover {
          background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
        }
      }
    }
  }

  #doc {
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 32px 0;

    background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

    img {
      object-fit: contain;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    padding: 8px 16px;
    border-radius: 0 0 16px 16px;
    transition: all 0.3s ease-in-out;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
    }

    .Icon {
      height: 16px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
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

  form {
    display: flex;
    align-items: center;
    flex-direction: column;

    width: max(100%, 280px);
    padding: 0 32px 0 16px;

    #filters {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      border-radius: 8px;

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.2);
      border: solid 1px ${({ theme }) => theme.colors.secondary};

      .Text {
        width: 100%;
        height: 40px;

        border: none;
        color: ${({ theme }) => theme.colors.secondary};

        input {
          width: 100%;

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

      margin: 16px 0;
      width: 100%;
      height: 40px;
      border-radius: 8px;

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};

      .Icon {
        margin-right: 12px;
        height: 20px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  .DotsLoader {
    position: absolute;
    top: 0;
    left: 50%;
  }

  @media screen and (min-width: 545px) {
    form {
      padding: 0 32px;
    }
  }

  @media screen and (min-width: 620px) {
    form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      margin-bottom: 16px;
      height: 40px;

      #filters {
        flex: 1;
        height: 100%;
        margin-right: 24px;
        border-radius: 8px;
      }

      #searchButton {
        width: clamp(100px, 15%, 170px);
        margin: 0;
      }
    }
  }
`

export default Style

RoleTd.displayName = 'RoleTd-Style'
BodyWrapper.displayName = 'BodyWrapper-Style'
ModalContent.displayName = 'ModalContent-Style'
Style.displayName = 'Table-Style'
