import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.div)`
  .Participant {
    margin-top: 24px;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.secondary};

    span {
      cursor: pointer;
    }

    #ArrowIcon {
      height: 12px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

export default Style

Style.displayName = 'List-Style'
