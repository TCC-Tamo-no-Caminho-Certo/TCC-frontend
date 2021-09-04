import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

export const Header = styled(motion.button).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  text-align: center;
  padding-bottom: 16px;
  font-size: clamp(1rem, 0.6rem + 2.6vw, 1.8rem);

  color: ${({ theme }) => theme.colors.secondary};

  > div {
    .Icon {
      width: 22px;
      height: 22px;

      stroke: ${({ theme }) => theme.colors.secondary};
    }
  }

  #label {
    margin-left: 16px;
  }
`

export const Body = styled(Presence)`
  width: 100%;
  overflow: hidden;

  .Submit {
    width: 100%;
    margin-top: 24px;
  }

  .Select,
  .AvatarAndInfo {
    margin-bottom: 24px;
  }
`

const Style = styled(motion.article)`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  margin-top: 24px;
  border-radius: 24px;

  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.4);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
`

export default Style

Header.displayName = 'Header-Style'
Body.displayName = 'Body-Style'
Style.displayName = 'AddParcipant-Style'
