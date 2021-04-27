import React from 'react'

import { motion, Variants } from 'framer-motion'

interface ArrowIconProps {
  id?: string
  initial?: Object
  animate?: Object
  variants?: Variants
  className?: string
  transition?: Object
}

const ArrowIcon = ({
  animate,
  id = 'ArrowIcon',
  className = 'Icon'
}: ArrowIconProps) => (
  <svg
    viewBox='0 0 18 12'
    overflow='visible'
    xmlns='http://www.w3.org/2000/svg'
    id={id}
    className={className}
  >
    <motion.path
      d='M2.115 0L9 7.417 15.885 0 18 2.2834 9 12 0 2.2834 2.115 0z'
      animate={animate}
    />
  </svg>
)

export default ArrowIcon
