import React from 'react'
import Style from './styles'

import Table from 'pages/Moderator/Solicitation/Table'

import { Role } from 'store/user'

interface UserSolicitation {
  Nome: string
  Papel: Role
  Data: string
  Status: 'accepted' | 'waiting' | 'refused'
  id: number
}

const Solicitation: React.FC = () => {
  const headerData = ['Nome', 'Papel', 'Status', 'Data']

  const users: any[] = [
    {
      Nome: 'Miguel Andrade',
      Papel: 'Estudante',
      Data: '1 jan',
      Status: 'Aceito',
      id: 1,
    },
    {
      Nome: 'Gabriel',
      Papel: 'Professor',
      Data: '24 dez',
      Status: 'Aguardando',
      id: 2,
    },
    {
      Nome: 'Jean',
      Papel: 'Convidado',
      Data: '5 mai',
      Status: 'Recusado',
      id: 3,
    },
  ]

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table headerData={headerData} data={users} />
    </Style>
  )
}

export default Solicitation
