import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  max-width: 100%;
  height: 120px;
`

export const ProfileClosed = styled.button`
  position: absolute;
  right: 20px;
  margin-top: 10px;
  top: 50%;
  transform: translateY(50%);
  border-radius: 50%;
  border: none;
  background-color: transparent;

  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
`

export const ProfileOpen = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: grid;
  grid:
    '. info info' 70%
    '. edit logout' 30% / 36% 32% 32%;

  width: 350px;
  height: 120px;
  border-radius: 15px 0 15px 15px;
  background-color: ${fromTheme('primary')};
  opacity: 0;

  img {
    width: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
`

export const UserInfo = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  cursor: default;

  span {
    color: ${fromTheme('secondary')};
    text-align: left;
    line-height: 15px;
    width: 120px;
  }

  #close {
    border: none;
    background-color: transparent;

    img {
      position: absolute;
      top: 15px;
      right: 20px;
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
    color: #00ff66;
    font-size: 1.2rem;
  }
`

export const Logout = styled.div`
  grid-area: logout;
  position: absolute;
  right: 20px;
  bottom: 15px;
  display: flex;
  align-items: center;
  color: ${fromTheme('secondary')};
  cursor: pointer;

  span {
    font-size: 1.3rem;
    margin-right: 5px;
  }
`

export const Edit = styled(Logout)`
  grid-area: edit;
  position: absolute;
  left: 0;

  span {
    margin-left: 5px;
    margin-right: 0px;
  }
`

export default Style
