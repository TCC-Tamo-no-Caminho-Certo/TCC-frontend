import React from 'react'

interface AddButtonProps {
  props?: any
}

const AddButton = ({ props }: AddButtonProps) => (
  <svg
    width='76'
    height='76'
    fill='none'
    className='Icon'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <rect
      x='1.5'
      y='1.5'
      width='73'
      height='73'
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
  </svg>
)
export default AddButton
