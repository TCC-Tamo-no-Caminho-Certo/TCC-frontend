import styled, { css } from 'styled-components'

interface StyleProps {
  register: string
}

export const Style = styled.section<StyleProps>`
  grid-area: about;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 1s;

  ${({ register }) =>
    register === 'registering'
      ? css`
          width: 100vw;
        `
      : css`
          width: 100%;
        `}
`
