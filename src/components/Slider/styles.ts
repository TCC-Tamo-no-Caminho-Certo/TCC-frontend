import { motion } from 'framer-motion'
import styled from 'styled-components'

interface ContainerProps {
  width: string
}

interface StyleProps {
  gap: string
  gapVertical: string
}

export const Container = styled(motion.li)<ContainerProps>`
  width: ${({ width }) => width};
`

const Style = styled.div.attrs({ className: 'Slider' })<StyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  ul {
    &,
    form {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    margin-bottom: ${({ gapVertical }) => gapVertical};

    ${Container} + ${Container} {
      margin-left: ${({ gap }) => gap};
    }
  }
`

export default Style

Container.displayName = 'Container-Style'
Style.displayName = 'Slider-Style'
