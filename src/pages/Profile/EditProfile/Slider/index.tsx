import React, { useState } from 'react'
import Style, { Animation, Change, ConfirmModal, Content, Label, Value } from './styles'

import Dots from './Dots'

import formatUpdateUser, { Info, Types } from 'utils/formatUpdateUser'

import { RootState, useSelector } from 'store'
import { UserState } from 'store/user'

import avatar from 'assets/avatar.jpg'
import editPencil from 'assets/editPencil.svg'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import { Button, Form, Input } from 'components/Form'

import { useSprings } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const cards = ['personal', 'student', 'professor', 'clear']

interface SliderProps {
  cardsQuant?: number
  cardWidth?: number
  gap?: number
}

const Slider: React.FC<SliderProps> = ({ cardWidth = 550, cardsQuant = 3, gap = 250 }) => {
  const user = useSelector<RootState, UserState>(state => state.user)

  const [viewPosition, setViewPosition] = useState(0)
  const [position, setPosition] = useState(0)
  const [save, setSave] = useState(false)

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
        if (swpx === 1 && viewPosition < limits) setViewPosition(viewPosition + 1)
        if (swpx === -1 && viewPosition > -limits) setViewPosition(viewPosition - 1)
      }

      if (position === maxLimit && swpx === 1) setPosition(maxLimit)

      if (position === -maxLimit && swpx === -1) setPosition(-maxLimit)
    },
    {
      swipeDistance: 0,
      swipeVelocity: 0,
    }
  )

  const inputs = (type: Types) => {
    return formatUpdateUser(user, type).map((info: Info) => (
      <Content key={info.inputname}>
        <Label>
          <label htmlFor={info.inputname}>{info.label}</label>
        </Label>
        <Value>
          <Input
            name={info.inputname}
            defaultValue={info.dontShow ? `*********` : info.value}
            noStyle
          />
        </Value>
        <Change>
          <label htmlFor={info.inputname}>
            <img src={editPencil} alt='edit' />
          </label>
        </Change>
      </Content>
    ))
  }

  return (
    <Style gap={`${gap}px`} cardwidth={`${cardWidth}px`}>
      <Form path=''>
        <div className='sliderWrapper'>
          {springs.map((props, index) => {
            switch (index) {
              case 0:
                return (
                  <Animation key={cards[index]} {...bind()} style={props}>
                    <Card headerText='Dados do professor'>{inputs('professor')}</Card>
                  </Animation>
                )

              case 1:
                return (
                  <Animation key={cards[index]} {...bind()} style={props}>
                    <Card headerText='Dados do usuário'>
                      <Avatar size={128} src={avatar} alt='avatar' draggable={false} />

                      {inputs(user.role === 'baseUser' ? 'baseUser' : 'user')}
                    </Card>
                  </Animation>
                )

              case 2:
                return (
                  <Animation key={cards[index]} {...bind()} style={props}>
                    <Card headerText='Dados do estudante'>{inputs('student')}</Card>
                  </Animation>
                )

              case 3:
                return (
                  <Animation key={cards[index]} {...bind()} style={props}>
                    <Card headerText='Dados do professor'>{inputs('professor')}</Card>
                  </Animation>
                )

              default:
                return (
                  <Animation key={cards[index]} {...bind()} style={props}>
                    <Card headerText='Dados do professor'>
                      <img src={avatar} alt='avatar' draggable={false} />
                      {inputs('professor')}
                    </Card>
                  </Animation>
                )
            }
          })}
        </div>

        {save ? (
          <ConfirmModal>
            <Card headerText='Confirme sua senha'>
              <Button>Confirmar</Button>
            </Card>
          </ConfirmModal>
        ) : (
          <></>
        )}

        <button type='button' onClick={() => setSave(true)}>
          Salvar
        </button>
      </Form>

      <Dots
        onRightClick={() => setPosition(prev => prev - totalMove)}
        onLeftClick={() => setPosition(prev => prev + totalMove)}
        position={viewPosition}
        setPosition={setViewPosition}
        limits={limits}
      />
    </Style>
  )
}

export default Slider
