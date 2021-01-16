import React, { useContext, useEffect, useState } from 'react'
import Style from './styles'

import RoleInfo from './RoleInfo'
import AddRoleForm from './AddRoleForm'

import selectRoleLabel from 'utils/makeRoleLabel'

import { RootState } from 'store'
import { Role, UserState } from 'store/user'

import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
// import { Route } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

// const rolesRoute = [
//   {
//     path: '/session/profile/change-role/student',
//     exact: true,
//     component: () => <Student />,
//   },
//   {
//     path: '/session/profile/change-role/professor',
//     exact: false,
//     component: () => <Professor />,
//   },
//   {
//     path: '/session/profile/change-role/proponent',
//     exact: false,
//     component: () => <Proponent />,
//   },
//   {
//     path: '/session/profile/change-role/moderator',
//     exact: false,
//     component: () => <Moderator />,
//   },
//   {
//     path: '/session/profile/change-role/reviewer',
//     exact: false,
//     component: () => <Reviewer />,
//   },
//   {
//     path: '/session/profile/change-role/guest',
//     exact: false,
//     component: () => <></>,
//   },
// ]

const allRoles: Role[] = [
  'admin',
  'guest',
  'aris',
  'student',
  'professor',
  'customer',
  'evaluator',
  'moderator',
]

const AddRole: React.FC = () => {
  const { roles } = useSelector<RootState, UserState>(state => state.user)
  const [roleSelected, setRoleSelected] = useState<Role | undefined>(undefined)
  const labelRoles = roles.map(role => selectRoleLabel(role))
  const theme = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    if (roleSelected === undefined)
      allRoles.map(role => pathname.includes(role) && setRoleSelected(role))
  }, [location, roleSelected])

  return (
    <Style id='ChangeRole'>
      <h2>Escolher Papel</h2>

      <p>
        Escolha um papel para poder ter mais acesso ao Steams Labs! Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Fusce gravida convallis magna, vel dignissim leo porttitor
        quis. Donec dolor dolor, sagittis a lacus sed, interdum egestas ipsum. In at odio efficitur,
        iaculis libero sed, consectetur nibh. Proin euismod auctor tempus. Vivamus eleifend tellus
        purus, id imperdiet sapien pharetra quis. Praesent mattis dolor a dictum scelerisque.
        Maecenas et tortor elementum.
      </p>

      <div id='Roles'>
        <RoleInfo
          title='Convidado'
          color={theme.roles.guest}
          benefits={['Solicitar alteração de papel para Estudante ou Professor']}
          noButton
        />

        <RoleInfo
          title='Estudante'
          userRoles={labelRoles}
          color={theme.roles.student}
          benefits={[
            'Participar de propostas',
            'Candidatar-se a um projeto',
            'Aceitar convites para propostas e projetos',
            'Candidatar-se a um projeto',
          ]}
          onClick={() => setRoleSelected('student')}
        />

        <RoleInfo
          title='Proponente'
          userRoles={labelRoles}
          color={theme.roles.customer}
          benefits={[
            'Submeter uma proposta',
            'Convidar estudantes e professores para  propostas',
            'Aceitar alunos e professores candidatados',
            'Remover estudantes e professores de propostas',
          ]}
          onClick={() => setRoleSelected('customer')}
        />

        <RoleInfo
          title='Professor'
          userRoles={labelRoles}
          color={theme.roles.professor}
          benefits={[
            'Tudo de Estudante e Proponente',
            'Pedir revisão de propostas',
            'Remover estudantes de propostas, somente professor coordenador pode remover outros professores',
            'Solicitar papel de Revisor',
          ]}
          onClick={() => setRoleSelected('professor')}
        />

        <RoleInfo
          title='Revisor'
          userRoles={labelRoles}
          color={theme.roles.evaluator}
          benefits={[
            'Avaliar propostas',
            'Dar nota de 0 a 10 a propostas',
            'Definir linha de pesquisa conforme CNPQ',
            'Aceitar convites para propostas e projetos',
            'Definir conflitos de interesses',
          ]}
          onClick={() => setRoleSelected('evaluator')}
        />

        <RoleInfo
          title='Moderador'
          userRoles={labelRoles}
          color={theme.roles.moderator}
          benefits={[
            'Aceitar solicitação de mudança para Revisor ',
            'Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores' +
              '(devem estar na mesma instituição)',
            'Ver usuários da instituição',
            'Alterar status da proposta',
          ]}
          onClick={() => setRoleSelected('moderator')}
        />

        <RoleInfo
          title='Administrador'
          userRoles={labelRoles}
          color={theme.roles.admin}
          benefits={[
            'Aceitar solicitação de mudança para Revisor ',
            'Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores' +
              '(devem estar na mesma instituição)',
            'Ver usuários da instituição',
            'Alterar status da proposta',
          ]}
          onClick={() => setRoleSelected('admin')}
        />
      </div>

      {roleSelected !== undefined && <AddRoleForm role={roleSelected} />}
    </Style>
  )
}

export default AddRole
