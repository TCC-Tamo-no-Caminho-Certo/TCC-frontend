import { Role } from 'store/Async/roles'

import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

interface StyleProps {
  role?: Role
}

export const Header = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 16px;

  #ArrowIcon {
    width: 32px;

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Body = styled(Presence)`
  ul {
    padding: 0 16px 16px 16px;

    .Month + .Month {
      margin-top: 16px;
    }
  }
`

const Style = styled(motion.li)<StyleProps>`
  border-radius: 16px;

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
`

export default Style

Header.displayName = 'Header-Style'
Body.displayName = 'Body-Style'
Style.displayName = 'Participant-Style'
