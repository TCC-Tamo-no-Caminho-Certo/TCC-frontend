import { motion } from 'framer-motion'
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
  }

  p {
    padding: 0 24px 24px 24px;
  }
`

export default Style

Style.displayName = 'Month-Style'
