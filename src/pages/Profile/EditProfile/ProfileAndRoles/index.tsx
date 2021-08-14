import React, { useContext, useRef } from 'react'
import Style from './styles'

import Field from '../Field'

import { getRoleLabel } from 'utils/roles'

import { RootState } from 'store'
import { AsyncRolesDataState } from 'store/Async/rolesData'
import { AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState } from 'store/Async/emails'

import Card from 'components/Card'
import Slider from 'components/Slider'
import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'
// eslint-disable-next-line prettier/prettier
import ImageChanger, { ImageChangerForwardeds } from 'components/User/ImageChanger'

import { RoleType } from 'types/Responses/user/roles'

import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

interface ProfileAndRolesProps {
  sliderWidth: number
}

export interface InputData {
  value?: any
  name: string
  label: string
  date?: boolean
  editable?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  student: InputData[]
  personal: InputData[]
  professor: InputData[]
}

const ProfileRoles = ({ sliderWidth }: ProfileAndRolesProps) => {
  const theme = useContext(ThemeContext)
  const { user, loading: userLoading } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )
  const { emails } = useSelector<RootState, AsyncEmailsState>(
    ({ asyncEmails }) => asyncEmails
  )
  const { roles, loading: rolesDataLoading } = useSelector<
    RootState,
    AsyncRolesDataState
  >(({ asyncRolesData }) => asyncRolesData)

  const imageRef = useRef<ImageChangerForwardeds>(null)

  const rolesToShow: RoleType[] = ['student', 'professor']

  const rolesWithEdit = user?.roles
    ? user?.roles?.filter(role => rolesToShow.find(wished => wished === role))
    : []

  const rolesToEdit: (RoleType | 'personal')[] = ['personal', ...rolesWithEdit]

  const rolesInputData = (role: RoleType | 'personal'): InputData[] => {
    const student = [
      {
        name: 'linkedin',
        label: 'Linkedin',
        value: roles?.student?.linkedin
      },
      {
        name: 'lattes',
        label: 'Currículo Lattes',
        value: roles?.student?.lattes
      }
    ]

    const professor = [
      {
        name: 'linkedin',
        label: 'Linkedin',
        value: roles?.professor?.linkedin
      },
      {
        name: 'lattes',
        label: 'Currículo Lattes',
        value: roles?.professor?.lattes
      },
      {
        name: 'orcid',
        label: 'Orcid',
        value: roles?.professor?.orcid
      },
      {
        name: 'postgraduate',
        label: 'Pós-graduação',
        value: roles?.professor?.postgraduate
      }
    ]

    const personal = [
      {
        name: 'name',
        label: 'Nome:',
        editable: true,
        value: user?.name
      },
      {
        editable: true,
        name: 'surname',
        label: 'Sobrenome:',
        value: user?.surname
      },
      {
        date: true,
        editable: true,
        name: 'birthday',
        label: 'Nascimento:',
        value: user?.birthday
      },
      {
        value: '',
        editable: true,
        dontShow: true,
        name: 'new_password',
        label: 'Nova senha:'
      },
      // {
      //   value: '',
      //   dontShow: true,
      //   editable: true,
      //   name: 'new_password',
      //   label: 'Confirmar nova senha:',
      // },
      {
        name: 'email',
        editable: false,
        label: 'E-mail:',
        value: emails ? emails[0]?.address : undefined
      }
      // {
      //   date: true,
      //   name: 'phone',
      //   editable: true,
      //   label: 'Celular:',
      //   value: user?.phone ? '' : user?.phone,
      // }
    ]

    const formInputs: ContainerForm = { student, professor, personal }

    return formInputs[role as keyof ContainerForm]
  }

  return (
    <>
      <Style>
        <Slider gap={200} gapVertical={32} width={sliderWidth}>
          {rolesToEdit.map(role => {
            if (role === 'personal')
              return (
                <Card headerText='Dados Pessoais' key={role}>
                  {userLoading ? (
                    <DotsLoader color={theme.colors.primary} />
                  ) : (
                    <>
                      <Avatar
                        border
                        shadow
                        size={128}
                        withLoader={false}
                        loaderColor={theme.colors.primary}
                        onClick={() => imageRef.current?.toggle()}
                      />

                      {rolesInputData(role).map((info: InputData) => (
                        <Field data={info} key={info.name} />
                      ))}
                    </>
                  )}
                </Card>
              )

            return (
              <Card
                key={role}
                role={role as RoleType}
                headerText={`Dados de ${getRoleLabel(role as RoleType)}`}
              >
                {rolesDataLoading ? (
                  <DotsLoader color={theme.colors.primary} />
                ) : (
                  rolesInputData(role).map(data => (
                    <Field key={data.name} data={data} />
                  ))
                )}
              </Card>
            )
          })}
        </Slider>
      </Style>

      <ImageChanger ref={imageRef} />
    </>
  )
}

export default ProfileRoles
