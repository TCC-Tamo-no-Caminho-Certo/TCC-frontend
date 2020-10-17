import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface EditOpenProps {
  height: string
  width: string
}

interface StyleProps {
  width: string
}

export const Background = styled.svg`
  position: absolute;
  top: 0;
  right: 0;

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

export const EditOpen = styled.div<EditOpenProps>`
  position: absolute;
  top: 112px;
  right: 0;

  padding: 16px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  hr {
    position: absolute;
    top: 0;
    left: 16px;
    width: calc(100% - 32px);
    border: solid 1px ${fromTheme('white')};
  }

  ul {
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
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;

  width: ${({ width }) => width};
  height: 104px;

  #avatar {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-left: 16px;
  }

  #gear {
    position: absolute;
    bottom: 16px;
    right: 16px;

    width: 16px;
    height: 16px;
  }

  a,
  svg,
  span {
    color: ${fromTheme('white')};
  }
`

export default Style

UserInfo.displayName = 'UserInfo'
Style.displayName = 'Style'
