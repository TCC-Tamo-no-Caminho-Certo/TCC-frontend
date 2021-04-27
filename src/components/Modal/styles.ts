import styled from 'styled-components'

interface ModalBackgroundProps {
  height: string
  zIndex: number
}

interface StyleProps {
  top: string
  bottom: string
  translateY: string
  zIndex: number
}

export const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex};

  width: 100%;
  height: ${({ height }) => height};

  background-color: rgba(0, 0, 0, 0.75);
`

const Style = styled.div<StyleProps>`
  position: fixed;
  left: 50%;
  bottom: ${({ bottom }) => bottom};
  z-index: ${({ zIndex }) => zIndex + 1};
  top: ${({ top, bottom }) => (bottom === 'auto' ? top : 'auto')};

  display: flex;
  align-items: center;
  justify-content: center;

  transform: ${({ translateY }) => `translate(-50%, ${translateY})`};

  #CloseIcon {
    position: absolute;
    top: 8px;
    right: 8px;

    width: 16px;
    height: 16px;

    stroke: ${({ theme }) => theme.colors.secondary};
  }
`

export default Style

ModalBackground.displayName = 'ModalBackground-Style'
Style.displayName = 'Modal-Style'
