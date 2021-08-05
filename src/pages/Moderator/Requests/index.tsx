import React, { useRef } from 'react'
import Style, { Circle } from './styles'

import ResponseContent from './ResponseContent'

import { getStatusLabel, StatusTypes } from 'utils/status'
import { isoToDate } from 'utils/dates'
import formatterName from 'utils/formatterName'
import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import Table, {
  BodyRowType,
  GetDataType,
  HeaderType,
  TableMethods
} from 'components/Table'
import Role from 'components/Role'
import Modal, { ModalMethods } from 'components/Modal'

import {
  RequestsResType,
  RequestType
} from 'types/Responses/moderator/requests'
import { UserResType, UserType } from 'types/Responses/user'
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

const headerRow: HeaderType[] = [
  {
    label: 'Status',
    name: 'status',
    thWrapper: () => <Circle />,
    tdWrapper: ({ name }) => (
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Circle status={name as StatusTypes} />
      </div>
    )
  },
  {
    label: 'Nome',
    name: 'name'
  },
  {
    label: 'Papel',
    name: 'role',
    tdWrapper: ({ name }) => <Role role={name as RoleType} />
  },
  { label: 'Data', name: 'date' }
]

const getTableData: GetDataType = async () => {
  const tableData: BodyRowType[] = []
  const page = 1
  const filters = ''

  const { requests }: RequestsResType = await api.get(
    `users/roles/requests?page=${page}&per_page=$50${filters || ''}`
  )

  for (let i = 0; i < requests?.length; i++) {
    const { user }: UserResType = await api.get(`users/${requests[i].user_id}`)

    tableData.push({
      rowLabel: {
        name: { label: formatterName(user.name), name: user.name },
        role: { label: getRoleLabel(requests[i].role), name: requests[i].role },
        date: {
          label: isoToDate(requests[i].created_at, 'day/month/2-year'),
          name: requests[i].created_at
        },
        status: {
          label: getStatusLabel(requests[i].status),
          name: requests[i].status
        }
      },
      rowValue: {
        user,
        request: requests[i]
      }
    })
  }

  return tableData
}

const Requests = () => {
  const modalRef = useRef<ModalMethods>(null)
  const tableRef = useRef<TableMethods>(null)

  const onTableDataClick = (data: BodyRowType) => {
    modalRef.current?.config({
      close: { right: 24 },
      props: { top: '50%', translateY: '-50%' },
      content: (
        <ResponseContent
          data={data}
          onCloseClick={() => modalRef.current?.toggle(false)}
          resetTable={() => tableRef.current?.onRefreshIconClick()}
        />
      )
    })

    modalRef.current?.toggle(true)
  }

  return (
    <>
      <Style>
        <header>
          <h1>Solicitações</h1>
        </header>

        <Table
          ref={tableRef}
          headerRow={headerRow}
          getData={getTableData}
          onDataClick={onTableDataClick}
        />
      </Style>

      <Modal ref={modalRef} closeIcon={false} />
    </>
  )
}

export default Requests
