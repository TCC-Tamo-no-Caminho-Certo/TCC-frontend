import React, { memo, useContext, useEffect, useRef, useState } from 'react'

import Field from './Field'
import formatUpdateUser, { ContainerForm, InputData } from './formatUpdateUser'

import selectedRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/AsyncThunks/roles'
import { UserState } from 'store/user'
import { RootState } from 'store'
import {
  getUniversities,
  UniversitiesState
} from 'store/AsyncThunks/universities'

import useWindowDimensions from 'hooks/useWindowDimensions'

import ImageChanger from 'components/Form/ImageChanger'
import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'
import Slider from 'components/Slider'
import Card from 'components/Card'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

type ContainersRoles = Role | 'personal'

const Containers = () => {
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    state => state.universities
  )
  const user = useSelector<RootState, UserState>(state => state.user)
  const imageRef = useRef<any>(null)
  const theme = useContext(ThemeContext)

  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const dispatch = useDispatch()

  const { universities } = storeUniversities
  const rolesToShow = ['student', 'professor', 'moderator']
  const rolesWithEdit = user.roles.filter(role =>
    rolesToShow.find(wished => wished === role)
  )
  const containers: ContainersRoles[] = ['personal', ...rolesWithEdit]

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(440)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  useEffect(() => {
    dispatch(getUniversities(storeUniversities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
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
                  onClick={() => imageRef.current.toggleImageChanger()}
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
              role={role}
            >
              {user.dataLoading === false ? (
                formatUpdateUser(
                  universities,
                  user,
                  role as keyof ContainerForm
                ).map((info: InputData) => (
                  <Field key={info.name} data={info} />
                ))
              ) : (
                <DotsLoader color={theme.colors.primary} />
              )}
            </Card>
          )
        })}
      </Slider>

      <ImageChanger ref={imageRef} />
    </>
  )
}

export default memo(Containers)
