/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import Style from './styles'

import Table, { RequestData, StatusTypes } from './Table'

import api from 'services/api'

import { Role } from 'store/user'
import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import DotsLoader from 'components/DotsLoader'

import { useSelector } from 'react-redux'

interface Request {
  request_id: number
  user_id: number
  role_id: number
  data: string
  status: StatusTypes
  full_name: string
  role: Role
  created_at: string
  updated_at?: string
}

const Solicitation: React.FC = () => {
  const [solicitations, recieveSolicitations] = useState<Request[] | undefined>(undefined)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const headerData = [
    { name: 'statusCircle', label: '' },
    { name: 'name', label: 'Nome' },
    { name: 'role', label: 'Papel' },
    { name: 'status', label: 'Status' },
    { name: 'date', label: 'Data' },
  ]

  const makeRequest = async () => {
    const response = await api.get('request/role/get/1/20')

    recieveSolicitations(response.requests)
  }

  useEffect(() => {
    makeRequest()
  }, [])

  const makeStatusLabel = (status: StatusTypes): string => {
    switch (status) {
      case 'accepted':
        return 'Aceito'
      case 'rejected':
        return 'Recusado'
      default:
        return 'Aguardando'
    }
  }

  const makeDateLabel = (date: string): string => {
    const teste = date.replaceAll('-', '/').split('')

    const month = {
      '01': 'jan',
      '02': 'fev',
      '03': 'mar',
      '04': 'mai',
      '05': 'abr',
      '06': 'jun',
      '07': 'jul',
      '08': 'ago',
      '09': 'set',
      '10': 'out',
      '11': 'nov',
      '12': 'dez',
    }

    const keyOfMonth = teste[5] + teste[6]

    return `${teste[8] + teste[9]} ${month[keyOfMonth as keyof typeof month]}`
  }

  const users: RequestData[] = [
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 2,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 3,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 4,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 5,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 6,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 7,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 8,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 9,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 10,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 11,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 12,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 13,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 14,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 15,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 16,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 17,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 18,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 19,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 20,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
    {
      status: makeStatusLabel('rejected'),
      role: 'professor',
      statusCircle: 'rejected',
      name: 'Miguel Andrade',
      date: makeDateLabel('2077-08-19 24:00:00'),
      id: 1,
    },
  ]

  // const tableData = (): RequestData[] => {
  //   const usersSolicitations = solicitations?.map(
  //     ({ status, full_name, role, created_at, request_id }) => {
  //       return {
  //         status: makeStatusLabel(status),
  //         role,
  //         statusCircle: status,
  //         name: full_name,
  //         date: makeDateLabel(created_at),
  //         id: request_id,
  //       }
  //     }
  //   )

  //   return usersSolicitations as RequestData[]
  // }

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      {solicitations !== undefined ? (
        <Table headerData={headerData} data={users} />
      ) : (
        <DotsLoader color={theme.colors.white} />
      )}
    </Style>
  )
}

export default Solicitation
