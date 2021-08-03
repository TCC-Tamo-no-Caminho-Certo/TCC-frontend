import React from 'react'
import Style from './styles'

import ResponseContent from './ResponseContent'

import { isoToDate } from 'utils/dates'
import formatterName from 'utils/formatterName'
import { StatusTypes } from 'utils/status'

import api from 'services/api'

import Table, { GetData, HeaderData } from 'components/Table'
import { Circle } from 'components/Table/Tbody/styles'
import Role from 'components/Role'

import {
  RequestsResType,
  RequestType
} from 'types/Responses/moderator/requests'
import { UserResType, UserType } from 'types/Responses/user'
import { RoleType } from 'types/Responses/user/roles'

interface SelectedTableData {
  user: UserType
  request: RequestType
}

interface TableData {
  name: string
  role: RoleType
  date: string
  status: StatusTypes
}

const headerData: HeaderData[] = [
  {
    label: '',
    name: 'status',
    component: status => <Circle status={status} />
  },
  { name: 'name', label: 'Nome' },
  {
    name: 'role',
    label: 'Papel',
    component: role => <Role role={role} />
  },
  { name: 'date', label: 'Data' }
]

const getData: GetData<TableData, SelectedTableData> = async (
  page: number,
  filters?: string
) => {
  const tableData = []
  const { requests }: RequestsResType = await api.get(
    `users/roles/requests?page=${page}&per_page=$50${filters || ''}`
  )

  for (let i = 0; i < requests?.length; i++) {
    const { user }: UserResType = await api.get(`users/${requests[i].user_id}`)

    tableData.push({
      selectedData: {
        user,
        request: requests[i]
      },
      data: {
        name: formatterName(user.name),
        role: requests[i].role,
        date: isoToDate(requests[i].created_at, 'day/month'),
        status: requests[i].status
      }
    })
  }

  return tableData
}

const Requests = () => {
  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table<TableData, SelectedTableData>
        getData={getData}
        headerData={headerData}
        itemContent={ResponseContent}
        filters={{ from: true, name: true, role: true, status: true, to: true }}
      />
    </Style>
  )
}

export default Requests
