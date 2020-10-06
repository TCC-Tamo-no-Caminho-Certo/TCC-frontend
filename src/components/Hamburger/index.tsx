import React from 'react'
import Style, { MotionRect } from './styles'

import { useCycle } from 'framer-motion'

interface HamburgerProps {
  toggle(): void
}

const Hamburger: React.FC<HamburgerProps> = ({ toggle }) => {
  const [closed, setClosed] = useCycle(true, false)

  function onHamburgerClick() {
    setClosed()
    toggle()
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

  const spring = { type: 'spring', stiffness: 200, damping: 30 }

  return (
    <Style onClick={onHamburgerClick}>
      <svg width='24' height='17' xmlns='http://www.w3.org/2000/svg'>
        <MotionRect
          y='0'
          variants={first}
          animate={closed ? 'closed' : 'open'}
          transition={spring}
          initial={false}
        />

        <MotionRect
          y='7'
          variants={second}
          animate={closed ? 'closed' : 'open'}
          transition={spring}
          initial={false}
        />

        <MotionRect
          y='14'
          variants={third}
          animate={closed ? 'closed' : 'open'}
          transition={spring}
          initial={false}
        />
      </svg>
    </Style>
  )
}

export default Hamburger
