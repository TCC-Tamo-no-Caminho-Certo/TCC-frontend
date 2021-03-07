import React, { useEffect, useState } from 'react'
import Style, { Container } from './styles'

import Dots from './Dots'

import { motion } from 'framer-motion'

interface SliderProps {
  children: any
  width: number
  gap: number
  gapVertical?: number
}

const Slider = ({
  children: containers,
  gap,
  width,
  gapVertical = gap
}: SliderProps) => {
  const quantity = containers.length
  const move = width + gap
  const isPar = quantity % 2 === 0
  const limit = move * ((quantity - 1) / 2)

  const [makeLeftMove, setMakeLeftMove] = useState(false)
  const [makeRightMove, setMakeRightMove] = useState(false)

  const [xValue, setXValue] = useState(isPar ? move / 2 : 0)

  useEffect(() => setXValue(isPar ? move / 2 : 0), [move, isPar])

  const onLeftClick = () => {
    if (xValue > -limit) setXValue(xValue - move)
    setMakeLeftMove(false)
  }

  const onRightClick = () => {
    if (xValue < limit) setXValue(xValue + move)
    setMakeRightMove(false)
  }

  const onDragged = (_event: any, info: any) => {
    const maxSwipeToAnimate = 20000
    const offset = info.offset.x
    const velocity = info.velocity.x
    const swipe = Math.abs(offset) * velocity

    if (swipe < -maxSwipeToAnimate) {
      setMakeLeftMove(true)
      onLeftClick()
    } else if (swipe > maxSwipeToAnimate) {
      setMakeRightMove(true)
      onRightClick()
    }
  }

  return (
    <Style className='Slider' gap={`${gap}px`} gapVertical={`${gapVertical}px`}>
      <motion.ul
        id='slider'
        drag='x'
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragged}
      >
        {containers.map((container: any) => (
          <Container
            key={container.key}
            width={`${width}px`}
            animate={{ x: xValue }}
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {container}
          </Container>
        ))}
      </motion.ul>

      <Dots
        size={24}
        gap={16}
        radius={50}
        quantity={quantity}
        onRightClick={onRightClick}
        onLeftClick={onLeftClick}
        makeLeftTap={makeLeftMove}
        makeRightTap={makeRightMove}
      />
    </Style>
  )
}

export default Slider
