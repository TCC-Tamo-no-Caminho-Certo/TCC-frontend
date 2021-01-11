import React from 'react'
import Style from './styles'

import Table from 'pages/Moderator/Solicitation/Table'

interface TableData {
  statusCircle: 'accepted' | 'waiting' | 'refused'
  status: string
  name: string
  role: string
  date: string
}

const Solicitation: React.FC = () => {
  const headerData = [
    { name: 'statusCircle', label: '' },
    { name: 'name', label: 'Nome' },
    { name: 'role', label: 'Papel' },
    { name: 'status', label: 'Status' },
    { name: 'date', label: 'Data' },
  ]

  const makeStatusLabel = (status: 'accepted' | 'waiting' | 'refused'): string => {
    switch (status) {
      case 'accepted':
        return 'Aceito'
      case 'refused':
        return 'Recusado'
      default:
        return 'Aguardando'
    }
  }

  const users: TableData[] = [
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade',
      role: 'Estudante',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel',
      role: 'Professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean',
      role: 'Convidado',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade4',
      role: 'Estudante',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'Professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean4',
      role: 'Convidado',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade3',
      role: 'Estudante',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel3',
      role: 'Professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean3',
      role: 'Convidado',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade2',
      role: 'Estudante',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel2',
      role: 'Professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean2',
      role: 'Convidado',
      status: makeStatusLabel('refused'),
      date: '5 mai',
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
