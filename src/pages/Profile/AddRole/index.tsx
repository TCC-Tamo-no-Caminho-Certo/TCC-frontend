import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import RoleInfo from './RoleInfo'
import ModeratorForm from './Forms/ModeratorForm'
import StudentForm from './Forms/StudentForm'
import ProfessorForm from './Forms/ProfessorForm'

import selectRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { Role, UserState } from 'store/user'

import { useSelector } from 'react-redux'
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

export const AddRoleContext = createContext({ rolesHeight: 0 })

const AddRole = () => {
  const { role } = useSelector<RootState, UserState>(state => state.user)
  const [roleSelected, setRoleSelected] = useState<Role | undefined>(undefined)
  const labelRoles = role.map(role => selectRoleLabel(role))
  const theme = useContext(ThemeContext)
  const location = useLocation()
  const rolesRef = useRef<HTMLDivElement>(null)
  const [rolesHeight, setRolesHeight] = useState(0)

  useEffect(() => {
    const { pathname } = location

    if (roleSelected === undefined)
      allRoles.map(role => pathname.includes(role) && setRoleSelected(role))
  }, [location, roleSelected])

  const onLabelClick = () => {
    const height = rolesRef.current?.clientHeight
    setRolesHeight(height || 0)
  }

  return (
    <>
      <Style>
        <section ref={rolesRef}>
          <h2>Escolher Papel</h2>

          <p>
            Escolha um papel para poder ter mais acesso ao Steams Labs! Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida
            convallis magna, vel dignissim leo porttitor quis. Donec dolor
            dolor, sagittis a lacus sed, interdum egestas ipsum. In at odio
            efficitur, iaculis libero sed, consectetur nibh. Proin euismod
            auctor tempus. Vivamus eleifend tellus purus, id imperdiet sapien
            pharetra quis. Praesent mattis dolor a dictum scelerisque. Maecenas
            et tortor elementum.
          </p>

          <div id='roles'>
            <RoleInfo
              noButton
              title='Convidado'
              color={theme.roles.guest}
              onLabelClick={onLabelClick}
              benefits={[
                'Solicitar alteração de papel para Estudante ou Professor'
              ]}
            />

            <button
              type='button'
              onClick={async () => await api.delete('user/role/student')}
            >
              RemoverEstudante
            </button>

            <RoleInfo
              title='Estudante'
              userRoles={labelRoles}
              color={theme.roles.student}
              onClick={() => {
                setRoleSelected('student')
              }}
              onLabelClick={onLabelClick}
              benefits={[
                'Participar de propostas',
                'Candidatar-se a um projeto',
                'Aceitar convites para propostas e projetos',
                'Candidatar-se a um projeto'
              ]}
            />

            <RoleInfo
              title='Professor'
              userRoles={labelRoles}
              color={theme.roles.professor}
              onClick={() => setRoleSelected('professor')}
              onLabelClick={onLabelClick}
              benefits={[
                'Pode fazer tudo que um estudante pode fazer',
                'Pedir revisão de propostas',
                'Remover estudantes de propostas, somente professor coordenador pode remover outros professores',
                'Solicitar papel de Revisor'
              ]}
            />

            {role.includes('professor') && (
              <RoleInfo
                title='Moderador'
                userRoles={labelRoles}
                color={theme.roles.moderator}
                onLabelClick={onLabelClick}
                onClick={() => setRoleSelected('moderator')}
                benefits={[
                  'Aceitar solicitação de mudança para Revisor ',
                  `Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores
              (devem estar na mesma instituição)`,
                  'Ver usuários da instituição',
                  'Alterar status da proposta'
                ]}
              />
            )}
          </div>
        </section>
      </Style>

      <AddRoleContext.Provider value={{ rolesHeight }}>
        {roleSelected === 'student' && <StudentForm />}
        {roleSelected === 'professor' && <ProfessorForm />}
        {roleSelected === 'moderator' && <ModeratorForm />}
      </AddRoleContext.Provider>
    </>
  )
}

export default AddRole
