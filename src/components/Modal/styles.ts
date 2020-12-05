import styled from 'styled-components'

export const ModalBackground = styled.div.attrs({
  type: 'button',
  className: 'ModalBackground',
})`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
`

const Style = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default Style

Style.displayName = 'Modal-Style'
