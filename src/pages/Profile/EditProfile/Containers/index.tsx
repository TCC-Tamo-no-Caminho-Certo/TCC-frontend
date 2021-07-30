import React, { memo, useContext, useEffect, useRef, useState } from 'react'

import Field from './Field'
import formatUpdateUser, { ContainerForm, InputData } from './formatUpdateUser'

import { getRoleLabel } from 'utils/roles'

import { AsyncUserState } from 'store/Async/user'
import { RootState } from 'store'
import {
  AsyncUniversitiesState,
  getUniversities
} from 'store/Async/universities'
import { AsyncEmailsState, getEmails } from 'store/Async/emails'

import useWindowDimensions from 'hooks/useWindowDimensions'

import ImageChanger, { ImageChangerMethods } from 'components/ImageChanger'
import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'
import Slider from 'components/Slider'
import Card from 'components/Card'

import { RoleType } from 'types/Responses/user/roles'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

type ContainersRoles = RoleType | 'personal'

const Containers = () => {
  const { universities } = useSelector<RootState, AsyncUniversitiesState>(
    ({ asyncUniversities }) => asyncUniversities
  )
  const { user, loading } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )
  const { emails } = useSelector<RootState, AsyncEmailsState>(
    ({ asyncEmails }) => asyncEmails
  )
  const theme = useContext(ThemeContext)

  const imageRef = useRef<ImageChangerMethods>(null)

  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const dispatch = useDispatch()

  const rolesToShow = ['student', 'professor', 'moderator']

  const rolesWithEdit = user?.roles
    ? user?.roles?.filter(role => rolesToShow.find(wished => wished === role))
    : []

  const containers: ContainersRoles[] = ['personal', ...rolesWithEdit]

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(440)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  useEffect(() => {
    dispatch(getUniversities())
    dispatch(getEmails())
  }, [dispatch])

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
                  onClick={() => imageRef.current?.toggleImageChanger()}
                />

                {loading ? (
                  <DotsLoader color={theme.colors.primary} />
                ) : (
                  formatUpdateUser({
                    user,
                    emails,
                    role: 'personal',
                    roles: { administrator: { university_id: 0 } },
                    universities
                  }).map((info: InputData) => (
                    <Field data={info} key={info.name} />
                  ))
                )}
              </Card>
            )

          return (
            <Card
              key={role}
              role={role}
              headerText={`Dados de ${getRoleLabel(role as RoleType)}`}
            >
              {!loading ? (
                formatUpdateUser({
                  user,
                  emails,
                  roles: { administrator: { university_id: 0 } },
                  role: role as keyof ContainerForm,
                  universities
                }).map((info: InputData) => (
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
