import { Overflow } from 'App'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface StyleProps {
  overflow?: Overflow
}

const Style = styled(motion.section)<StyleProps>`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;

  ${({ overflow }) =>
    overflow?.x === 'hidden'
      ? css`
          width: max(100vw + 1px, 320px);
        `
      : css`
          width: max(100vw - 8px, 312px);
        `}

  @media screen and (min-width: 545px) {
    ${({ overflow }) =>
      overflow?.x === 'hidden'
        ? css`
            width: max(100vw + 1px, 320px);
          `
        : css`
            width: max(100vw - 16px, 200px);
          `}
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row-reverse;

    ${({ overflow }) =>
      overflow?.x === 'hidden'
        ? css`
            width: max(100vw + 1px, 320px);
          `
        : css`
            width: max(100vw, 320px);
          `}
  }
`

export default Style

Style.displayName = 'Login-Style'
