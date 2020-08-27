import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 100px;
`

export const AnimationShape = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  svg {
    border-radius: 10px 0 0 10px;

    width: 100%;
    height: 100%;
  }
`

export const Profile = styled.div`
  position: relative;

  height: 100%;
  display: flex;
  align-items: center;

  &,
  ${AnimationShape} {
    width: 320px;
    height: 100px;
  }

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;

    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`

export default Style
