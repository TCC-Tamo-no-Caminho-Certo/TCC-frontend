import React from 'react'

const CloseIcon = ({ id = 'CloseIcon', ...props }: any) => (
  <svg
    className='Icon'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 343 344'
    style={{ cursor: 'pointer' }}
    onClick={props.onClick}
    id={id}
    {...props}
  >
    <path d='M15 15.5L328.5 329' strokeWidth='60' strokeLinejoin='round' />
    <path d='M328.5 15L15 328.5' strokeWidth='60' strokeLinejoin='round' />
  </svg>
)

export default CloseIcon
