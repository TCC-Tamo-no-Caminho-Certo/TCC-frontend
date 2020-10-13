import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import { Link } from 'react-router-dom'

export const AnimationShape = styled.div`
  svg {
    border-radius: 0 0 0 16px;
    width: 100%;
    height: 100%;
  }
`

export const Style = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  &,
  > * {
    margin-right: 12px;
  }

  &,
  ${AnimationShape} {
    width: 320px;
    height: 100px;
  }

  #profileButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;

    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0;
    z-index: 1;

    &,
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
`

export const ProfileOpen = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  span,
  svg {
    color: ${fromTheme('secondary')};
  }

  #closeButton {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const UserInfo = styled.div.attrs({ className: 'UserInfo' })`
  position: absolute;
  top: 10px;
  left: 110px;

  display: flex;
  flex-direction: column;

  cursor: default;

  span {
    width: 120px;
    line-height: 15px;

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

    color: #61ff8d;
  }
`

export const Logout = styled.button.attrs({ className: 'Logout' })`
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: flex;
  align-items: center;

  span {
    line-height: 18px;
    font-size: 1.2rem;
    margin-right: 5px;
  }
`

export const Edit = styled(Link).attrs({ className: 'Edit' })`
  position: absolute;
  left: 110px;
  bottom: 10px;

  display: flex;
  align-items: center;

  span {
    line-height: 18px;
    font-size: 1.2rem;
    margin-left: 5px;
  }
`

export default Style

AnimationShape.displayName = 'AnimationShape'
ProfileOpen.displayName = 'ProfileOpen'
UserInfo.displayName = 'UserInfo'
Logout.displayName = 'Logout'
Style.displayName = 'Style'
Edit.displayName = 'Edit'
