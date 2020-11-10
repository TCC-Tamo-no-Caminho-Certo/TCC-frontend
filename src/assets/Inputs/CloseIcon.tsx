/* eslint-disable max-len */
import React from 'react'

interface CloseIconProps {
  onClick?(): void
}

const CloseIcon: React.FC<CloseIconProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className='Icon'
      id='Close'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 343 344'
    >
      <path d='M15 15.5L328.5 329' strokeWidth='60' strokeLinejoin='round' />
      <path d='M328.5 15L15 328.5' strokeWidth='60' strokeLinejoin='round' />
    </svg>
  )
}

export default CloseIcon
