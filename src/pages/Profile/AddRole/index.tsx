import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import RoleInfo from './RoleInfo'
import ModeratorForm from './Forms/ModeratorForm'
import StudentForm from './Forms/StudentForm'
import ProfessorForm from './Forms/ProfessorForm'

import selectRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/user'
import { Role } from 'store/roles'

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

const AddRole = () => {
  const { roles } = useSelector<RootState, UserState>(state => state.user)
  const [roleSelected, setRoleSelected] = useState<Role | undefined>(undefined)
  const labelRoles = roles.map(role => selectRoleLabel(role))
  const theme = useContext(ThemeContext)
  const { pathname } = useLocation()
  const rolesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (roleSelected === undefined)
      allRoles.map(role => pathname.includes(role) && setRoleSelected(role))
  }, [roleSelected, pathname])

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
            <button
              type='button'
              onClick={async () => await api.delete('user/role/student')}
            >
              RemoverEstudante
            </button>

            <button
              type='button'
              onClick={async () => await api.delete('user/role/professor')}
            >
              RemoverProfessor
            </button>

            <button
              type='button'
              onClick={async () => await api.delete('user/role/moderator')}
            >
              RemoverModerador
            </button>

            <RoleInfo
              noButton
              title='Convidado'
              color={theme.roles.guest}
              benefits={[
                'Solicitar alteração de papel para Estudante ou Professor'
              ]}
            />

            <RoleInfo
              title='Estudante'
              userRoles={labelRoles}
              color={theme.roles.student}
              onClick={() => {
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
              title='Professor'
              userRoles={labelRoles}
              color={theme.roles.professor}
              onClick={() => setRoleSelected('professor')}
              benefits={[
                'Pode fazer tudo que um estudante pode fazer',
                'Pedir revisão de propostas',
                'Remover estudantes de propostas, somente professor coordenador pode remover outros professores',
                'Solicitar papel de Revisor'
              ]}
            />

            {roles.includes('professor') && (
              <RoleInfo
                title='Moderador'
                userRoles={labelRoles}
                color={theme.roles.moderator}
                onClick={() => setRoleSelected('moderator')}
                benefits={[
                  'Aceitar solicitação de mudança para Revisor ',
                  'Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores (devem estar na mesma instituição)',
                  'Ver usuários da instituição',
                  'Alterar status da proposta'
                ]}
              />
            )}
          </div>
        </section>
      </Style>

      {roleSelected === 'student' && <StudentForm />}
      {roleSelected === 'professor' && <ProfessorForm />}
      {roleSelected === 'moderator' && <ModeratorForm />}
    </>
  )
}

export default AddRole
