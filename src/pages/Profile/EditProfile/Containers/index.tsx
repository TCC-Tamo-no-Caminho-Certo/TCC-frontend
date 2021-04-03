import React, { memo, useContext, useEffect, useState } from 'react'

import Field from './Field'
import { ImageRefModalContext } from '../'
import formatUpdateUser, { ContainerForm, InputData } from './formatUpdateUser'

import selectedRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/roles'
import { UserState } from 'store/user'
import { RootState } from 'store'
import { ThemeState } from 'store/theme'
import { getUniversities, UniversitiesState } from 'store/universities'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'
import DotsLoader from 'components/DotsLoader'

import { useDispatch, useSelector } from 'react-redux'

type ContainersRoles = Role | 'personal'

const Containers = () => {
  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)
  const modalContext = useContext(ImageRefModalContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const user = useSelector<RootState, UserState>(state => state.user)
  const dispatch = useDispatch()
  const { universities } = useSelector<RootState, UniversitiesState>(
    store => store.universities
  )

  const rolesShowed = ['student', 'professor', 'moderator']
  const rolesWithEdit = user.roles.filter(
    role => rolesShowed.filter(wished => wished === role).length !== 0
  )
  const containers: ContainersRoles[] = ['personal', ...rolesWithEdit]

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(440)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  useEffect(() => {
    dispatch(getUniversities())
  }, [dispatch])

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

              {user.dataLoading === false ? (
                formatUpdateUser(
                  universities,
                  user,
                  'personal'
                ).map((info: InputData) => (
                  <Field data={info} key={info.name} />
                ))
              ) : (
                <DotsLoader color={theme.colors.primary} />
              )}
            </Card>
          )

        return (
          <Card
            key={role}
            headerText={`Dados de ${selectedRoleLabel(role as Role)}`}
          >
            {user.dataLoading === false ? (
              formatUpdateUser(
                universities,
                user,
                role as keyof ContainerForm
              ).map((info: InputData) => <Field key={info.name} data={info} />)
            ) : (
              <DotsLoader color={theme.colors.primary} />
            )}
            {}
          </Card>
        )
      })}
    </Slider>
  )
}

export default memo(Containers)
