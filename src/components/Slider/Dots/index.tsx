import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Style, { Dot } from './styles'

import { useAnimation } from 'framer-motion'

interface DotsProps {
  size: number
  gap: number
  radius: number
  quantity: number
  onLeftClick(): void
  onRightClick(): void
  makeLeftTap?: boolean
  makeRightTap?: boolean
}

const Dots: React.FC<DotsProps> = ({
  size,
  gap,
  radius,
  quantity,
  onLeftClick,
  onRightClick,
  makeLeftTap = false,
  makeRightTap = false
}) => {
  const isPar = quantity % 2 === 0
  const move = gap + size
  const limit = Math.floor(quantity / 2)

  const [position, setPosition] = useState(0)

  const leftAnimation = useAnimation()
  const rightAnimation = useAnimation()
  const centerAnimation = useAnimation()
  const newLeftAnimation = useAnimation()
  const newRightAnimation = useAnimation()

  const transition = useMemo(() => ({ type: 'tween', duration: 0.3 }), [])
  const resetTransition = useMemo(() => ({ duration: 0 }), [])

  const leftMove = useCallback(() => {
    leftAnimation.start({
      x: -move,
      opacity: [1, 0],
      scale: [1, 0.6],
      transition
    })

    centerAnimation.start({ x: -move, scale: [1.4, 1], transition })

    rightAnimation.start({ x: -move, scale: [1, 1.4], transition })

    return newRightAnimation.start({
      x: -move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition
    })
  }, [
    move,
    transition,
    leftAnimation,
    rightAnimation,
    centerAnimation,
    newRightAnimation
  ])

  const resetLeftMove = useCallback(() => {
    leftAnimation.start({
      x: 0,
      opacity: 1,
      scale: 1,
      transition: resetTransition
    })

    centerAnimation.start({ x: 0, scale: 1.4, transition: resetTransition })

    rightAnimation.start({ x: 0, scale: 1, transition: resetTransition })

    return newRightAnimation.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition
    })
  }, [
    leftAnimation,
    rightAnimation,
    resetTransition,
    centerAnimation,
    newRightAnimation
  ])

  const rightMove = useCallback(() => {
    rightAnimation.start({
      x: move,
      scale: [1, 0.6],
      opacity: [1, 0],
      transition
    })

    centerAnimation.start({ x: move, scale: [1.4, 1], transition })

    leftAnimation.start({
      x: move,
      scale: [1, 1.4],
      transition
    })

    return newLeftAnimation.start({
      x: move,
      opacity: [0, 1],
      scale: [0.6, 1],
      transition
    })
  }, [
    move,
    transition,
    leftAnimation,
    rightAnimation,
    centerAnimation,
    newLeftAnimation
  ])

  const resetRightMove = useCallback(() => {
    rightAnimation.start({
      x: 0,
      scale: 1,
      opacity: 1,
      transition: resetTransition
    })

    centerAnimation.start({
      x: 0,
      scale: 1.4,
      transition: resetTransition
    })

    leftAnimation.start({
      x: 0,
      scale: 1,
      transition: resetTransition
    })

    return newLeftAnimation.start({
      x: 0,
      opacity: 0,
      scale: 0.6,
      transition: resetTransition
    })
  }, [
    leftAnimation,
    rightAnimation,
    resetTransition,
    centerAnimation,
    newLeftAnimation
  ])

  const sequenceToLeft = useCallback(async () => {
    if (position > -limit) {
      onLeftClick()
      await leftMove()
      await resetLeftMove()
      setPosition(before =>
        before - 1 === 0 && isPar ? before - 2 : before - 1
      )
    }
  }, [position, limit, onLeftClick, leftMove, resetLeftMove, isPar])

  const sequenceToRight = useCallback(async () => {
    if (position < limit) {
      onRightClick()
      await rightMove()
      await resetRightMove()
      setPosition(before =>
        before + 1 === 0 && isPar ? before + 2 : before + 1
      )
    }
  }, [position, limit, onRightClick, rightMove, resetRightMove, isPar])

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
