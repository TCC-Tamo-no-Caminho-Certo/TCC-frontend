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

        &:hover {
          cursor: pointer;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
        }

        td {
          display: flex;
          align-items: center;

          overflow: hidden;
          min-height: 32px;
          padding: 8px 4px;
          font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
          line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

          &.statusCircle {
            display: flex;
            align-items: center;
            justify-content: center;

            min-width: 32px;
            height: 32px;
          }

          &.status {
            display: none;

            min-width: 100px;
          }

          &.name {
            width: 100%;
          }

          &.role {
            min-width: 100px;
          }

          &.date {
            min-width: 64px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 545px) {
    table tbody tr td.role {
      min-width: 165px;
    }
  }

  @media screen and (min-width: 745px) {
    table tbody tr {
      padding: 0 24px;
    }
  }
`

export const ModalContent = styled.div<ModalContentProps>`
  position: relative;

  display: flex;
  flex-direction: column;

  width: max(100vw, 320px);
  height: 95vh;
  padding: 24px;
  border-radius: 8px;
  overflow-y: scroll;

  background-color: ${({ theme }) => theme.colors.tertiary};

  > *,
  form > * {
    width: 100%;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.6rem);
    width: 100%;
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
      font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.7rem);

      div + div {
        margin-top: 4px;
      }

      #name {
        font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.8rem);
      }

      #status {
        font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.6rem);
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
    flex: 1;

    padding: 32px 0;

    background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (min-width: 545px) {
    width: max(80vw, 320px);
  }
`

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: max(100%, 280px);
  padding: 0 16px 0 8px;

  & > * {
    margin-bottom: 16px;

    box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
  }

  .Text {
    width: max(100%, 100px);
    min-width: 100px;
    min-height: 44px;

    input {
      width: 100%;
      min-height: 44px;
    }
  }

  .SelectRole {
    width: 100%;
    border-radius: 8px;

    .Select__control {
      height: 44px;
    }
  }

  .SelectFilter {
    min-width: 100%;
    border-radius: 8px;

    .Select__control {
      height: 44px;
    }
  }

  .Submit {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    border-radius: 8px;
    padding: 8px;
    min-height: 44px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      margin-right: 12px;
      height: 20px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  #dates {
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 10;

    width: 100%;

    transform: translateY(-2px);

    box-shadow: none;

    .Datepicker {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 50%;

      & + .Datepicker {
        margin-left: 24px;
      }

      .Text {
        min-width: 100px;

        box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      }
    }
  }

  @media screen and (min-width: 545px) {
    padding: 0 16px;
  }

  @media screen and (min-width: 660px) {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-bottom: 16px;
    height: 44px;

    & > * {
      height: 100%;
      margin-bottom: 0;
    }

    .Text,
    .SelectRole {
      margin-right: 24px;
    }

    .SelectFilter {
      margin-top: 0px;
      min-width: 120px;
    }

    .Submit {
      width: clamp(160px, 20%, 280px);
      margin-left: 24px;
    }

    #dates {
      margin-right: 24px;
    }
  }

  @media screen and (min-width: 745px) {
    padding: 0 32px;
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};
`

export default Style

RoleTd.displayName = 'RoleTd-Style'
BodyWrapper.displayName = 'BodyWrapper-Style'
ModalContent.displayName = 'ModalContent-Style'

Style.displayName = 'Table-Style'
