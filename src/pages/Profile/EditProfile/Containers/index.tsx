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
import { AsyncRolesDataState, getRolesData } from 'store/Async/rolesData'

import useWindowDimensions from 'hooks/useWindowDimensions'

import ImageChanger, { ImageChangerForwardeds } from 'components/ImageChanger'
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

  const { roles } = useSelector<RootState, AsyncRolesDataState>(
    ({ asyncRolesData }) => asyncRolesData
  )

  const theme = useContext(ThemeContext)

  const imageRef = useRef<ImageChangerForwardeds>(null)

  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const dispatch = useDispatch()

  const rolesToShow = ['student', 'professor', 'moderator', 'administrator']

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
    if (user?.id) dispatch(getEmails({ userId: user.id }))
    if (user?.id) dispatch(getRolesData({ userId: user.id }))
  }, [dispatch, user?.id])

  return (
    <>
      <Slider gap={200} gapVertical={32} width={sliderWidth}>
        {containers.map(role => {
          if (role === 'personal')
            return (
              <Card headerText='Dados Pessoais' key={role}>
                {loading ? (
                  <DotsLoader color={theme.colors.primary} />
                ) : (
                  <>
                    <Avatar
                      border
                      shadow
                      size={128}
                      withLoader={false}
                      loaderColor={theme.colors.primary}
                      onClick={() => imageRef.current?.toggleImageChanger()}
                    />

                    {formatUpdateUser({
                      user,
                      emails,
                      role: 'personal',
                      roles,
                      universities
                    }).map((info: InputData) => (
                      <Field data={info} key={info.name} />
                    ))}
                  </>
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
                  roles,
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
