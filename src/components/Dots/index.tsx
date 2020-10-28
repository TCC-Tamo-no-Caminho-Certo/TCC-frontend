import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Style, { Dot } from './styles'

import { useAnimation } from 'framer-motion'

interface DotsProps {
  size: number
  gap: number
  radius: number
  quantity: number

  onRightClick(): void
  onLeftClick(): void

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
  makeRightTap = false,
}) => {
  const [position, setPosition] = useState(0)

  const move = gap + size

  const limit = quantity % 2 === 0 ? (quantity - 2) / 2 : (quantity - 1) / 2

  const newLeftAnimation = useAnimation()
  const leftAnimation = useAnimation()
  const centerAnimation = useAnimation()
  const rightAnimation = useAnimation()
  const newRightAnimation = useAnimation()

  const transition = useMemo(() => ({ type: 'tween', duration: 0.3 }), [])
  const resetTransition = useMemo(() => ({ duration: 0 }), [])

  const leftMove = useCallback(() => {
    leftAnimation.start({
      x: -move,
      opacity: [1, 0],
      scale: [1, 0.6],
      transition,
    })

    centerAnimation.start({ x: -move, scale: [1.4, 1], transition })

    rightAnimation.start({ x: -move, scale: [1, 1.4], transition })

    return newRightAnimation.start({
      x: -move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition,
    })
  }, [
    leftAnimation,
    centerAnimation,
    rightAnimation,
    newRightAnimation,
    move,
    transition,
  ])

  const resetLeftMove = useCallback(() => {
    leftAnimation.start({
      x: 0,
      opacity: 1,
      scale: 1,
      transition: resetTransition,
    })

    centerAnimation.start({ x: 0, scale: 1.4, transition: resetTransition })

    rightAnimation.start({ x: 0, scale: 1, transition: resetTransition })

    return newRightAnimation.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition,
    })
  }, [
    leftAnimation,
    centerAnimation,
    rightAnimation,
    newRightAnimation,
    resetTransition,
  ])

  const rightMove = useCallback(() => {
    rightAnimation.start({
      x: move,
      scale: [1, 0.6],
      opacity: [1, 0],
      transition,
    })

    centerAnimation.start({ x: move, scale: [1.4, 1], transition })

    leftAnimation.start({
      x: move,
      scale: [1, 1.4],
      transition,
    })

    return newLeftAnimation.start({
      x: move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition,
    })
  }, [
    newLeftAnimation,
    leftAnimation,
    centerAnimation,
    rightAnimation,
    move,
    transition,
  ])

  const resetRightMove = useCallback(() => {
    rightAnimation.start({
      x: 0,
      scale: 1,
      opacity: 1,
      transition: resetTransition,
    })

    centerAnimation.start({
      x: 0,
      scale: 1.4,
      transition: resetTransition,
    })

    leftAnimation.start({
      x: 0,
      scale: 1,
      transition: resetTransition,
    })

    return newLeftAnimation.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition,
    })
  }, [
    newLeftAnimation,
    leftAnimation,
    centerAnimation,
    rightAnimation,
    resetTransition,
  ])

  const sequenceToLeft = useCallback(async () => {
    if (position > -limit) {
      onLeftClick()
      await leftMove()
      await resetLeftMove()
      setPosition(position - 1)
    }
  }, [onLeftClick, leftMove, resetLeftMove, position, limit])

  const sequenceToRight = useCallback(async () => {
    if (position < limit) {
      onRightClick()
      await rightMove()
      await resetRightMove()
      setPosition(position + 1)
    }
  }, [onRightClick, rightMove, resetRightMove, limit, position])

  useEffect(() => {
    if (makeLeftTap) sequenceToLeft()
    if (makeRightTap) sequenceToRight()
  }, [makeLeftTap, makeRightTap, sequenceToLeft, sequenceToRight])

  return (
    <Style size={`${size}px`} gap={`${gap}px`} radius={`${radius}%`}>
      <Dot id='newLeft' animate={newLeftAnimation}>
        {'  '}
      </Dot>

      <Dot id='left' animate={leftAnimation} onTap={sequenceToRight}>
        {'  '}
      </Dot>

      <Dot id='center' animate={centerAnimation}>
        {'  '}
      </Dot>

      <Dot id='right' animate={rightAnimation} onTap={sequenceToLeft}>
        {'  '}
      </Dot>

      <Dot id='newRight' animate={newRightAnimation}>
        {'  '}
      </Dot>
    </Style>
  )
}

export default Dots
