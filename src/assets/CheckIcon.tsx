import React from 'react'

interface CheckIconProps {
  id?: string
}

const CheckIcon: React.FC<CheckIconProps> = ({ id }) => {
  return (
    <svg
      className='Icon'
      id={id}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 1071 759'
    >
      <path d='M0 342.033l105.985-104.177 305.869 305.869L965.015 0 1071 104.177 416.572 758.605 0 342.033z' />
    </svg>
  )
}

export default CheckIcon
