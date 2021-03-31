import { Role } from 'store/roles'

import styled from 'styled-components'

interface StyleProps {
  role: Role
}

const Style = styled.div<StyleProps>`
  width: 100%;
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
      font-size: clamp(2rem, 0.6rem + 2.6vw, 2.5rem);
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

    #rejected {
      p + p {
        font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
        text-align: justify;
      }

      #title {
        text-align: center;
        font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2rem);

        color: ${({ theme }) => theme.colors.red};
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
  }

  #scrollButton {
    width: 100%;
    padding: 8px;

    color: ${({ theme }) => theme.colors.tertiary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media screen and (min-width: 545px) {
    svg {
      padding: 0px 32px;
    }
  }

  @media screen and (min-width: 620px) {
    .Card {
      border-radius: 24px;
      transform: translateX(-16px);

      .Header {
        border-radius: 24px 24px 0 0;
      }
    }
  }
`
export default Style

Style.displayName = 'RequestStatus-Style'
