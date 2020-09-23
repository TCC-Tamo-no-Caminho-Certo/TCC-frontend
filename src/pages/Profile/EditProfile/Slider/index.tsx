import React, { useState } from 'react'
import Style, { Animation } from './styles'

import Dots from './Dots'
import Professor from './Cards/Professor'

import { useMasterCardPosition } from 'hooks/useMasterCardPosition'

import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const cards = ['personal', 'student', 'professor', 'clear']

interface SliderProps {
  cardsQuant?: number
  cardWidth?: number
  gap?: number
}

const Slider: React.FC<SliderProps> = ({ cardWidth = 550, cardsQuant = 3, gap = 250 }) => {
  const [position, setPosition] = useState(0)
  const { masterCardPosition, setMasterCardPosition } = useMasterCardPosition()
  const totalMove = cardWidth + gap

  const limits = cardsQuant % 2 === 0 ? cardsQuant / 2 : (cardsQuant - 1) / 2

  const maxLimit =
    cardsQuant % 2 === 0 ? totalMove * ((cardsQuant - 2) / 2) : totalMove * ((cardsQuant - 1) / 2)

  const springs = useSprings(
    cardsQuant,
    cards.map(() => ({
      x: position,
    }))
  )

  const bind = useDrag(
    ({ swipe: [swpx], down }) => {
      setPosition(prev => prev + swpx * totalMove)

      if (!down) {
        if (swpx === 1 && masterCardPosition < limits) setMasterCardPosition(masterCardPosition + 1)

        if (swpx === -1 && masterCardPosition > -limits)
          setMasterCardPosition(masterCardPosition - 1)
      }

      if (position === maxLimit && swpx === 1) setPosition(maxLimit)

      if (position === -maxLimit && swpx === -1) setPosition(-maxLimit)
    },
    {
      swipeDistance: 0,
      swipeVelocity: 0,
    }
  )

  return (
    <Style gap={`${gap}px`} cardWidth={`${cardWidth}px`}>
      <div className='sliderWrapper'>
        {springs.map((props, index) => {
          switch (index) {
            case 0:
              return (
                <Animation key={cards[index]} {...bind()} style={props}>
                  <Professor />
                </Animation>
              )

            case 1:
              return (
                <Animation key={cards[index]} {...bind()} style={props}>
                  <Professor />
                </Animation>
              )

            case 2:
              return (
                <Animation key={cards[index]} {...bind()} style={props}>
                  <Professor />
                </Animation>
              )

            case 3:
              return (
                <Animation key={cards[index]} {...bind()} style={props}>
                  <Professor />
                </Animation>
              )

            default:
              return (
                <Animation key={cards[index]} {...bind()} style={props}>
                  <Professor />
                </Animation>
              )
          }
        })}
      </div>

      <Dots
        onRightClick={() => setPosition(prev => prev - totalMove)}
        onLeftClick={() => setPosition(prev => prev + totalMove)}
        limits={limits}
      />
    </Style>
  )
}

export default Slider
