import React, { useContext, useRef } from 'react'
import Style from './styles'

import { InputData } from '../EditContent/Field'
import EditContent from '../EditContent'

import { getRoleLabel } from 'utils/roles' // eslint-disable-next-line prettier/prettier
import profileAndRolesSchema, {
  EditProfileSchema
} from 'utils/validations/editProfile'

import { RootState } from 'store'
import { UserActions, UserState } from 'store/Async/user'
import { EmailsState, getEmails } from 'store/Async/emails'
import { getRolesData, RolesDataState } from 'store/Async/rolesData'

import Slider from 'components/Slider'
import Avatar from 'components/User/Avatar'
import Popup, { PopupForwardeds } from 'components/Popup' // eslint-disable-next-line prettier/prettier
import RegisterEmail, {
  RegisterEmailForwardeds
} from 'components/RegisterEmail' // eslint-disable-next-line prettier/prettier
import ImageChanger, {
  ImageChangerForwardeds
} from 'components/User/ImageChanger'

import { RoleType } from 'types/Responses/user/roles'
import { RolesDataType } from 'types/Responses/user/rolesData'

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
  const { user, loading: userLoading } = useSelector<RootState, UserState>(
    ({ user }) => user
  )
  const { emails } = useSelector<RootState, EmailsState>(({ emails }) => emails)
  const { roles } = useSelector<RootState, RolesDataState>(
    ({ rolesData }) => rolesData
  )

  const registerEmailRef = useRef<RegisterEmailForwardeds>(null)
  const imageRef = useRef<ImageChangerForwardeds>(null)
  const popupRef = useRef<PopupForwardeds>(null)

  const dispatch = useDispatch()

  const rolesToShow: RoleType[] = ['student', 'professor']

  const rolesWithEdit = user?.roles
    ? user?.roles?.filter(role => rolesToShow.find(wished => wished === role))
    : []

  const rolesToEdit: (RoleType | 'personal')[] = ['personal', ...rolesWithEdit]

  const rolesInputData = (role: RoleType | 'personal'): InputData[] => {
    const student: InputData[] = [
      {
        name: 'linkedin',
        label: 'Linkedin:',
        id: 'student-linkedin',
        value: roles?.student?.linkedin
      },
      {
        name: 'lattes',
        id: 'student-lattes',
        label: 'Currículo Lattes:',
        value: roles?.student?.lattes
      }
    ]

    const professor: InputData[] = [
      {
        name: 'linkedin',
        label: 'Linkedin:',
        id: 'professor-linkedin',
        value: roles?.professor?.linkedin
      },
      {
        name: 'lattes',
        id: 'professor-lattes',
        label: 'Currículo Lattes:',
        value: roles?.professor?.lattes
      },
      {
        name: 'orcid',
        label: 'Orcid:',
        value: roles?.professor?.orcid
      },
      {
        type: 'checkbox',
        name: 'postgraduate',
        label: 'Pós-graduação:',
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
      {
        value: '',
        dontShow: true,
        editable: true,
        name: 'confirm_new_password',
        label: 'Confirmar nova senha:'
      },
      {
        name: 'email',
        label: 'E-mail:',
        value: emails.find(({ main }) => main === 1)?.address,
        editable: false,
        withEditIcon: true,
        onEditClick: () => {
          registerEmailRef.current?.toggleRegister(true)
        }
      }
    ]

    const formInputs: ContainerForm = { student, professor, personal }

    return formInputs[role as keyof ContainerForm]
  }

  const onPersonalEditSuccess = (response: any) => {
    dispatch(UserActions.update({ ...response.user }))
  }

  const onRolesEditSuccess = (role: RoleType) => {
    user?.id && dispatch(getRolesData({ userId: user.id, role, updated: true }))
  }

  return (
    <>
      <Style>
        <Slider gap={200} gapVertical={32} width={sliderWidth}>
          {rolesToEdit.map(role => {
            if (role === 'personal')
              return (
                <>
                  <EditContent
                    key={role}
                    path='api/user'
                    loading={userLoading}
                    headerText='Dados pessoais'
                    fields={rolesInputData(role)}
                    onSuccess={onPersonalEditSuccess}
                    schema={profileAndRolesSchema[role]}
                    manipulateData={data => {
                      delete data.email

                      if (data.new_password && !data.confirm_confirmPassword) {
                        delete data.new_password

                        popupRef.current?.configPopup({
                          open: true,
                          type: 'error',
                          message:
                            'Senha não alterada. Confirme sua nova senha!'
                        })
                      }

                      delete data.confirm_new_password
                      return data
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
                  </EditContent>
                </>
              )

            return (
              <EditContent
                key={role}
                role={role as RoleType}
                fields={rolesInputData(role)}
                path={`api/users/roles/${role}`}
                loading={!roles[role as keyof RolesDataType]}
                headerText={`Dados de ${getRoleLabel(role as RoleType)}`}
                schema={profileAndRolesSchema[role as keyof EditProfileSchema]}
                onSuccess={() => {
                  onRolesEditSuccess(role)
                }}
              />
            )
          })}
        </Slider>
      </Style>

      <ImageChanger ref={imageRef} />

      <RegisterEmail
        placeholder='E-mail'
        ref={registerEmailRef}
        addData={{ main: true }}
        title='Digite seu novo e-mail'
        onSuccess={() => {
          user?.id && dispatch(getEmails({ userId: user.id, updated: true }))
        }}
      />

      <Popup ref={popupRef} />
    </>
  )
}

export default ProfileRoles
