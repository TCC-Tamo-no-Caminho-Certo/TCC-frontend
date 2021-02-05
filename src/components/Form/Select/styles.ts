import styled, { css } from 'styled-components'

interface StyleProps {
  isErrored: boolean
}

const Style = styled.div<StyleProps>`
  position: relative;

  margin: 0;

  ${({ isErrored }) =>
    isErrored &&
    css`
      .ErrorTooltipTriggerArea {
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
