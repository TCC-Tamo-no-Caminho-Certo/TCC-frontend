/* eslint-disable max-len */
import React from 'react'

import { motion, Variants } from 'framer-motion'

interface ArrowIconProps {
  transition?: Object
  initial?: Object
  className?: string
  id?: string
  animate?: Object
  variants?: Variants
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  className = 'Icon',
  id = 'ArrowIcon',
  variants,
  initial,
  animate,
  transition = {
    type: 'tween',
    duration: 0.3,
  },
}) => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 18 12'
      overflow='visible'
      id={id}
      className={className}
    >
      <motion.path
        d='M2.115 0L9 7.417 15.885 0 18 2.2834 9 12 0 2.2834 2.115 0z'
        variants={variants}
        transition={transition}
        initial={initial}
        animate={animate}
      />
    </motion.svg>
  )
}

export default ArrowIcon
