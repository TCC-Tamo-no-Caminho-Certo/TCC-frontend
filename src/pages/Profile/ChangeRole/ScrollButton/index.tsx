import React from 'react'

interface ScrollButtonProps {
  color?: string
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ color = '#fcfcfc' }) => {
  return (
    <button
      type='button'
      onClick={() => window.scrollTo(0, 0)}
      style={{
        color,
        position: 'absolute',
        height: 24,
        bottom: 48,
        right: 24,
        transform: 'translate(-100%, -100%)',
      }}
    >
      Escolher outro papel
    </button>
  )
}

export default ScrollButton
