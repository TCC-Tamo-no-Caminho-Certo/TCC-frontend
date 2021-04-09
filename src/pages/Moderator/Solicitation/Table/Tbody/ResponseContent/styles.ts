import { getStatusColor, StatusTypes } from 'utils/status'

import { Role } from 'store/AsyncThunks/roles'

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

  .Submit {
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

  #radios {
    display: flex;
    justify-content: space-evenly;

    margin: 16px 0;

    color: ${({ theme }) => theme.colors.secondary};

    div {
      border: solid 1px ${({ theme }) => theme.colors.green};
      padding: 8px;
      border-radius: 8px 0 0 8px;
      width: 50%;
      height: 100%;

      &,
      label {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & + div {
        border-radius: 0 8px 8px 0;
        border: solid 1px ${({ theme }) => theme.colors.red};
      }

      input {
        display: none;
      }

      .CheckboxIcon {
        width: 24px;
        margin-right: 8px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
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

  #dots {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 50%;
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
