import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface StyleProps {
  navbarOpen: boolean
}

const Style = styled.div<StyleProps>`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: calc(100vw - 72px);
  height: 100vh;

  background-color: blue;
  color: ${fromTheme('white')};

  transition: all 200ms;
  transition-property: left, width;

  ${({ navbarOpen }) =>
    navbarOpen
      ? css`
          width: calc(100vw - 210px);
          left: 210px;
        `
      : css`
          width: calc(100vw - 72px);
          left: 72px;
        `};
`

export default Style
