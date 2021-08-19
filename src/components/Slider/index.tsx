import React, { useEffect, useState } from 'react'
import Style, { Container } from './styles'

import Dots from './Dots'

import { motion } from 'framer-motion'

interface SliderProps {
  gap: number
  width: number
  children: any
  gapVertical?: number
  startAtByCenter?: number
}

const Slider = ({
  gap,
  width,
  startAtByCenter,
  gapVertical = gap,
  children: containers
}: SliderProps) => {
  const move = width + gap
  const quantity = containers?.length
  const isPar = quantity % 2 === 0
  const limit = move * ((quantity - 1) / 2)

  const [makeLeftMove, setMakeLeftMove] = useState(false)
  const [makeRightMove, setMakeRightMove] = useState(false)

  const [xValue, setXValue] = useState(
    startAtByCenter ? move * startAtByCenter : isPar ? move / 2 : 0
  )

  useEffect(() => {
    setXValue(startAtByCenter ? move * startAtByCenter : isPar ? move / 2 : 0)
  }, [move, isPar, startAtByCenter])

  const onLeftClick = () => {
    if (xValue > -limit) setXValue(xValue - move)
    setMakeLeftMove(false)
  }

  const onRightClick = () => {
    if (xValue < limit) setXValue(xValue + move)
    setMakeRightMove(false)
  }

  const onDragged = (_event: any, info: any) => {
    const offset = info.offset.x
    const maxSwipeToAnimate = 20000
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
        drag='x'
        id='slider'
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={onDragged}
        dragConstraints={{ left: 0, right: 0 }}
      >
        {containers?.map((container: any, index: number) => (
          <Container
            key={index}
            width={`${width}px`}
            initial={{ x: startAtByCenter ? move * startAtByCenter : xValue }}
            animate={{ x: xValue }}
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {container}
          </Container>
        ))}
      </motion.ul>

      <Dots
        gap={16}
        size={24}
        radius={50}
        quantity={quantity}
        onLeftClick={onLeftClick}
        makeLeftTap={makeLeftMove}
        onRightClick={onRightClick}
        makeRightTap={makeRightMove}
      />
    </Style>
  )
}

export default Slider
