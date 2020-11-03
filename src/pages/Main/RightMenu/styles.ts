import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

interface RightMenuOpenProps {
  height: string
  width: string
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

export const UserInfo = styled.div.attrs({ className: 'UserInfo' })`
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

    color: #fff500;
  }

  #userName {
    font-size: 1.4rem;

    color: ${fromTheme('secondary')};
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
    background-color: ${fromTheme('white')};
  }

  ul {
    & > * {
      opacity: 0;
    }

    li a {
      display: flex;
      justify-items: center;

      font-size: 1.4rem;

      color: ${fromTheme('white')};

      img {
        margin-right: 16px;
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

    color: ${fromTheme('white')};
    opacity: 0;

    div {
      font-size: 1.5rem;
      line-height: 15px;
    }

    img {
      margin-left: 8px;
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
    color: ${fromTheme('white')};
  }

  .Avatar {
    margin-left: 16px;
  }

  #gear {
    position: absolute;
    right: 16px;
    top: 73px;
    width: 16px;
    height: 16px;
  }
`

export default Style

Background.displayName = 'Background-Style'
UserInfo.displayName = 'UserInfo-Style'
RightMenuOpen.displayName = 'RightMenuOpen-Style'
Style.displayName = 'RightMenu-Style'
