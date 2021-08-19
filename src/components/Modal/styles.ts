import styled from 'styled-components'

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
`

const Style = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1001;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translate(-50%, -50%);
`

export default Style

Style.displayName = 'Modal-Style'
