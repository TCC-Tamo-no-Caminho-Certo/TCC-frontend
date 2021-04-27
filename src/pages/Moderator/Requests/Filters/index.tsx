import React, { useContext, useState } from 'react'
import Style from './styles'

import { RequestsContext } from '../'
import { transformArray } from '../Tbody'

import api from 'services/api'

import { RootState } from 'store'
import { RolesState } from 'store/Async/roles'

import LoupeIcon from 'assets/Inputs/LoupeIcon'

import { Datepicker, Select, Submit, Text } from 'components/Form'
import Presence from 'components/Presence'

import { motion, Transition, Variants } from 'framer-motion'
import { darken, lighten } from 'polished'
import { useSelector } from 'react-redux'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

const transition: Transition = {
  duration: 0.3,
  type: 'tween'
}

const reset: Variants = {
  enter: {
    opacity: [0, 1],
    marginTop: [-168, 0],
    transition
  },
  exit: {
    opacity: [1, 0],
    marginTop: [0, -168],
    transition
  }
}

const Filters = () => {
  const { roles } = useSelector<RootState, RolesState>(({ roles }) => roles)
  const { quantity, setTableState } = useContext(RequestsContext)
  const theme = useContext(ThemeContext)

  const [values, setValues] = useState<any>(true)

  const selectStyle = {
    container: (before: any) => ({
      ...before
    }),
    menu: (before: any) => ({
      ...before,
      zIndex: 3,
      color: theme.colors.secondary,
      backgroundColor: theme.colors.primary,
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

  const filterTable = async ({ name, role, status, from, to }: any) => {
    const callStartCondition = !name && !role && !status && !from && !to

    if (callStartCondition) {
      const { requests } = await api.get(
        `user/role/requests?page=1&per_page=${quantity}`
      )

      const tableData = transformArray(requests, roles)

      setTableState({
        tablePage: 1,
        showData: tableData
      })
    } else {
      const roleId = roles.filter(({ title }) => title === role)[0]

      const nameFilter = name ? `&filter[full_name]=${name}` : ''
      const statusFilter =
        status && status !== 'all' ? `&filter[status]=${status}` : ''
      const roleFilter =
        roleId && role !== 'all' ? `&filter[role_id]=${roleId.role_id}` : ''
      const dateFilter =
        from && to
          ? `&filter[created_at][]=${from}&filter[created_at][]=${to}`
          : ''

      const allFilters = nameFilter + roleFilter + statusFilter + dateFilter

      const { requests } = await api.get(
        `user/role/requests?page=1&per_page=${quantity}${allFilters}`
      )

      setTableState({
        tablePage: 1,
        showData: transformArray(requests, roles)
      })
    }
  }

  return (
    <Style getData={filterTable}>
      <Presence
        exit='exit'
        animate='enter'
        variants={reset}
        condition={values}
        presenceProps={{ exitBeforeEnter: true }}
      >
        <Text
          name='name'
          type='text'
          autoComplete='off'
          placeholder='Nome'
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />

        <div id='row'>
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

        <div id='row'>
          <Datepicker
            name='from'
            placeholder='De'
            dateColors={{
              disabled: theme.colors.red,
              body: theme.colors.secondary,
              selected: theme.colors.tertiary,
              header: darken(0.06, theme.colors.tertiary)
            }}
            textColors={{
              focused: theme.colors.secondary,
              unfocused: theme.colors.secondary
            }}
          />

          <Datepicker
            name='to'
            placeholder='Até'
            dateColors={{
              disabled: theme.colors.red,
              body: theme.colors.secondary,
              selected: theme.colors.tertiary,
              header: darken(0.06, theme.colors.tertiary)
            }}
            textColors={{
              focused: theme.colors.secondary,
              unfocused: theme.colors.secondary
            }}
          />
        </div>
      </Presence>

      <motion.div id='buttons' animate={{ paddingTop: [700, 0], transition }}>
        <Submit>
          <LoupeIcon />
          Buscar
        </Submit>

        <button
          type='button'
          onClick={() => {
            setValues(false)
            setTimeout(() => {
              setValues(true)
            }, 600)
          }}
        >
          Limpar filtros
        </button>
      </motion.div>
    </Style>
  )
}

export default Filters
