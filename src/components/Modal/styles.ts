import styled from 'styled-components'

const Style = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.75);
`

export default Style

Style.displayName = 'Modal-Style'
