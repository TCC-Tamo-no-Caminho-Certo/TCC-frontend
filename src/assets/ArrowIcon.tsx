import React from 'react'

/* eslint-disable max-len */
import { motion } from 'framer-motion'

interface ArrowIconProps {
  animate?: Object
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ animate }) => {
  return (
    <motion.svg
      style={{ transform: 'rotate(-90deg)', transition: 'all 0s linear' }}
      animate={animate}
      className='Icon'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 18 12'
    >
      <path d='M2.115 0L9 7.417 15.885 0 18 2.2834 9 12 0 2.2834 2.115 0z' />
    </motion.svg>
  )
}

export default ArrowIcon
