import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled(motion.li)`
  border-radius: 24px;

  background-color: ${({ theme }) => theme.colors.tertiary};

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    padding: 16px;
    cursor: pointer;

    background-color: ${({ theme }) => darken(0.17, theme.colors.tertiary)};

    div {
      width: 50%;
    }
  }

  p {
    padding: 24px;
  }
`

export default Style

Style.displayName = 'Month-Style'
