import React from 'react'
import Style, { MotionRect } from './styles'

interface HamburgerProps {
  toggle?(): void
  state: boolean
}

const Hamburger: React.FC<HamburgerProps> = ({ toggle, state }) => {
  function onHamburgerClick() {
    toggle?.()
  }

  const first = {
    open: { rotate: 45, y: 7 },
    closed: { rotate: 0, y: 0 },
  }

  const second = {
    open: { x: 12, y: 0, width: 0 },
    closed: { x: 0, y: 0, width: 24 },
  }

  const third = {
    open: { rotate: -45, y: -7 },
    closed: { rotate: 0, y: 0 },
  }

  const transition = { type: 'tween', duration: 0.2 }

  return (
    <Style onClick={onHamburgerClick}>
      <svg width='24' height='17' xmlns='http://www.w3.org/2000/svg'>
        <MotionRect
          y='0'
          variants={first}
          animate={state ? 'open' : 'closed'}
          transition={transition}
          initial={false}
        />

        <MotionRect
          y='7'
          variants={second}
          animate={state ? 'open' : 'closed'}
          transition={transition}
          initial={false}
        />

        <MotionRect
          y='14'
          variants={third}
          animate={state ? 'open' : 'closed'}
          transition={transition}
          initial={false}
        />
      </svg>
    </Style>
  )
}

export default Hamburger
