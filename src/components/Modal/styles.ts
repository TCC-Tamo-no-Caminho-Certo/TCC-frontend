import styled, { css } from 'styled-components'

interface StyleProps {
  top: string
  bottom: string
}

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
`

const Style = styled.div<StyleProps>`
  position: fixed;
  left: 50%;
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ top, bottom }) =>
    bottom !== '0%'
      ? css`
          bottom: ${bottom};
          transform: translate(-50%, -50%);
        `
      : css`
          top: ${top};
          transform: translate(-50%, 50%);
        `}
`

export default Style

Style.displayName = 'Modal-Style'
