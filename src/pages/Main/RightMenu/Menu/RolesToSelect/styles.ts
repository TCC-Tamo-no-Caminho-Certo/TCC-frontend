import { RoleType } from 'types/Responses/user/roles'

import styled from 'styled-components'

interface RoleLiProps {
  role: RoleType
}

export const RoleLi = styled.li<RoleLiProps>`
  button {
    width: 100%;
    height: 56px;
    user-select: none;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme, role }: any) => theme.colors.roles[role]};
    }
  }

  &:first-child {
    button {
      &:hover {
        background-color: ${({ theme, role }: any) => theme.colors.roles[role]};
      }
    }
  }

  &:last-child {
    button {
      &:hover {
        background-color: ${({ theme, role }: any) => theme.colors.roles[role]};
      }
    }
  }

  &:only-child {
    button {
      &:hover {
        background-color: ${({ theme, role }: any) => theme.colors.roles[role]};
      }
    }
  }

  @media screen and (min-width: 545px) {
    &:first-child {
      button {
        border-radius: 16px 0 0 0;
      }
    }

    &:last-child {
      button {
        border-radius: 0 0 16px 16px;
      }
    }

    &:only-child {
      button {
        border-radius: 16px 0 0 16px;
      }
    }
  }
`

const Style = styled.div`
  position: absolute;
  right: 0px;
  top: 112px;
  z-index: 4;

  width: 100%;
  clip-path: inset(-20px 0px -20px -20px);
  box-shadow: ${({ theme }) => theme.shadow.normal};
  border-radius: 16px 0 0 16px;

  .Icon {
    position: absolute;
    right: 0;
    top: 28px;
    z-index: 2;

    width: 16px;
    height: 16px;
    margin-right: 35px;
    transform: translateY(-50%);

    fill: ${({ theme }) => theme.colors.secondary};
    stroke: ${({ theme }) => theme.colors.secondary};
  }

  @media screen and (min-width: 545px) {
    z-index: 3;
    top: 112px;
    right: 300px;
  }
`

export default Style

RoleLi.displayName = 'RoleLi-Style'
Style.displayName = 'RolesToSelect-Style'
