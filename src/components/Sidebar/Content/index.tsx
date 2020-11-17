import React from 'react'

import { RootState, useSelector } from 'store'

import { motion } from 'framer-motion'

const Content: React.FC = ({ children }) => {
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)

  const content = {
    animateOpen: {
      x: '210px',
      width: 'calc(100vw - 210px)',
    },
    animateClosed: {
      x: '72px',
      width: 'calc(100vw - 72px)',
    },
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  }

  return (
    <motion.section
      variants={content}
      transition={content.transition}
      animate={open ? 'animateOpen' : 'animateClosed'}
    >
      {children}
    </motion.section>
  )
}

export default Content
