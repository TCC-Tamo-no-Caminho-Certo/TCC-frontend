import React, { useContext, useRef, useState } from 'react'
import Style from './styles'

import Field, { InputData } from '../Field'
import EditContent from '../EditContent'

import { getRoleLabel } from 'utils/roles'
import profileAndRolesSchema from 'utils/validations/editProfile'

import { RootState } from 'store'
import { AsyncRolesDataState, getRolesData } from 'store/Async/rolesData'
import { AsyncUserActions, AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState } from 'store/Async/emails'

import Slider from 'components/Slider'
import Avatar from 'components/User/Avatar'
// eslint-disable-next-line prettier/prettier
import ImageChanger, { ImageChangerForwardeds } from 'components/User/ImageChanger'

import { RoleType } from 'types/Responses/user/roles'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

interface ProfileAndRolesProps {
  sliderWidth: number
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

  const [globalEdit, setGlobalEdit] = useState<any>()

  const rolesToShow: RoleType[] = ['student', 'professor']

  const dispatch = useDispatch()

  const rolesWithEdit = user?.roles
    ? user?.roles?.filter(role => rolesToShow.find(wished => wished === role))
    : []

  const rolesToEdit: (RoleType | 'personal')[] = ['personal', ...rolesWithEdit]

  const rolesInputData = (role: RoleType | 'personal'): InputData[] => {
    const student: InputData[] = [
      {
        name: 'linkedin',
        label: 'Linkedin',
        id: 'student-linkedin',
        value: roles?.student?.linkedin
      },
      {
        name: 'lattes',
        id: 'student-lattes',
        label: 'Currículo Lattes',
        value: roles?.student?.lattes
      }
    ]

    const professor: InputData[] = [
      {
        name: 'linkedin',
        label: 'Linkedin',
        id: 'professor-linkedin',
        value: roles?.professor?.linkedin
      },
      {
        name: 'lattes',
        id: 'professor-lattes',
        label: 'Currículo Lattes',
        value: roles?.professor?.lattes
      },
      {
        name: 'orcid',
        label: 'Orcid',
        value: roles?.professor?.orcid
      },
      {
        type: 'checkbox',
        name: 'postgraduate',
        label: 'Pós-graduação',
        value: roles?.professor?.postgraduate
      }
    ]

    const personal: InputData[] = [
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
        editable: true,
        name: 'birthday',
        label: 'Nascimento:',
        value: user?.birthday,
        type: 'date'
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
        label: 'E-mail:',
        editable: false,
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

  const onPersonalEditSuccess = (response: any) => {
    dispatch(
      AsyncUserActions.update({
        user: { ...user, ...response.user }
      })
    )

    setGlobalEdit(undefined)
  }

  const onRolesEditSuccess = () => {
    user?.id && dispatch(getRolesData({ userId: user?.id }))
    setGlobalEdit(false)
  }

  return (
    <>
      <Style>
        <Slider
          gap={200}
          gapVertical={32}
          width={sliderWidth}
          startAtByCenter={1}
        >
          {rolesToEdit.map(role => {
            if (role === 'personal')
              return (
                <EditContent
                  key={role}
                  path='api/user'
                  loading={userLoading}
                  headerText='Dados pessoais'
                  onSuccess={onPersonalEditSuccess}
                  schema={profileAndRolesSchema[role]}
                  onSaveClick={() => {
                    setGlobalEdit(false)
                  }}
                >
                  <Avatar
                    border
                    shadow
                    size={128}
                    withLoader={false}
                    loaderColor={theme.colors.primary}
                    onClick={() => imageRef.current?.toggle()}
                  />

                  {rolesInputData(role).map((info: InputData) => (
                    <Field
                      data={info}
                      key={info.name}
                      editing={globalEdit?.[role]}
                    />
                  ))}
                </EditContent>
              )

            return (
              <EditContent
                key={role}
                role={role as RoleType}
                loading={rolesDataLoading}
                onSuccess={onRolesEditSuccess}
                path={`api/users/roles/${role}`}
                headerText={`Dados de ${getRoleLabel(role as RoleType)}`}
                onSaveClick={() => {
                  setGlobalEdit(undefined)
                }}
              >
                {rolesInputData(role).map(data => (
                  <Field
                    data={data}
                    key={data.name}
                    editing={globalEdit?.[role]}
                  />
                ))}
              </EditContent>
            )
          })}
        </Slider>
      </Style>

      <ImageChanger ref={imageRef} />
    </>
  )
}

export default ProfileRoles
