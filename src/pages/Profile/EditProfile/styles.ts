import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface StyleProps {
  navbarOpen: boolean
}

const Style = styled.div<StyleProps>`
  position: absolute;
  left: ${navbarOpen => (navbarOpen ? '210px' : '72px')};
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh;

  background-color: green;
  color: ${fromTheme('white')};

  transition: all 300ms;
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
