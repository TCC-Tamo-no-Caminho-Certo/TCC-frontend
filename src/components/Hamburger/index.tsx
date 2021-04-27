import React, { forwardRef } from 'react'
import Style, { MotionRect } from './styles'

interface HamburgerProps {
  toggle?(): void
  state: boolean
  color: string
  size?: number
}

const Hamburger = forwardRef<any, HamburgerProps>(
  ({ toggle, state, color, size = 24 }, ref) => {
    function onHamburgerClick() {
      toggle?.()
    }

    const motionFirst = {
      open: { rotate: 45, y: 7 },
      closed: { rotate: 0, y: 0 }
    }

    const motionSecond = {
      open: { x: 12, y: 0, width: 0 },
      closed: { x: 0, y: 0, width: 24 }
    }

    const motionThird = {
      open: { rotate: -45, y: -7 },
      closed: { rotate: 0, y: 0 }
    }

    const transition = { type: 'tween', duration: 0.2 }

    return (
      <Style
        ref={ref}
        color={color}
        width={`${size}px`}
        height={`${size - 7}px`}
        onClick={onHamburgerClick}
      >
        <svg width='24' height='17' xmlns='http://www.w3.org/2000/svg'>
          <MotionRect
            y='0'
            fill={color}
            initial={false}
            variants={motionFirst}
            transition={transition}
            animate={state ? 'open' : 'closed'}
          />

          <MotionRect
            y='7'
            fill={color}
            initial={false}
            variants={motionSecond}
            transition={transition}
            animate={state ? 'open' : 'closed'}
          />

          <MotionRect
            y='14'
            fill={color}
            initial={false}
            variants={motionThird}
            transition={transition}
            animate={state ? 'open' : 'closed'}
          />
        </svg>
      </Style>
    )
  }
)

export default Hamburger
