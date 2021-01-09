import { Role } from 'store/user'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface RightMenuOpenProps {
  height: string
  width: string
  changeRole: boolean
}

interface UserInfoProps {
  selectedRole: Role
}

interface StyleProps {
  width: string
}

interface RoleLiProps {
  role: Role
}

export const Background = styled.svg`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;

  overflow: visible;

  path {
    fill: ${darken(0.1, '#6e4850')};
  }
`

export const UserInfo = styled.div.attrs({ className: 'UserInfo' })<UserInfoProps>`
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

    color: #fcfcfc;
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

    color: #fcfcfc;
  }

  &:hover {
    background-color: ${({ theme, role }) => theme.roles[role]};
  }

  &:first-child {
    button {
      border-radius: 16px 0 0 0;
    }

    &:hover {
      background-color: ${({ theme, role }) => theme.roles[role]};
      border-radius: 16px 0 0 0;
    }
  }

  &:last-child {
    button {
      border-radius: 0 0 16px 16px;
    }

    &:hover {
      background-color: ${({ theme, role }) => theme.roles[role]};
      border-radius: 0 0 16px 16px;
    }
  }

  &:only-child {
    button {
      border-radius: 16px 0 16px 16px;
    }

    &:hover {
      background-color: ${({ theme, role }) => theme.roles[role]};
      border-radius: 16px 0 16px 16px;
    }
  }
`

export const RightMenuOpen = styled(motion.div)<RightMenuOpenProps>`
  position: absolute;
  top: 112px;
  right: 0;
  z-index: 2;

  padding: 16px 0;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  hr {
    position: absolute;
    top: 0;
    left: 16px;

    width: calc(100% - 32px);
    height: 2px;

    border: none;
    background-color: #fcfcfc;
  }

  #selectRoles {
    position: absolute;
    right: ${({ width }) => width};

    width: 230px;

    background-color: #d65881;
    border-radius: 16px 0 16px 16px;
  }

  ul#openProfile {
    & > * {
      opacity: 0;
    }

    li {
      a:hover,
      button:hover {
        background-color: #d65881;
      }

      button {
        ${({ changeRole }) =>
          changeRole &&
          css`
            background-color: #d65881;
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

      color: #fcfcfc;
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

    color: #fcfcfc;

    span {
      user-select: none;
      cursor: pointer;
    }

    .Icon {
      min-width: 20px;
      min-height: 20px;
      width: 20px;
      height: 20px;
      margin: 0px;
      margin-left: 8px;

      fill: #fcfcfc;
    }
  }
`

const Style = styled.div<StyleProps>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;

  width: ${({ width }) => width};
  height: 104px;

  * {
    z-index: 2;
  }

  a,
  svg,
  span {
    color: #fcfcfc;
  }

  .Avatar,
  .DotsLoader {
    margin-left: 16px;
  }

  .Icon {
    margin-right: 16px;
    width: 24px;

    fill: #fcfcfc;
  }

  #Gear {
    width: 10px;

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

    color: #fcfcfc;
    background-color: #d65881;
  }
`

export default Style

Background.displayName = 'Background-Style'
UserInfo.displayName = 'UserInfo-Style'
RightMenuOpen.displayName = 'RightMenuOpen-Style'
Style.displayName = 'RightMenu-Style'
