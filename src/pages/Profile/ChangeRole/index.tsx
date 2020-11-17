import React, { useEffect } from 'react'
import Style from './styles'

import Role from './Role'
import Student from './Roles/Student'
import Proponent from './Roles/Proponent'
import Moderator from './Roles/Moderator'
import Reviewer from './Roles/Reviewer'
import Professor from './Roles/Professor'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import { Route } from 'react-router-dom'

const roles = [
  {
    path: '/session/profile/change-role/student',
    exact: true,
    component: () => <Student />,
  },
  {
    path: '/session/profile/change-role/professor',
    exact: false,
    component: () => <Professor />,
  },
  {
    path: '/session/profile/change-role/proponent',
    exact: false,
    component: () => <Proponent />,
  },
  {
    path: '/session/profile/change-role/moderator',
    exact: false,
    component: () => <Moderator />,
  },
  {
    path: '/session/profile/change-role/reviewer',
    exact: false,
    component: () => <Reviewer />,
  },
  {
    path: '/session/profile/change-role/guest',
    exact: false,
    component: () => <></>,
  },
]

const ChangeRole: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => window.scrollBy(0, 0), [])

  return (
    <Style theme={theme} id='ChangeRole'>
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
        <Role
          title='Convidado'
          color='#fff500'
          benefits={['Solicitar alteração de papel para Estudante ou Professor']}
          noButton
        />

        <Role
          title='Estudante'
          color='#00d053'
          benefits={[
            'Participar de propostas',
            'Candidatar-se a um projeto',
            'Aceitar convites para propostas e projetos',
            'Candidatar-se a um projeto',
          ]}
          path='/session/profile/change-role/student'
        />

        <Role
          title='Proponente'
          color='#ff6b00'
          benefits={[
            'Submeter uma proposta',
            'Convidar estudantes e professores para  propostas',
            'Aceitar alunos e professores candidatados',
            'Remover estudantes e professores de propostas',
          ]}
          path='/session/profile/change-role/proponent'
        />

        <Role
          title='Professor'
          color='#329dff'
          benefits={[
            'Tudo de Estudante e Proponente',
            'Pedir revisão de propostas',
            'Remover estudantes de propostas, somente professor coordenador pode remover outros professores',
            'Solicitar papel de Revisor',
          ]}
          path='/session/profile/change-role/professor'
        />

        <Role
          title='Revisor'
          color='#ba5eff '
          benefits={[
            'Avaliar propostas',
            'Dar nota de 0 a 10 a propostas',
            'Definir linha de pesquisa conforme CNPQ',
            'Aceitar convites para propostas e projetos',
            'Definir conflitos de interesses',
          ]}
          path='/session/profile/change-role/reviewer'
        />

        <Role
          title='Moderador'
          color='#64e3ff'
          benefits={[
            'Aceitar solicitação de mudança para Revisor ',
            'Aceitar solicitações de Convidados para se tornarem Estudantes ou Professores' +
              '(devem estar na mesma instituição)',
            'Ver usuários da instituição',
            'Alterar status da proposta',
          ]}
          path='/session/profile/change-role/moderator'
        />
      </div>

      {roles.map(route => (
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </Style>
  )
}

export default ChangeRole