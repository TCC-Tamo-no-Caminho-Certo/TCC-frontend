import React, { forwardRef, ReactNode } from 'react'

import {
  AnimatePresence,
  AnimatePresenceProps,
  HTMLMotionProps,
  motion
} from 'framer-motion'

interface PresenceProps extends HTMLMotionProps<'div'> {
  condition: boolean
  children: ReactNode
  presenceProps?: AnimatePresenceProps
}

const Presence = forwardRef<any, PresenceProps>(
  (
    {
      children,
      condition,
      presenceProps,
      exit = 'exit',
      animate = 'enter',
      initial = 'initial',
      ...props
    },
    ref
  ) => (
    <AnimatePresence {...presenceProps}>
      {condition && (
        <motion.div
          ref={ref}
          exit={exit}
          animate={animate}
          initial={initial}
          className='Presence'
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
)

export default Presence
