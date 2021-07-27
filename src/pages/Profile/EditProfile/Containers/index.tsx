import React, { memo, useContext, useEffect, useRef, useState } from 'react'

import Field from './Field'
import formatUpdateUser, { ContainerForm, InputData } from './formatUpdateUser'

import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import { getUserRolesData, UserState } from 'store/Async/user'
import { RootState } from 'store'
import { getUniversities, UniversitiesState } from 'store/Async/universities'

import useWindowDimensions from 'hooks/useWindowDimensions'

import ImageChanger, { ImageChangerMethods } from 'components/ImageChanger'
import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'
import Slider from 'components/Slider'
import Card from 'components/Card'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { EmailsResType, EmailsType } from 'types/Responses/user/emails'
import { Role } from 'types/Responses/user/roles'

type ContainersRoles = Role | 'personal'

const Containers = () => {
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const theme = useContext(ThemeContext)

  const [userEmails, setUserEmails] = useState<EmailsType>()

  const imageRef = useRef<ImageChangerMethods>(null)

  const { innerWidth } = useWindowDimensions()
  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const dispatch = useDispatch()

  const rolesToShow = ['student', 'professor', 'moderator']

  const rolesWithEdit = user.roles.filter(role =>
    rolesToShow.find(wished => wished === role)
  )

  const containers: ContainersRoles[] = ['personal', ...rolesWithEdit]

  useEffect(() => {
    ;(async () => {
      const { emails }: EmailsResType = await api.get('user/emails')
      setUserEmails(emails)
    })()
  }, [user.id, user.roles])

  useEffect(() => {
    dispatch(getUserRolesData({}))
  }, [dispatch, user.id])

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
                  onClick={() => imageRef.current?.toggleImageChanger()}
                />

                {user.loading === false ? (
                  formatUpdateUser({
                    user,
                    role: 'personal',
                    roles: user.rolesData,
                    emails: userEmails,
                    universities: storeUniversities.universities
                  }).map((info: InputData) => (
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
              role={role}
              headerText={`Dados de ${getRoleLabel(role as Role)}`}
            >
              {!user.loading ? (
                formatUpdateUser({
                  user,
                  roles: user.rolesData,
                  emails: userEmails,
                  role: role as keyof ContainerForm,
                  universities: storeUniversities.universities
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
