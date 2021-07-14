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
  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  #closeIcon {
    margin-right: 16px;

    .Icon {
      width: 22px;
      height: 22px;

      stroke: ${({ theme }) => theme.colors.secondary};
    }
  }
`

export const Body = styled(Presence)`
  width: 100%;
  overflow: hidden;
  padding: 0 24px 24px 24px;

  .Submit {
    width: 100%;
    margin-top: 24px;
  }

  .Select,
  .AvatarAndInfo {
    margin-bottom: 24px;
  }
`

const Style = styled(motion.div)`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

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
