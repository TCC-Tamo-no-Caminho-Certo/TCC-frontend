import React, { ReactElement } from 'react'

import {
  AnimatePresence,
  AnimatePresenceProps,
  HTMLMotionProps,
  motion
} from 'framer-motion'

interface PresenceProps extends HTMLMotionProps<'div'> {
  condition: boolean
  children: ReactElement | ReactElement[]
  presenceProps?: AnimatePresenceProps
}

const Presence = ({
  children,
  condition,
  presenceProps,
  ...props
}: PresenceProps) => (
  <AnimatePresence {...presenceProps}>
    {condition && (
      <motion.div className='Presence' {...props}>
        {children}
      </motion.div>
    )}
  </AnimatePresence>
)

export default Presence
