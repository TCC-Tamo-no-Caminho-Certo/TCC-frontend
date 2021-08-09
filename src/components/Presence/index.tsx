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
      initial = 'initial',
      animate = 'enter',
      exit = 'exit',
      ...props
    },
    ref
  ) => (
    <AnimatePresence {...presenceProps}>
      {condition && (
        <motion.div
          className='Presence'
          ref={ref}
          exit={exit}
          animate={animate}
          initial={initial}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
)

export default Presence
