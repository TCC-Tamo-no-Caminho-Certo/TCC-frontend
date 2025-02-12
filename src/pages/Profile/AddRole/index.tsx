import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import RoleInfo from './RoleInfo'
import Container from './Forms/Container'

import { getRoleLabel } from 'utils/roles'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getUniversities, UniversitiesState } from 'store/Async/universities'
import { getEmails } from 'store/Async/emails'

import { UniversitiesType } from 'types/Responses/university/universities'
import { RolesType, RoleType } from 'types/Responses/user/roles'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

interface AddRoleState {
  roles?: RolesType
  universities: UniversitiesType
}

const allRoles: RolesType = [
  'administrator',
  'guest',
  'student',
  'professor',
  'customer',
  'evaluator',
  'moderator',
  'developer'
]

export const AddRoleContext = createContext<AddRoleState>({
  roles: [],
  universities: []
})

const AddRole = () => {
  const { universities } = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const theme = useContext(ThemeContext)

  const containerRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)

  const [roleSelected, setRoleSelected] = useState<RoleType>()

  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const labelRoles = user?.roles?.map(role => getRoleLabel(role))

  useEffect(() => {
    roleSelected === undefined &&
      allRoles.map(role => pathname.includes(role) && setRoleSelected(role))
  }, [roleSelected, pathname])

  useEffect(() => {
    dispatch(getUniversities({}))
    if (user?.id) dispatch(getEmails({ userId: user.id }))
  }, [dispatch, user])

  return (
    <Style ref={rolesRef}>
      <h2>Escolher Papel</h2>

      <p>
        Escolha um papel para poder ter mais acesso ao Steams Labs! Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Fusce gravida convallis
        magna, vel dignissim leo porttitor quis. Donec dolor dolor, sagittis a
        lacus sed, interdum egestas ipsum. In at odio efficitur, iaculis libero
        sed, consectetur nibh. Proin euismod auctor tempus. Vivamus eleifend
        tellus purus, id imperdiet sapien pharetra quis. Praesent mattis dolor a
        dictum scelerisque. Maecenas et tortor elementum.
      </p>

      <div id='roles'>
        <RoleInfo
          role='student'
          title='Estudante'
          userRoles={labelRoles}
          color={theme.colors.roles.student}
          onClick={() => {
            containerRef.current?.scrollIntoView({ behavior: 'smooth' })
            setRoleSelected('student')
          }}
          benefits={[
            'Participar de propostas',
            'Candidatar-se a um projeto',
            'Aceitar convites para propostas e projetos',
            'Candidatar-se a um projeto'
          ]}
        />

        <RoleInfo
          role='professor'
          title='Professor'
          userRoles={labelRoles}
          color={theme.colors.roles.professor}
          onClick={() => {
            containerRef.current?.scrollIntoView({ behavior: 'smooth' })
            setRoleSelected('professor')
          }}
          benefits={[
            'Pode fazer tudo que um estudante pode fazer',
            'Pedir revisão de propostas',
            'Remover estudantes de propostas, somente professor coordenador pode remover outros professores',
            'Solicitar papel de Revisor'
          ]}
        />

        {(user?.roles?.includes('professor') ||
          user?.roles?.includes('moderator')) && (
          <RoleInfo
            role='moderator'
            id='cy-moderator'
            title='Moderador'
            userRoles={labelRoles}
            color={theme.colors.roles.moderator}
            onClick={() => {
              containerRef.current?.scrollIntoView({ behavior: 'smooth' })
              setRoleSelected('moderator')
            }}
            benefits={[
              'Aceitar solicitação de mudança para Revisor ',
              'Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores (devem estar na mesma instituição)',
              'Ver usuários da instituição',
              'Alterar status da proposta'
            ]}
          />
        )}
      </div>

      <AddRoleContext.Provider value={{ roles: user?.roles, universities }}>
        {roleSelected && (
          <Container
            ref={containerRef}
            rolesRef={rolesRef}
            role={roleSelected}
          />
        )}
      </AddRoleContext.Provider>
    </Style>
  )
}

export default AddRole
