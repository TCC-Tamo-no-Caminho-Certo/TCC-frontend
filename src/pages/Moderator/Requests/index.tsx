import React from 'react'
import Style from './styles'

import ResponseContent from './ResponseContent'

import { isoToDate } from 'utils/dates'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import Table, { HeaderData } from 'components/Table'

import { useSelector } from 'react-redux'

const headerData: HeaderData[] = [
  { name: 'status', label: '', circle: true },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel', role: true, indexer: 'role_id' },
  {
    name: 'created_at',
    label: 'Data',
    dataManipulation: data => isoToDate(data, 'day/month')
  }
]

const Requests = () => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table
        path='user/role/requests'
        headerData={headerData}
        condition={!!user.roles}
        itemContent={ResponseContent}
        filters={{ from: true, name: true, role: true, status: true, to: true }}
      />
    </Style>
  )
}

export default Requests
