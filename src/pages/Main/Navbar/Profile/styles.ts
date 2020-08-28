import styled from 'styled-components'

export const AnimationShape = styled.div`
  svg {
    border-radius: 10px 0 0 10px;
    width: 100%;
    height: 100%;
  }
`

export const Style = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  &,
  ${AnimationShape} {
    width: 320px;
    height: 100%;
    min-height: 100px;
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
    right: 30px;

    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`

export default Style
