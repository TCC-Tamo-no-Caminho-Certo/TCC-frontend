import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled(motion.li)`
  border-radius: 8px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

  .header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;

    &,
    * {
      cursor: pointer;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      margin-right: 16px;
    }

    #DefaultAvatar {
      height: 72px;
      margin-right: 16px;
    }

    #ArrowIcon {
      height: 18px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  .content {
    padding: 0 24px 24px 24px;
    overflow: hidden;
  }
`

export default Style

Style.displayName = 'Member-Style'
