import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.tertiary};

  #month {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 100%;
    padding: 16px;
    cursor: pointer;

    background-color: ${({ theme }) => darken(0.17, theme.colors.tertiary)};
    margin-bottom: 12px;
  }

  p {
    padding: 0 24px 24px 24px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 50%;
    }
  }
`

export default Style

Style.displayName = 'Month-Style'
