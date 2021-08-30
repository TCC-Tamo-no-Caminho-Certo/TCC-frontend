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
    margin: 0 8px;
  }

  .Icon {
    width: 18px;
    height: 18px;
    margin: 0 8px;
    min-width: 18px;
    min-height: 18px;
    transform: rotate(0deg);

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

const Style = styled(motion.li)`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 18px;

  box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.49);

  .AnimatedList {
    width: 100%;
  }
`

export default Style

Style.displayName = 'List-Style'
