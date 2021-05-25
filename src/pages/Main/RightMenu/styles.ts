import { Role } from 'store/Async/roles'

import GearIcon from 'assets/RightMenuOpen/GearIcon'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface RoleLiProps {
  role: Role
}

interface UserInfoProps {
  selectedRole: Role
}

interface RightMenuOpenProps {
  width: string
  height: string
  changeRole: boolean
}

interface BackgroundProps {
  isOpen: boolean
  openHeight: string
  closedHeight: string
}

interface StyleProps {
  closedHeight: string
}

export const Gear = styled(GearIcon)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3001;

  width: 22px;
  margin: 24px;

  fill: ${({ theme }) => theme.colors.secondary};
  stroke: ${({ theme }) => theme.colors.secondary};
`

export const RoleLi = styled.li<RoleLiProps>`
  button {
    width: 100%;
    height: 56px;
    user-select: none;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme, role }) => theme.roles[role]};
    }
  }

  &:first-child {
    button {
      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
      }
    }
  }

  &:last-child {
    button {
      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
      }
    }
  }

  &:only-child {
    button {
      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
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

export const UserInfo = styled.div<UserInfoProps>`
  display: flex;
  flex-direction: column;

  cursor: default;
  margin-left: 16px;

  span {
    text-align: left;
    line-height: 16px;
  }

  #userRole {
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);

    color: ${({ theme, selectedRole }) => theme.roles[selectedRole]};
  }

  #userName {
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.6rem);

    color: ${({ theme }) => theme.colors.secondary};
  }

  #userActivity {
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

    color: ${({ theme }) => theme.colors.green};

    svg {
      margin: 0 4px 2px 0;
    }
  }
`

export const RightMenuOpen = styled(motion.ul)<RightMenuOpenProps>`
  position: absolute;
  top: 112px;
  left: 0px;
  z-index: 3;

  width: max(100vw, 300px);
  height: ${({ height }) => height};

  & > * {
    opacity: 0;
  }

  hr {
    position: absolute;
    top: 0;
    left: 16px;

    height: 2px;
    width: calc(100% - 32px);

    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  li {
    a:hover,
    button:hover {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    button {
      ${({ changeRole }) =>
        changeRole &&
        css`
          background-color: ${({ theme }) => theme.colors.primary};
        `}
    }
  }

  li a,
  li button {
    padding: 16px;
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    user-select: none;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

    color: ${({ theme }) => theme.colors.secondary};

    .Icon {
      height: 24px;
    }
  }

  #logout {
    position: absolute;
    right: 16px;
    bottom: 16px;

    display: flex;
    align-items: center;

    opacity: 0;
    height: 24px;

    color: ${({ theme }) => theme.colors.secondary};

    span#leave {
      margin-left: 8px;
      user-select: none;
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);

      cursor: pointer;
    }

    .Icon {
      width: 20px;
      margin: 0px;
      height: 20px;
      margin-left: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media screen and (min-width: 545px) {
    right: 0;

    width: 300px;
    min-width: 300px;

    #selectRoles {
      right: ${({ width }) => width};

      width: 230px;
    }
  }
`

export const Background = styled.svg<BackgroundProps>`
  position: fixed;
  top: 0;
  z-index: 3001;

  width: max(100vw, 300px);

  height: ${({ isOpen, openHeight, closedHeight }) =>
    isOpen ? openHeight : closedHeight};

  path {
    fill: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
  }

  @media screen and (min-width: 545px) {
    right: 0;

    width: 300px;
    min-width: 300px;
    border-radius: 8px 0 0 8px;
  }
`

export const SelectRoles = styled.div`
  position: absolute;
  right: 0px;
  top: 112px;
  z-index: 4;

  width: 100%;

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
    right: 300px;
    top: 112px;
    z-index: 3;
  }
`

const Style = styled.div<StyleProps>`
  position: fixed;
  top: 0;
  z-index: 3001;

  display: flex;
  align-items: center;

  width: 100vw;
  min-width: 300px;
  height: ${({ closedHeight }) => closedHeight};

  a,
  svg,
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .Avatar,
  .DotsLoader {
    margin-left: 16px;
  }

  .Icon {
    width: 24px;
    margin-right: 16px;

    fill: ${({ theme }) => theme.colors.secondary};
  }

  #Gear {
    position: absolute;
    top: 78px;
    right: 16px;

    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  #baseButton {
    position: fixed;
    bottom: 16px;
    right: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 256px;
    padding: 8px;
    border-radius: 8px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (min-width: 545px) {
    right: 0;

    width: 300px;
    min-width: 300px;
  }
`

export default Style

RoleLi.displayName = 'RoleLi-Style'
UserInfo.displayName = 'UserInfo-Style'
RightMenuOpen.displayName = 'RightMenuOpen-Style'
Gear.displayName = 'Gear-Style'
Background.displayName = 'Background-Style'
Style.displayName = 'RightMenu-Style'
