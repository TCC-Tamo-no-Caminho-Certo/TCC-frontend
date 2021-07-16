import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

export const Header = styled(motion.button).attrs({ type: 'button' })`
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

  .Icon {
    height: 12px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Body = styled(Presence)`
  padding: 24px;
`

const Style = styled(motion.li)`
  border-radius: 24px;

  background-color: ${({ theme }) => theme.colors.tertiary};
`

export default Style

Header.displayName = 'Header-Style'
Body.displayName = 'Body-Style'
Style.displayName = 'Month-Style'
