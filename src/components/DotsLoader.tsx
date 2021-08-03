import React from 'react'

import { motion, Variants } from 'framer-motion'

interface DotsLoaderProps {
  size?: number
  color?: string
  dotSize?: number
}

const loading: Variants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } }
}

const circle: Variants = {
  start: {
    y: '-50%',
    transition: { duration: 0.5, yoyo: Infinity, ease: 'easeInOut' }
  },
  end: {
    y: '50%',
    transition: { duration: 0.5, yoyo: Infinity, ease: 'easeInOut' }
  }
}

const DotsLoader = ({
  size = 36,
  dotSize = 8,
  color = '#6e4850'
}: DotsLoaderProps) => {
  const loadingContainer = {
    height: size,
    display: 'flex',
    alignItems: 'center',
    className: 'DotsLoader',
    justifyContent: 'space-around',
    width: size
  }

  const loadingCircle = {
    display: 'block',
    borderRadius: '50%',
    width: dotSize,
    height: dotSize,
    backgroundColor: color
  }
  return (
    <motion.div
      animate='end'
      initial='start'
      className='DotsLoader'
      variants={loading}
      style={loadingContainer}
    >
      <motion.span style={loadingCircle} variants={circle} />
      <motion.span style={loadingCircle} variants={circle} />
      <motion.span style={loadingCircle} variants={circle} />
    </motion.div>
  )
}

export default DotsLoader
