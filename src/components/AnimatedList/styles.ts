import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Header = styled(motion.button)`
  position: relative;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 54px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  &:hover {
    filter: brightness(1.1);
  }

  #title {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    margin-left: 8px;
  }

  .Icon {
    width: 18px;
    height: 18px;
    min-width: 18px;
    min-height: 18px;
    transform: rotate(0deg);

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Content = styled(Presence)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  border-radius: 0px 0px 16px 16px;

  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  > * {
    width: 100%;
  }
`

const Style = styled(motion.li)`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;
  border-radius: 18px;

  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.49);
`

export default Style

Content.displayName = 'Content-Style'
Style.displayName = 'AnimatedList-Style'
