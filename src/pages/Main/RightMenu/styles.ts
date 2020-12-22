import { RoleTypes } from 'store/user'

import { motion } from 'framer-motion'
import styled from 'styled-components'

interface RightMenuOpenProps {
  height: string
  width: string
}

interface UserInfoProps {
  selectedRole: RoleTypes
}

interface StyleProps {
  width: string
}

export const Background = styled.svg`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;

  overflow: visible;
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

    color: ${props => props.theme.roles['base user']};
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

export const RightMenuOpen = styled(motion.div)<RightMenuOpenProps>`
  position: absolute;
  top: 112px;
  right: 0;
  z-index: 2;

  padding: 16px;
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

  ul {
    & > * {
      opacity: 0;
    }

    li a {
      display: flex;
      justify-items: center;

      font-size: 1.4rem;

      color: #fcfcfc;
      user-select: none;

      .Icon {
        height: 24px;
      }
    }

    li + li {
      margin-top: 16px;
    }
  }

  button {
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
