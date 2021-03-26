import styled, { css } from 'styled-components'

interface StyleProps {
  isErrored: boolean
}

const Style = styled.div<StyleProps>`
  position: relative;

  margin: 0;
  padding: 0px;

  .Select__single-value {
    display: flex;
    align-items: center;

    height: 100%;
  }

  ${({ isErrored }) =>
    isErrored &&
    css`
      .Trigger {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;

        height: 100%;
      }
    `}
`

export default Style

Style.displayName = 'Select-Style'
