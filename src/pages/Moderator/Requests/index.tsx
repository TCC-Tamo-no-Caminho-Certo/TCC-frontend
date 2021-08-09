import React, { useCallback, useContext, useRef, useState } from 'react'
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
import { Datepicker, Select, Submit, Text } from 'components/Form'

import {
  RequestsResType,
  RequestType
} from 'types/Responses/moderator/requests'
import { UserResType, UserType } from 'types/Responses/user'
import { RoleType } from 'types/Responses/user/roles'

import { darken, lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

export interface SelectedTableData {
  user: UserType
  request: RequestType
}

export interface TableData {
  name: string
  date: string
  role: RoleType
  status: StatusTypes
}

const headerRow: HeaderType[] = [
  {
    label: 'Status',
    name: 'status',
    thWrapper: () => <Circle />,
    tdWrapper: ({ name }) => <Circle status={name as StatusTypes} />
  },
  { label: 'Nome', name: 'name' },
  {
    name: 'role',
    label: 'Papel',
    tdWrapper: ({ name }) => <Role role={name as RoleType} />
  },
  { label: 'Data', name: 'date' }
]

const Requests = () => {
  const { colors } = useContext(ThemeContext)
  const { secondary, primary, tertiary, red } = colors

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
      color: secondary,
      backgroundColor: primary,
      border: `solid 1px ${secondary}`
    }),
    control: (before: any) => ({
      ...before,
      paddingLeft: 8,
      backgroundColor: 'transparent',
      border: `solid 1px ${secondary}`,
      ':hover': { border: `solid 1px ${secondary}` }
    })
  }

  const selectTheme = (beforeTheme: Theme) => ({
    ...beforeTheme,
    colors: {
      ...beforeTheme.colors,
      danger: red,
      dangerLight: lighten(0.5, red),
      primary: tertiary,
      primary25: lighten(0.1, tertiary),
      primary50: lighten(0.2, tertiary),
      primary75: lighten(0.3, tertiary),
      neutral0: secondary,
      neutral5: secondary,
      neutral10: secondary,
      neutral20: secondary,
      neutral30: secondary,
      neutral40: secondary,
      neutral50: secondary,
      neutral60: secondary,
      neutral70: secondary,
      neutral80: secondary,
      neutral90: secondary
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

  const getTableData: GetDataType = useCallback(async ({ filters, page }) => {
    const tableData: BodyRowType[] = []
    const per_page = 50

    const { requests }: RequestsResType = await api.get(
      'users/roles/requests',
      {
        params: { page, per_page, filters }
      }
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
  }, [])

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
        >
          <Text
            type='text'
            name='full_name'
            autoComplete='off'
            placeholder='Nome'
            textColors={{
              focused: secondary,
              unfocused: secondary
            }}
          />

          <div className='row'>
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
          </div>

          <div className='row'>
            <Datepicker
              name='from'
              placeholder='De'
              textColors={{
                focused: secondary,
                unfocused: secondary
              }}
              dateColors={{
                disabled: red,
                body: secondary,
                selected: tertiary,
                header: darken(0.06, tertiary)
              }}
            />

            <Datepicker
              name='to'
              placeholder='Até'
              textColors={{
                focused: secondary,
                unfocused: secondary
              }}
              dateColors={{
                disabled: red,
                body: secondary,
                selected: tertiary,
                header: darken(0.06, tertiary)
              }}
            />
          </div>
        </Table>
      </Style>

      <Modal ref={modalRef} closeIcon={false} />
    </>
  )
}

export default Requests
