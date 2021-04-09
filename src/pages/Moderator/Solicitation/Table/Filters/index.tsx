import React, { useContext, useState } from 'react'
import Style from './styles'

import { TableContext } from '../'
import { transformArray } from '../Tbody'

import api from 'services/api'

import LoupeIcon from 'assets/Inputs/LoupeIcon'

import { Datepicker, Select, Text } from 'components/Form'

import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

interface Filter {
  role: JSX.Element
  date: JSX.Element
  name: JSX.Element
  status: JSX.Element
}

interface FiltersProps {
  quantity: number
}

const Filters = ({ quantity }: FiltersProps) => {
  const [filter, setFilter] = useState<keyof Filter>('name')

  const tableContext = useContext(TableContext)
  const theme = useContext(ThemeContext)

  const selectStyle = {
    container: (before: any) => ({
      ...before
    }),
    menu: (before: any) => ({
      ...before,
      zIndex: 3,
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      border: `solid ${theme.colors.secondary} 1px`
    }),
    control: (before: any) => ({
      ...before,
      paddingLeft: 8,
      backgroundColor: 'transparent',
      border: `solid ${theme.colors.secondary} 1px`,
      ':hover': {
        border: `solid ${theme.colors.secondary} 1px`
      }
    }),
    valueContainer: (before: any) => ({
      ...before,
      paddingLeft: 0,
      backgroundColor: 'transparent'
    }),
    singleValue: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    }),
    multiValue: (before: any) => ({
      ...before,
      backgroundColor: theme.colors.primary
    }),
    multiValueLabel: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    }),
    multiValueRemove: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    })
  }

  const selectTheme = (beforeTheme: Theme) => ({
    ...beforeTheme,
    colors: {
      ...beforeTheme.colors,
      danger: theme.colors.red,
      dangerLight: lighten(0.5, theme.colors.red),
      primary: theme.colors.tertiary,
      primary25: lighten(0.1, theme.colors.tertiary),
      primary50: lighten(0.2, theme.colors.tertiary),
      primary75: lighten(0.3, theme.colors.tertiary),
      neutral0: theme.colors.secondary,
      neutral5: theme.colors.secondary,
      neutral10: theme.colors.secondary,
      neutral20: theme.colors.secondary,
      neutral30: theme.colors.secondary,
      neutral40: theme.colors.secondary,
      neutral50: theme.colors.secondary,
      neutral60: theme.colors.secondary,
      neutral70: theme.colors.secondary,
      neutral80: theme.colors.secondary,
      neutral90: theme.colors.secondary
    }
  })

  const filters: Filter = {
    name: (
      <Text
        name='name'
        type='text'
        autoComplete='off'
        placeholder='Filtrar'
        textColors={{
          focused: theme.colors.secondary,
          unfocused: theme.colors.secondary
        }}
      />
    ),
    role: (
      <Select
        name='role'
        className='SelectRole'
        theming={selectTheme}
        styling={selectStyle}
        options={[
          { label: 'Estudante', value: 'student' },
          { label: 'Moderador', value: 'moderator' },
          { label: 'Professor', value: 'professor' }
        ]}
      />
    ),
    status: (
      <Select
        name='status'
        className='SelectRole'
        theming={selectTheme}
        styling={selectStyle}
        options={[
          { label: 'Aguardando', value: 'awaiting' },
          { label: 'Aceito', value: 'accepted' },
          { label: 'Recusado', value: 'rejected' }
        ]}
      />
    ),
    date: (
      <div id='dates'>
        <Datepicker
          placeholder='De'
          dateColors={{
            body: theme.colors.secondary,
            header: theme.colors.primary,
            selected: theme.colors.tertiary,
            disabled: theme.colors.red
          }}
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />

        <Datepicker
          placeholder='Até'
          dateColors={{
            body: theme.colors.secondary,
            header: theme.colors.primary,
            selected: theme.colors.tertiary,
            disabled: theme.colors.red
          }}
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />
      </div>
    )
  }

  const filterTable = async ({ name, role, status }: any) => {
    if (name) {
      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}&filter[full_name]=${name}`
      )

      const { requests } = response
      tableContext?.setTableState({
        showData: transformArray(requests, tableContext.roles),
        tablePage: 1
      })
    }

    if (role) {
      const roleId = tableContext.roles.filter(({ title }) => role === title)[0]
        .role_id

      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}&filter[role_id]=${roleId}`
      )

      const { requests } = response

      tableContext?.setTableState({
        showData: transformArray(requests, tableContext.roles),
        tablePage: 1
      })
    }

    if (status) {
      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}&filter[status]=${status}`
      )

      const { requests } = response

      tableContext?.setTableState({
        showData: transformArray(requests, tableContext.roles),
        tablePage: 1
      })
    }
  }

  return (
    <Style getData={filterTable}>
      {filters[filter]}

      <Select
        name='filter'
        className='SelectFilter'
        theming={selectTheme}
        styling={selectStyle}
        onChange={(e: any) => setFilter(e.value)}
        defaultValue={{ label: 'Nome', value: 'name' }}
        options={[
          { label: 'Papel', value: 'role' },
          { label: 'Nome', value: 'name' },
          { label: 'Data', value: 'date' },
          { label: 'Status', value: 'status' }
        ]}
      />

      <button type='submit' className='Submit'>
        <LoupeIcon />
        Buscar
      </button>
    </Style>
  )
}

export default Filters
