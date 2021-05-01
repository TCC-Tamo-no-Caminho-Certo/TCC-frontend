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

import { getRoles, Role, RolesState, RoleType } from 'store/Async/roles'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import {
  getUniversities,
  UniversitiesState,
  University
} from 'store/Async/universities'
import { Course, CoursesState, getCourses } from 'store/Async/courses'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

const allRoles: Role[] = [
  'admin',
  'guest',
  'student',
  'professor',
  'customer',
  'evaluator',
  'moderator'
]

interface AddRoleState {
  courses: Course[]
  roles: RoleType[]
  universities: University[]
}

export const AddRoleContext = createContext<AddRoleState>({
  roles: [],
  courses: [],
  universities: []
})

const AddRole = () => {
  const storeRoles = useSelector<RootState, RolesState>(({ roles }) => roles)
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const storeCourses = useSelector<RootState, CoursesState>(
    ({ courses }) => courses
  )
  const theme = useContext(ThemeContext)

  const containerRef = useRef<HTMLDivElement>(null)
  const rolesRef = useRef<HTMLDivElement>(null)

  const [roleSelected, setRoleSelected] = useState<Role>()

  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const labelRoles = user.roles.map(role => getRoleLabel(role))

  useEffect(() => {
    roleSelected === undefined &&
      allRoles.map(role => pathname.includes(role) && setRoleSelected(role))
  }, [roleSelected, pathname])

  useEffect(() => {
    dispatch(getRoles(storeRoles))
    dispatch(getUniversities(storeUniversities))
    dispatch(getCourses(storeCourses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Style ref={rolesRef}>
        <h2>Escolher Papel</h2>

        <p>
          Escolha um papel para poder ter mais acesso ao Steams Labs! Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida
          convallis magna, vel dignissim leo porttitor quis. Donec dolor dolor,
          sagittis a lacus sed, interdum egestas ipsum. In at odio efficitur,
          iaculis libero sed, consectetur nibh. Proin euismod auctor tempus.
          Vivamus eleifend tellus purus, id imperdiet sapien pharetra quis.
          Praesent mattis dolor a dictum scelerisque. Maecenas et tortor
          elementum.
        </p>

        <div id='roles'>
          {/* <RoleInfo
            noButton
            id='cy-guest'
            role='guest'
            title='Convidado'
            color={theme.roles.guest}
            benefits={[
              'Solicitar alteração de papel para Estudante ou Professor'
            ]}
          /> */}

          <RoleInfo
            id='cy-student'
            title='Estudante'
            role='student'
            userRoles={labelRoles}
            color={theme.roles.student}
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
            id='cy-professor'
            role='professor'
            title='Professor'
            userRoles={labelRoles}
            color={theme.roles.professor}
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

          {(user.roles.includes('professor') ||
            user.roles.includes('moderator')) && (
            <RoleInfo
              role='moderator'
              id='cy-moderator'
              title='Moderador'
              userRoles={labelRoles}
              color={theme.roles.moderator}
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
      </Style>

      <AddRoleContext.Provider
        value={{
          roles: storeRoles.roles,
          courses: storeCourses.courses,
          universities: storeUniversities.universities
        }}
      >
        {roleSelected && (
          <Container
            ref={containerRef}
            role={roleSelected}
            rolesRef={rolesRef}
          />
        )}
      </AddRoleContext.Provider>
    </>
  )
}

export default AddRole
