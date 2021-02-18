import React, { memo, useCallback, useMemo, useState } from 'react'
import Style, { Dot } from './styles'

import { useAnimation } from 'framer-motion'

interface DotsProps {
  onLeftClick(): void
  onRightClick(): void
  size: number
  gap: number
  radius: number
  quantity: number
  makeLeftTap?: boolean
  makeRightTap?: boolean
}

const Dots: React.FC<DotsProps> = ({
  size,
  gap,
  radius,
  quantity,
  onRightClick,
  onLeftClick,
  makeLeftTap = false,
  makeRightTap = false
}) => {
  const [position, setPosition] = useState(0)
  const move = gap + size
  const limit = quantity % 2 === 0 ? (quantity - 2) / 2 : (quantity - 1) / 2

  const newLeft = useAnimation()
  const left = useAnimation()
  const center = useAnimation()
  const right = useAnimation()
  const newRight = useAnimation()

  const transition = useMemo(() => ({ type: 'tween', duration: 0.3 }), [])
  const resetTransition = useMemo(() => ({ duration: 0 }), [])

  const leftMove = useCallback(() => {
    left.start({
      x: -move,
      opacity: [1, 0],
      scale: [1, 0.6],
      transition
    })

    center.start({ x: -move, scale: [1.4, 1], transition })

    right.start({ x: -move, scale: [1, 1.4], transition })

    return newRight.start({
      x: -move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition
    })
  }, [left, center, right, newRight, move, transition])

  const resetLeftMove = useCallback(() => {
    left.start({
      x: 0,
      opacity: 1,
      scale: 1,
      transition: resetTransition
    })

    center.start({ x: 0, scale: 1.4, transition: resetTransition })

    right.start({ x: 0, scale: 1, transition: resetTransition })

    return newRight.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition
    })
  }, [left, center, right, newRight, resetTransition])

  const rightMove = useCallback(() => {
    right.start({
      x: move,
      scale: [1, 0.6],
      opacity: [1, 0],
      transition
    })

    center.start({ x: move, scale: [1.4, 1], transition })

    left.start({
      x: move,
      scale: [1, 1.4],
      transition
    })

    return newLeft.start({
      x: move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition
    })
  }, [newLeft, left, center, right, move, transition])

  const resetRightMove = useCallback(() => {
    right.start({
      x: 0,
      scale: 1,
      opacity: 1,
      transition: resetTransition
    })

    center.start({
      x: 0,
      scale: 1.4,
      transition: resetTransition
    })

    left.start({
      x: 0,
      scale: 1,
      transition: resetTransition
    })

    return newLeft.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition
    })
  }, [newLeft, left, center, right, resetTransition])

  const sequenceToLeft = useCallback(
    async (slide = true) => {
      if (position > -limit) {
        slide && onLeftClick()
        await leftMove()
        await resetLeftMove()
        setPosition(position - 1)
      }
    },
    [onLeftClick, leftMove, resetLeftMove, position, limit]
  )

  const sequenceToRight = useCallback(
    async (slide = true) => {
      if (position < limit) {
        slide && onRightClick()
        await rightMove()
        await resetRightMove()
        setPosition(position + 1)
      }
    },
    [onRightClick, rightMove, resetRightMove, limit, position]
  )

  makeLeftTap && sequenceToLeft(false)
  makeRightTap && sequenceToRight(false)

  return (
    <Style size={`${size}px`} gap={`${gap}px`} radius={`${radius}%`}>
      <Dot id='newLeft' animate={newLeft}>
        {'  '}
      </Dot>

      <Dot id='left' animate={left} onTap={sequenceToRight}>
        {'  '}
      </Dot>

      <Dot id='center' animate={center}>
        {'  '}
      </Dot>

      <Dot id='right' animate={right} onTap={sequenceToLeft}>
        {'  '}
      </Dot>

      <Dot id='newRight' animate={newRight}>
        {'  '}
      </Dot>
    </Style>
  )
}

export default memo(Dots)
