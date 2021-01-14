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
    const response = await api.get('request/role/get/1')
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

  const tableData = (): RequestData[] => {
    const usersSolicitations = solicitations?.map(
      ({ status, full_name, role, created_at, request_id }) => {
        return {
          status: makeStatusLabel(status),
          role,
          statusCircle: status,
          name: full_name,
          date: created_at,
          id: request_id,
        }
      }
    )

    return usersSolicitations as RequestData[]
  }

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      {solicitations !== undefined ? (
        <Table headerData={headerData} data={tableData()} />
      ) : (
        <DotsLoader color={theme.colors.white} />
      )}
    </Style>
  )
}

export default Solicitation
