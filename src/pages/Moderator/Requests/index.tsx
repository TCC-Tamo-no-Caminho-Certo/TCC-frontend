import React, { useContext, useRef, useState } from 'react'
import Style, { Circle, Filter, FilterButton } from './styles'

import ResponseContent from './ResponseContent'

import { getStatusLabel, StatusTypes } from 'utils/status'
import { isoToDate } from 'utils/dates'
import formatterName from 'utils/formatterName'
import { getRoleLabel } from 'utils/roles'
import transition from 'utils/transition'

import api from 'services/api'

import LoupeIcon from 'assets/Inputs/LoupeIcon'

import Table, {
  BodyRowType,
  GetDataType,
  HeaderType,
  TableMethods
} from 'components/Table'
import Role from 'components/Role'
import Modal, { ModalMethods } from 'components/Modal'
import { Datepicker, Submit, Text } from 'components/Form'

import {
  RequestsResType,
  RequestType
} from 'types/Responses/moderator/requests'
import { UserResType, UserType } from 'types/Responses/user'
import { RoleType } from 'types/Responses/user/roles'

import { darken, lighten } from 'polished'
import { Theme } from 'react-select'
import { Form, Select } from 'semantic-ui-react'
import { ThemeContext } from 'styled-components'

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

const Requests = () => {
  const { colors } = useContext(ThemeContext)

  const modalRef = useRef<ModalMethods>(null)
  const tableRef = useRef<TableMethods>(null)

  const [filters, setFilters] = useState()

  const selectStyle = {
    container: (before: any) => ({ ...before }),
    singleValue: (before: any) => ({ ...before, color: colors.secondary }),
    multiValueLabel: (before: any) => ({ ...before, color: colors.secondary }),
    multiValueRemove: (before: any) => ({ ...before, color: colors.secondary }),
    multiValue: (before: any) => ({
      ...before,
      backgroundColor: colors.primary
    }),
    valueContainer: (before: any) => ({
      ...before,
      paddingLeft: 0,
      backgroundColor: 'transparent'
    }),
    menu: (before: any) => ({
      ...before,
      zIndex: 3,
      color: colors.secondary,
      backgroundColor: colors.primary,
      border: `solid 1px ${colors.secondary}`
    }),
    control: (before: any) => ({
      ...before,
      paddingLeft: 8,
      backgroundColor: 'transparent',
      border: `solid 1px ${colors.secondary}`,
      ':hover': {
        border: `solid 1px ${colors.secondary}`
      }
    })
  }

  const selectTheme = (beforeTheme: Theme) => ({
    ...beforeTheme,
    colors: {
      ...beforeTheme.colors,
      danger: colors.red,
      dangerLight: lighten(0.5, colors.red),
      primary: colors.tertiary,
      primary25: lighten(0.1, colors.tertiary),
      primary50: lighten(0.2, colors.tertiary),
      primary75: lighten(0.3, colors.tertiary),
      neutral0: colors.secondary,
      neutral5: colors.secondary,
      neutral10: colors.secondary,
      neutral20: colors.secondary,
      neutral30: colors.secondary,
      neutral40: colors.secondary,
      neutral50: colors.secondary,
      neutral60: colors.secondary,
      neutral70: colors.secondary,
      neutral80: colors.secondary,
      neutral90: colors.secondary
    }
  })

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

  const getTableData: GetDataType = async () => {
    const tableData: BodyRowType[] = []
    const page = 1
    const filters = ''

    const { requests }: RequestsResType = await api.get(
      `users/roles/requests?page=${page}&per_page=$50${filters || ''}`
    )

    for (let i = 0; i < requests?.length; i++) {
      const { user }: UserResType = await api.get(
        `users/${requests[i].user_id}`
      )

      tableData.push({
        rowLabel: {
          name: { label: formatterName(user.name), name: user.name },
          role: {
            label: getRoleLabel(requests[i].role),
            name: requests[i].role
          },
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

  return (
    <>
      <Style>
        <header>
          <h1>Solicitações</h1>
        </header>

        <Filter>
          <Text
            name='name'
            type='text'
            autoComplete='off'
            placeholder='Nome'
            textColors={{
              focused: colors.secondary,
              unfocused: colors.secondary
            }}
          />

          <Select
            name='role'
            placeholder='Papel'
            theming={selectTheme}
            styling={selectStyle}
            options={[
              { label: 'Estudante', value: 'student' },
              { label: 'Professor', value: 'professor' },
              { label: 'Moderador', value: 'moderator' },
              { label: 'Todos', value: 'all' }
            ]}
          />

          <Select
            name='status'
            placeholder='Status'
            theming={selectTheme}
            styling={selectStyle}
            options={[
              { label: 'Aguardando', value: 'awaiting' },
              { label: 'Aceito', value: 'accepted' },
              { label: 'Recusado', value: 'rejected' },
              { label: 'Todos', value: 'all' }
            ]}
          />

          <Datepicker
            name='from'
            placeholder='De'
            dateColors={{
              disabled: colors.red,
              body: colors.secondary,
              selected: colors.tertiary,
              header: darken(0.06, colors.tertiary)
            }}
            textColors={{
              focused: colors.secondary,
              unfocused: colors.secondary
            }}
          />

          <Datepicker
            name='to'
            placeholder='Até'
            dateColors={{
              disabled: colors.red,
              body: colors.secondary,
              selected: colors.tertiary,
              header: darken(0.06, colors.tertiary)
            }}
            textColors={{
              focused: colors.secondary,
              unfocused: colors.secondary
            }}
          />

          <FilterButton animate={{ paddingTop: [700, 0], transition }}>
            <Submit>
              <LoupeIcon />
              Buscar
            </Submit>

            <button type='button'>Limpar filtros</button>
          </FilterButton>
        </Filter>

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
