import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface AnimationStates {
  editOpen?: boolean
  profileOpen?: boolean
  profileClosed?: boolean
}

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  max-width: 100%;
  height: 110px;
  border-bottom: 1px solid red;

  .ContainerChange + .ContainerChange {
    margin-top: 10px;
  }
`

export const ProfileClosed = styled.div.attrs({
  className: 'ProfileClosed',
})`
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 50%;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`

export const ProfileOpen = styled.div.attrs({
  className: 'ProfileOpen',
})`
  position: absolute;
  right: -320px;
  top: 5px;

  padding-left: 100px;
  width: 320px;
  height: 100px;
  background-color: ${fromTheme('tertiary')};

  border-radius: 15px 0 15px 15px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  cursor: default;

  span {
    text-align: left;
    line-height: 15px;
    width: 120px;
    color: ${fromTheme('secondary')};
  }

  #close {
    position: absolute;
    top: 10px;
    right: 10px;

    border: none;
    background-color: transparent;

    img {
      width: 12px;
    }
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
    color: #61ff8d;
    font-size: 1.2rem;
  }
`

export const Logout = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: flex;
  align-items: center;
  color: ${fromTheme('secondary')};

  span {
    line-height: 18px;
    font-size: 1.2rem;
    margin-right: 5px;
  }
`

export const EditClosed = styled(Logout)`
  position: absolute;
  left: 100px;

  span {
    margin-left: 5px;
    margin-right: 0px;
  }
`

export const EditOpen = styled.div`
  position: absolute;
  top: 85px;
  right: 0;
  opacity: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 460px;
  height: 50vh;
  border-radius: 0 0 0 15px;
  padding-top: 10px;
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('tertiary')};

  hr {
    position: absolute;
    top: 15px;
    width: 90%;
  }
`

export const PhotoChange = styled.div`
  height: 70px;
  padding: 0 85px;
  margin: 20px 0;

  &,
  .Button {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > img {
    margin-right: 10px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .Button {
    width: 150px;
    height: 30px;
    border-radius: 1px;
    font-size: 1.4rem;
    box-shadow: none;
    transform: none;

    img {
      margin-right: 10px;
      width: 15px;
    }
  }
`

export default Style
