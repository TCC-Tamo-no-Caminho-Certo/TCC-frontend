import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.div)`
  border-radius: 8px;

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
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
