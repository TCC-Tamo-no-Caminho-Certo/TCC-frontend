import { Role } from 'store/user'

import styled from 'styled-components'

interface StyleProps {
  role: Role
}

const Style = styled.div<StyleProps>`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.tertiary};

  .Card {
    justify-content: center;

    padding-bottom: 48px;
    border-radius: 0px;
    width: clamp(320px, 100vw, 550px);

    > * {
      margin-top: 24px;
    }

    .Header {
      height: 64px;
      border-radius: 0px;
      margin-top: 0px;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.5rem);
    }

    #role {
      text-align: center;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.5rem);
      width: 100%;

      color: ${({ theme, role }) => theme.roles[role]};
    }

    #requestRow {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      text-align: center;

      color: ${({ theme }) => theme.colors.tertiary};

      div {
        width: 100px;
      }
    }

    svg {
      width: 100%;

      path.checkIcon {
        fill: ${({ theme }) => theme.colors.secondary};
      }

      path.errorIcon {
        stroke: ${({ theme }) => theme.colors.secondary};
        stroke-width: 3;
      }

      stop#true {
        stop-color: ${({ theme }) => theme.colors.primary};
      }

      stop#false {
        stop-color: ${({ theme }) => theme.colors.tertiary};
      }
    }

    #buttonsRow {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      width: 100%;

      button#info {
        font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2rem);

        color: ${({ theme }) => theme.colors.tertiary};
      }

      button#cancel {
        font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2rem);

        border-radius: 8px;
        padding: 8px 32px;

        color: ${({ theme }) => theme.colors.primary};
        border: solid ${({ theme }) => theme.colors.primary} 1px;
      }
    }
  }

  @media screen and (min-width: 620px) {
    svg {
      padding: 0px 32px;
    }

    .Card {
      border-radius: 24px;

      .Header {
        border-radius: 24px 24px 0 0;
      }
    }
  }
`

export default Style

Style.displayName = 'RequestStatus-Style'
