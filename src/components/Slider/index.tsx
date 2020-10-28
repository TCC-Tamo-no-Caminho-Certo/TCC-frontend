import React, { useState } from 'react'
import Style, { Container } from './styles'

import Dots from 'components/Dots'

import { motion } from 'framer-motion'

interface SliderProps {
  children: React.ReactElement[]
  containersNames: string[]
  width: number
  gap: number
  gapVertical?: number
}

const Slider: React.FC<SliderProps> = ({
  children: containers,
  containersNames,
  gap,
  width,
  gapVertical = gap,
}) => {
  const [makeLeftMove, setMakeLeftMove] = useState(false)
  const [makeRightMove, setMakeRightMove] = useState(false)
  const [xValue, setXValue] = useState(0)

  const move = width + gap
  const quantity = containers.length

  const limit = quantity % 2 === 0 ? move * ((quantity - 2) / 2) : move * ((quantity - 1) / 2)

  const onLeftClick = () => {
    xValue > -limit && setXValue(xValue - move)
    setMakeLeftMove(false)
  }

  const onRightClick = () => {
    xValue < limit && setXValue(xValue + move)
    setMakeRightMove(false)
  }

  const onDragged = (event: any, info: any) => {
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
    <Style gap={`${gap}px`} gapVertical={`${gapVertical}px`}>
      <motion.ul
        drag='x'
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragged}
      >
        {containers.map((container, index) => (
          <Container
            key={containersNames[index]}
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
