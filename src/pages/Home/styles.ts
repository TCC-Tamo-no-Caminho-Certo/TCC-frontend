import { motion } from 'framer-motion'
import styled from 'styled-components'

interface ShadowProps {
  page: string
}

export const Shadow = styled(motion.div)<ShadowProps>`
  position: absolute;

  width: 76vw;
  height: 100vh;
  border-radius: 24px;

  background-color: transparent;
  box-shadow: -8px 8px 6px 4px rgba(0, 0, 0, 0.14);

  @media screen and (min-width: 1000px) {
  }
`
