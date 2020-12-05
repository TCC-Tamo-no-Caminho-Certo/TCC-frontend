import { motion } from 'framer-motion'
import styled from 'styled-components'

interface ShadowProps {
  page: string
}

export const Shadow = styled(motion.div)<ShadowProps>`
  box-shadow: none;

  @media screen and (min-width: 1200px) {
    position: absolute;

    width: 100vw;
    height: 100vh;
    border-radius: 24px;

    background-color: transparent;
    box-shadow: -8px 8px 6px 4px rgba(0, 0, 0, 0.14);

    width: 76vw;
  }
`
