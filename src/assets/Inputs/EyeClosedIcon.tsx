import React from 'react'

interface EyeClosedIconProps {
  onClick?(): void
}

const EyeClosedIcon = ({ onClick }: EyeClosedIconProps) => (
  <svg
    className='Icon'
    id='EyeClosedIcon'
    onClick={onClick}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 512 417'
    style={{ cursor: 'pointer' }}
  >
    <path
      fillRule='evenodd'
      d='M509.768 201.707c2.976 3.668 2.976 8.922 0 12.59-1.188 1.464-29.606 36.296-74.918 71.593-51.621 40.211-113.953 72.109-178.851 72.109-64.903 0-127.235-31.902-178.8517-72.109-45.3124-35.297-73.7303-70.129-74.9178-71.593-2.9727-3.672-2.9727-8.922 0-12.59 1.1875-1.465 29.6054-36.297 74.9178-71.594C128.753 89.914 191.088 58 255.999 58c64.902 0 127.234 31.9062 178.851 72.113 45.316 35.297 73.73 70.129 74.918 71.594zM145.641 208c0-60.652 49.347-110 110-110 60.652 0 110 49.348 110 110 0 60.656-49.348 110-110 110-60.653 0-110-49.344-110-110zm110 90c-49.625 0-90-40.375-90-90s40.375-90 90-90 90 40.375 90 90-40.375 90-90 90z'
      clipRule='evenodd'
    />
    <rect
      width='557.305'
      height='31.3679'
      x='48'
      y='394.074'
      rx='15.684'
      transform='rotate(-45 48 394.074)'
    />
  </svg>
)

export default EyeClosedIcon
