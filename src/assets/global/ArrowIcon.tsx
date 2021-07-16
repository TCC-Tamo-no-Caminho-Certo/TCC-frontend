import React from 'react'

import transition from 'utils/transition'

import { motion, Variants } from 'framer-motion'

interface ArrowIconProps {
  variants?: Variants
  animate?: Object | string
  initial?: Object | string
  id?: string
  className?: string
  clockWise?: boolean
  transition?: Object
}

export const arrowAnimation: Variants = {
  initialTop: { rotate: -180 },
  initialBottom: { rotate: 0 },
  initialRight: { rotate: -90 },
  initialLeft: { rotate: -270 },

  bottom: { rotate: 0, transition },
  top: { rotate: -180, transition },
  right: { rotate: -90, transition },
  left: { rotate: -270, transition }
}

const ArrowIcon = ({
  id = 'ArrowIcon',
  className = 'Icon',
  animate,
  initial,
  variants,
  ...props
}: ArrowIconProps) => (
  <motion.svg
    overflow='visible'
    viewBox='0 0 18 12'
    xmlns='http://www.w3.org/2000/svg'
    id={id}
    className={className}
  >
    <motion.path
      d='M2.115 0L9 7.417 15.885 0 18 2.2834 9 12 0 2.2834 2.115 0z'
      initial={initial}
      animate={animate}
      variants={variants}
      {...props}
    />
  </motion.svg>
)
export default ArrowIcon
