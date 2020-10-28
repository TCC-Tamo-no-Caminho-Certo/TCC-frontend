import { motion } from 'framer-motion'
import styled from 'styled-components'

interface StyleProps {
  overflow: boolean
}

const Style = styled(motion.section)<StyleProps>`
  overflow: hidden;
`

export default Style
