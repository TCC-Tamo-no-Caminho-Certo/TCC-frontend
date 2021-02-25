import React, { memo, useContext, useEffect, useState } from 'react'

import Field from './Field'
import { ModalContext } from '../'

import formatUpdateUser, { InputData } from 'utils/formatUpdateUser'
import selectedRoleLabel from 'utils/makeRoleLabel'

import { Role, UserState } from 'store/user'
import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'

import { useSelector } from 'react-redux'

const Fields = () => {
  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const user = useSelector<RootState, UserState>(state => state.user)
  const modal = useContext(ModalContext)
  const containers = ['personal', ...user.roles]

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(400)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  return (
    <Slider width={sliderWidth} gap={200} gapVertical={100}>
      {containers.map(role => {
        if (role === 'personal')
          return (
            <Card key={role} headerText='Dados Pessoais'>
              <Avatar
                border
                size={128}
                onClick={() => modal?.ref.current?.toggleModal(true)}
                loaderColor={theme.colors.primary}
                shadow
              />

              {formatUpdateUser(user, 'guest').map((info: InputData) => (
                <Field key={info.inputname} data={info} />
              ))}
            </Card>
          )

        return (
          <Card
            key={role}
            headerText={`Dados de ${selectedRoleLabel(role as Role)}`}
          >
            {formatUpdateUser(user, role as Role).map((info: InputData) => (
              <Field key={info.inputname} data={info} />
            ))}
          </Card>
        )
      })}
    </Slider>
  )
}

export default memo(Fields)
