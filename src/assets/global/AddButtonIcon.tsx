import React from 'react'

import { motion } from 'framer-motion'

interface AddButtonProps {
  props?: any
}

const AddButton = ({ ...props }: AddButtonProps) => (
  <motion.svg
    fill='none'
    className='Icon'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect
      x='1.5'
      y='1.5'
      width='24'
      height='24'
      rx='36.5'
      strokeWidth='3'
      stroke='#fcfcfc'
    />

    <path
      d='M38 38H21m17 17V38v17zm0-17V21v17zm0 0h17-17z'
      strokeWidth='3'
      strokeLinecap='round'
      stroke='#fcfcfc'
    />
  </motion.svg>
)
export default AddButton
