import React from 'react'
import Style from './styles'

import { StatusTypes } from 'utils/status'
import { isoToDate } from 'utils/dates'

import Table, { BodyRowType, GetDataType, HeaderType } from 'components/Table'

import { RequestType } from 'types/Responses/moderator/requests'
import { UserType } from 'types/Responses/user'
import { RoleType } from 'types/Responses/user/roles'

export interface SelectedTableData {
  user: UserType
  request: RequestType
}

export interface TableData {
  name: string
  role: RoleType
  date: string
  status: StatusTypes
}

const date1 = new Date(2021, 2, 12, 0, 70).toISOString()
const date3 = new Date(2021, 1, 14, 0, 70).toISOString()
const date2 = new Date().toISOString()

const headerRow: HeaderType[] = [
  {
    label: 'Nome',
    name: 'name'
  },
  { label: 'Papel', name: 'role' },
  { label: 'Data', name: 'date' }
]

const bodyRows: BodyRowType[] = [
  {
    rowLabel: {
      name: { label: 'Miguel', value: 'miguel' },
      role: { label: 'Estudent', value: 'student' },
      date: { label: isoToDate(date1, 'day/month'), value: date1 }
    },
    rowValue: {
      age: 19,
      email: 'miguelandradebarreto2@gmail.com'
    }
  },
  {
    rowLabel: {
      name: { label: 'Jean', value: 'jean' },
      role: { label: 'Professor', value: 'professor' },
      date: { label: isoToDate(date2, 'day/month'), value: date2 }
    },
    rowValue: {
      age: 19,
      email: 'miguelandradebarreto2@gmail.com'
    }
  },
  {
    rowLabel: {
      name: { label: 'Gabriel', value: 'gabriel' },
      role: { label: 'Estudent', value: 'student' },
      date: { label: isoToDate(date3, 'day/month'), value: date3 }
    },
    rowValue: {
      age: 19,
      email: 'miguelandradebarreto3@gmail.com'
    }
  }
]

const Requests = () => {
  const getTableData: GetDataType = async () => {
    setTimeout(() => {}, 1000)
    return bodyRows
  }

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>

        <Table headerRow={headerRow} getData={getTableData} />
      </header>
    </Style>
  )
}

export default Requests
