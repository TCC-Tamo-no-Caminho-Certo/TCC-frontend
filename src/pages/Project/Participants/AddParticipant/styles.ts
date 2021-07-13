import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

export const Header = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;
  text-align: center;
  font-size: clamp(1rem, 0.6rem + 2.6vw, 1.8rem);

  color: ${({ theme }) => theme.colors.secondary};

  .Icon {
    width: 22px;
    height: 22px;
    margin-right: 16px;

    stroke: ${({ theme }) => theme.colors.secondary};
  }
`

export const Body = styled(Presence)`
  width: 100%;
  padding: 0 24px 24px 24px;

  .Select {
    margin-bottom: 24px;
  }

  .Submit {
    width: 100%;
    margin-top: 24px;
  }
`

const Style = styled(motion.div)`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 320px;
  margin-top: 24px;
  border-radius: 24px;

  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
`

export default Style

Header.displayName = 'Header-Style'
Body.displayName = 'Body-Style'
Style.displayName = 'AddParcipant-Style'
