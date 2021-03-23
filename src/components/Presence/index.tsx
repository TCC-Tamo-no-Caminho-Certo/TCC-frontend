import React, { ReactElement } from 'react'

import { AnimatePresence, AnimatePresenceProps } from 'framer-motion'

interface PresenceProps extends AnimatePresenceProps {
  condition: boolean
  children: ReactElement | ReactElement[]
}

const Presence = ({ condition, children, ...props }: PresenceProps) => (
  <AnimatePresence {...props}>
    <>{condition && children} </>
  </AnimatePresence>
)

export default Presence
