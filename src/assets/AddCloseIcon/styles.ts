import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.div)`
  .Icon {
    width: 22px;
    height: 22px;

    stroke: ${({ theme }) => theme.colors.secondary};
  }
`

export default Style
