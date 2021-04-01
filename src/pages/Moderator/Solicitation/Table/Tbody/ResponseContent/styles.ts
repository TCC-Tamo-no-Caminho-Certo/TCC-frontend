import { getStatusColor, StatusTypes } from 'utils/status'

import { Role } from 'store/roles'

import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface ResponseContentProps {
  role?: Role
  status?: StatusTypes
}

const Style = styled.div<ResponseContentProps>`
  position: relative;

  display: flex;
  flex-direction: column;

  width: max(100vw, 320px);
  height: 95vh;
  padding: 24px 16px 24px 24px;
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

  #info {
    display: flex;
    flex-direction: column;

    width: 100%;
    margin: 32px 0 24px 0;
    padding-bottom: 16px;

    border: solid ${({ theme }) => theme.colors.secondary} 1px;

    hr {
      border: solid 1px ${({ theme }) => theme.colors.secondary};
      margin-bottom: 16px;
    }

    #avatar {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #title {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);
      padding: 16px 0;
    }

    .field {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
      padding: 8px;

      div {
        margin-top: 8px;
      }

      & + .field {
        margin-top: 16px;
      }

      #status {
        color: ${({ theme, status }) => getStatusColor(theme, status)};
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

  #radios {
    display: flex;
    justify-content: space-evenly;

    margin-top: 16px;

    #acceptLabel {
      margin-left: 8px;
    }

    #rejectLabel {
      margin-left: 8px;
    }

    color: ${({ theme }) => theme.colors.secondary};

    div {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: ${({ theme }) => theme.colors.green};
      padding: 8px;
      border-radius: 8px;
      width: 45%;

      & + div {
        background-color: ${({ theme }) => theme.colors.red};
      }
    }
  }

  .Submit {
    margin-top: 16px;
  }

  #doc {
    display: flex;
    justify-content: center;
    flex-direction: column;

    min-height: 100vh;

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  #feedback {
    p {
      margin-top: 8px;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
      word-wrap: break-word;
    }
  }

  @media screen and (min-width: 545px) {
    width: max(80vw, 320px);

    #info {
      .field {
        flex-direction: row;

        div {
          margin: 0 0 0 8px;
        }
      }
    }
  }
`

export default Style

Style.displayName = 'ResponseContent-Style'