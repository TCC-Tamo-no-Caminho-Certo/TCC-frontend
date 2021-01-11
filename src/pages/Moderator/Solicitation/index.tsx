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
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Jean',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade4',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'waiting',
      name: 'Gabriel4',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean4123123',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean4312312',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean44123',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean44124124',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean34',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean42',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Jean414',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'refused',
      name: 'Miguel Andrade3',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'refused',
      name: 'Gabriel3',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean3',
      role: 'guest',
      status: makeStatusLabel('refused'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade2',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '1 jan',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel2',
      role: 'professor',
      status: makeStatusLabel('waiting'),
      date: '24 dez',
    },
    {
      statusCircle: 'refused',
      name: 'Jean2',
      role: 'guest',
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
