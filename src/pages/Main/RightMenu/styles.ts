import GearIcon from 'assets/RightMenuOpen/GearIcon'

import Presence from 'components/Presence'

import { RoleType } from 'types/Responses/user/roles'

import { darken } from 'polished'
import styled from 'styled-components'

interface UserInfoProps {
  selectedRole?: RoleType
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
  z-index: 111;

  width: 22px;
  margin: 24px;

  fill: ${({ theme }) => theme.colors.secondary};
  stroke: ${({ theme }) => theme.colors.secondary};
`

export const AddRole = styled(Presence)`
  a {
    position: fixed;
    right: 24px;
    z-index: 110;
    bottom: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 256px;
    padding: 8px;
    border-radius: 8px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      width: 24px;
      margin-right: 16px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`

export const UserInfo = styled.div<UserInfoProps>`
  display: flex;
  flex-direction: column;

  width: 100%;
  cursor: default;
  margin-left: 16px;

  span {
    text-align: left;
    line-height: 16px;
  }

  #userRole {
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);

    color: ${({ theme, selectedRole }) =>
      selectedRole ? theme.roles[selectedRole] : theme.roles.guest};
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

export const Background = styled.svg<BackgroundProps>`
  position: fixed;
  top: 0;
  z-index: 110;
  margin-right: 16px;

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

const Style = styled.div<StyleProps>`
  position: fixed;
  top: 0;
  z-index: 110;

  display: flex;
  align-items: center;

  width: 100vw;
  padding: 24px;
  min-width: 300px;
  margin-right: 16px;
  height: ${({ closedHeight }) => closedHeight};

  a,
  svg,
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }

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

  #dots {
    display: flex;
    justify-content: center;

    width: 100%;
  }

  @media screen and (min-width: 545px) {
    right: 0;

    width: 300px;
    min-width: 300px;
  }
`

export default Style

UserInfo.displayName = 'UserInfo-Style'

AddRole.displayName = 'AddRole-Style'
Gear.displayName = 'Gear-Style'
Background.displayName = 'Background-Style'
Style.displayName = 'RightMenu-Style'
