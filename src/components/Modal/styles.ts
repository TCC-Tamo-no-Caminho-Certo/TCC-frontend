import styled from 'styled-components'

interface ModalBackgroundProps {
  height: string
}

interface StyleProps {
  top: string
  bottom: string
  translateY: string
}

export const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: ${({ height }) => height};

  background-color: rgba(0, 0, 0, 0.75);
`

const Style = styled.div<StyleProps>`
  position: fixed;
  left: 50%;
  top: ${({ top, bottom }) => (bottom === 'auto' ? top : 'auto')};
  bottom: ${({ bottom }) => bottom};
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${({ translateY }) => `translate(-50%, ${translateY})`};
`

export default Style

ModalBackground.displayName = 'ModalBackground-Style'
Style.displayName = 'Modal-Style'
