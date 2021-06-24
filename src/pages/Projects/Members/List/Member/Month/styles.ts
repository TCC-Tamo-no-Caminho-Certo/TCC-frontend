import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.li)`
  cursor: pointer;
  border-radius: 4px;

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => theme.colors.tertiary};

  #month {
    padding: 24px;
  }

  p {
    padding: 0 24px 24px 24px;
  }
`

export default Style

Style.displayName = 'Month-Style'
