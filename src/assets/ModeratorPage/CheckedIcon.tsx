/* eslint-disable max-len */
import React from 'react'

interface CheckedIcon {
  className?: string
}

const CheckedIcon: React.FC<CheckedIcon> = ({ className = 'Icon' }) => {
  return (
    <svg className={className} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        id='rect'
        d='M0.5 4C0.5 2.067 2.067 0.5 4 0.5H16C17.933 0.5 19.5 2.067 19.5 4V16C19.5 17.933 17.933 19.5 16 19.5H4C2.067 19.5 0.5 17.933 0.5 16V4Z'
      />
      <path
        id='v'
        d='M7.707 12.293L4.414 9L3 10.414L7.707 15.121L17.414 5.414L16 4L7.707 12.293Z'
      />
    </svg>
  )
}

export default CheckedIcon
