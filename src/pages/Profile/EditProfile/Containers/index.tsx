import React, { memo, useContext, useEffect, useMemo, useState } from 'react'

import Field from './Field'
import { ImageRefModalContext } from '../'
import formatUpdateUser, { ContainerForm, InputData } from './formatUpdateUser'

import selectedRoleLabel from 'utils/makeRoleLabel'

import { Role, UserState } from 'store/user'
import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'

import { useSelector } from 'react-redux'

type ContainersRoles = Role | 'personal'

const Containers = () => {
  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const modalContext = useContext(ImageRefModalContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const user = useSelector<RootState, UserState>(state => state.user)

  const { role } = user

  const containers: ContainersRoles[] = useMemo(() => ['personal', ...role], [
    role
  ])

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(400)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  return (
    <Slider gap={200} gapVertical={32} width={sliderWidth}>
      {containers.map(role => {
        if (role === 'personal')
          return (
            <Card headerText='Dados Pessoais' key={role}>
              <Avatar
                border
                shadow
                size={128}
                loaderColor={theme.colors.primary}
                onClick={() =>
                  modalContext?.imageRef.current?.toggleModal(true)
                }
              />

              {formatUpdateUser(user, 'personal').map((info: InputData) => (
                <Field data={info} key={info.inputname} />
              ))}
            </Card>
          )

        return (
          <Card
            key={role}
            headerText={`Dados de ${selectedRoleLabel(role as Role)}`}
          >
            {formatUpdateUser(user, role as keyof ContainerForm).map(
              (info: InputData) => (
                <Field key={info.inputname} data={info} />
              )
            )}
          </Card>
        )
      })}
    </Slider>
  )
}

export default memo(Containers)
