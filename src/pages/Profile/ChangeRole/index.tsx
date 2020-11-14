import React from 'react'
import Style from './styles'

import Role from './Role'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const ChangeRole: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <h2>Alterar Papel</h2>

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
        />
      </div>
    </Style>
  )
}

export default ChangeRole
