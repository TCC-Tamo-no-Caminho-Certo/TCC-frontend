import { Role } from 'store/user'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  closedHeight: string
}

interface BackgroundProps {
  closedHeight: string
  openHeight: string
  isOpen: boolean
}

interface RightMenuOpenProps {
  height: string
  width: string
  changeRole: boolean
}

interface UserInfoProps {
  selectedRole: Role
}

interface RoleLiProps {
  role: Role
}

export const UserInfo = styled.div.attrs({
  className: 'UserInfo'
})<UserInfoProps>`
  display: flex;
  flex-direction: column;

  margin-left: 16px;

  cursor: default;

  span {
    line-height: 16px;
    text-align: left;
  }

  #userRole {
    font-size: 1.3rem;

    color: ${({ theme, selectedRole }) => theme.roles[selectedRole]};
  }

  #userName {
    font-size: 1.4rem;

    color: ${({ theme }) => theme.colors.secondary};
  }

  #userActivity {
    line-height: 16px;
    font-size: 1.2rem;

    color: #00ff66;

    svg {
      margin: 0 4px 2px 0;
    }
  }
`

export const RoleLi = styled.li<RoleLiProps>`
  button {
    width: 100%;
    height: 56px;
    user-select: none;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme, role }) => theme.roles[role]};
    }
  }

  &:first-child {
    button {
      border-radius: 16px 0 0 0;

      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
      }
    }
  }

  &:last-child {
    button {
      border-radius: 0 0 16px 16px;

      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
      }
    }
  }

  &:only-child {
    button {
      border-radius: 16px 0 0 16px;

      &:hover {
        background-color: ${({ theme, role }) => theme.roles[role]};
      }
    }
  }
`

export const RightMenuOpen = styled(motion.div)<RightMenuOpenProps>`
  position: absolute;
  top: 112px;
  z-index: 2;

  padding: 16px 0;
  min-width: 320px;
  width: 100vw;
  height: ${({ height }) => height};

  hr {
    position: absolute;
    top: 0;
    left: 16px;

    width: calc(100% - 32px);
    height: 2px;

    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  #selectRoles {
    position: absolute;
    right: ${({ width }) => width};

    width: 230px;
  }

  ul#openProfile {
    & > * {
      opacity: 0;
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
      font-size: 1.4rem;

      color: ${({ theme }) => theme.colors.secondary};
      user-select: none;

      .Icon {
        height: 24px;
      }
    }
  }

  button#logout {
    position: absolute;
    bottom: 16px;
    right: 16px;

    display: flex;
    align-items: center;

    height: 24px;
    opacity: 0;

    color: ${({ theme }) => theme.colors.secondary};

    span {
      user-select: none;
      cursor: pointer;
    }

    .Icon {
      min-width: 20px;
      width: 20px;
      min-height: 20px;
      height: 20px;
      margin: 0px;
      margin-left: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  @media screen and (min-width: 425px) {
    right: 0;

    min-width: 300px;
    width: 300px;
  }
`

export const Background = styled.svg<BackgroundProps>`
  position: fixed;
  top: 0;

  min-width: 320px;
  width: 100vw;

  height: ${({ isOpen, openHeight, closedHeight }) =>
    isOpen ? openHeight : closedHeight};

  path {
    fill: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
  }

  @media screen and (min-width: 425px) {
    right: 0;

    min-width: 300px;
    width: 300px;
    border-radius: 8px 0 0 8px;
  }
`

const Style = styled.div<StyleProps>`
  position: fixed;
  top: 0;

  z-index: 2;

  display: flex;
  align-items: center;

  min-width: 320px;
  width: 100vw;
  height: ${({ closedHeight }) => closedHeight};

  * {
    z-index: 2;
  }

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
    margin-right: 16px;
    width: 24px;

    fill: ${({ theme }) => theme.colors.secondary};
  }

  #Gear {
    position: absolute;
    right: 16px;
    top: 73px;

    width: 16px;
    height: 16px;
  }

  #baseButton {
    position: fixed;
    right: 24px;
    bottom: 16px;
    z-index: 4;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 256px;
    padding: 8px;
    border-radius: 8px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
  }

  @media screen and (min-width: 425px) {
    min-width: 300px;
    width: 300px;
    right: 0;
  }
`

export default Style

Background.displayName = 'Background-Style'
UserInfo.displayName = 'UserInfo-Style'
RightMenuOpen.displayName = 'RightMenuOpen-Style'
Style.displayName = 'RightMenu-Style'
