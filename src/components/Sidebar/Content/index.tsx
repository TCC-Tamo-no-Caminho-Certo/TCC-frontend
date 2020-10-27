import React from 'react'

import { RootState, useSelector } from 'store'

import { motion } from 'framer-motion'

const Content: React.FC = ({ children }) => {
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)

  const content = {
    initial: {},
    animateOpen: {
      y: 0,
      x: '210px',
      width: 'calc(100vw - 210px)',
    },
    animateClosed: {
      y: 0,
      x: '72px',
      width: 'calc(100vw - 72px)',
    },
    exit: {},
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  }

  return (
    <motion.section
      variants={content}
      transition={content.transition}
      initial='initial'
      animate={open ? 'animateOpen' : 'animateClosed'}
      exit='exit'
    >
      {children}
    </motion.section>
  )
}

export default Content
