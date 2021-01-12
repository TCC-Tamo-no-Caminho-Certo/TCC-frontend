import React from 'react'
import Style from './styles'

import Table from 'pages/Moderator/Solicitation/Table'

import { Role } from 'store/user'

interface TableData {
  statusCircle: 'accepted' | 'waiting' | 'refused'
  status: string
  name: string
  role: Role
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
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade2',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues2',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto2',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana2',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro2',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade3',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues3',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto3',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana3',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro3',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade4',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues4',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto4',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana4',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro4',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade5',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues5',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto5',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana5',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro5',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade6',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'accepted',
      name: 'Jean Domingues6',
      role: 'student',
      status: makeStatusLabel('accepted'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto6',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana6',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro6',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'accepted',
      name: 'Miguel Andrade7',
      role: 'moderator',
      status: makeStatusLabel('accepted'),
      date: '19 ago',
    },
    {
      statusCircle: 'refused',
      name: 'Jean Domingues7',
      role: 'student',
      status: makeStatusLabel('refused'),
      date: '31 dez',
    },
    {
      statusCircle: 'accepted',
      name: 'Gabriel Augusto7',
      role: 'professor',
      status: makeStatusLabel('accepted'),
      date: '22 fev',
    },
    {
      statusCircle: 'waiting',
      name: 'André Santana7',
      role: 'admin',
      status: makeStatusLabel('waiting'),
      date: '5 mai',
    },
    {
      statusCircle: 'waiting',
      name: 'João Pedro7',
      role: 'evaluator',
      status: makeStatusLabel('waiting'),
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
