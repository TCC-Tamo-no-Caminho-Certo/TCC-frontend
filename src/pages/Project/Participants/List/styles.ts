import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Header = styled(motion.button).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    cursor: pointer;
  }

  #ArrowIcon {
    height: 12px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Body = styled(Presence)`
  ul {
    .Participant {
      margin-top: 24px;
    }
  }
`

const Style = styled(motion.li)`
  button {
    color: ${({ theme }) => theme.colors.secondary};
  }
`

export default Style

Header.displayName = 'Header-Style'
Body.displayName = 'Body-Style'
Style.displayName = 'List-Style'
