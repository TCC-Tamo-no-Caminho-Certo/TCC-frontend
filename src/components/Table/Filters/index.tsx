import React, { useContext, useState } from 'react'
import Style from './styles'

import { TableContext } from '../index'

import transition from 'utils/transition'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import LoupeIcon from 'assets/Inputs/LoupeIcon'

import { Datepicker, Select, Submit, Text } from 'components/Form'
import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'
import { darken, lighten } from 'polished'
import { useSelector } from 'react-redux'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

export interface FiltersProps {
  to?: boolean
  name?: boolean
  role?: boolean
  from?: boolean
  status?: boolean
}

const reset: Variants = {
  enter: { opacity: [0, 1], marginTop: [-168, 0], transition },
  exit: { opacity: [1, 0], marginTop: [0, -168], transition }
}

const Filters = ({
  to = false,
  name = false,
  role = false,
  from = false,
  status = false
}: FiltersProps) => {
  const { roles } = useSelector<RootState, UserState>(({ user }) => user)
  const { quantity, setTableState, path } = useContext(TableContext)
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
      const { requests } = await api.get(`${path}?page=1&per_page=${quantity}`)

      setTableState({ tablePage: 1, showData: requests })
    } else {
      const roleToFilter = roles.find(userRole => userRole === role)

      const nameFilter = name ? `&filter[full_name]=${name}` : ''

      const statusFilter =
        status && status !== 'all' ? `&filter[status]=${status}` : ''

      const roleFilter =
        roleToFilter && role !== 'all' ? `&filter[role_id]=${roleToFilter}` : ''

      const dateFilter =
        from && to
          ? `&filter[created_at][]=${from}&filter[created_at][]=${to}`
          : ''

      const allFilters = nameFilter + roleFilter + statusFilter + dateFilter

      const { requests } = await api.get(
        `${path}?page=1&per_page=${quantity}${allFilters}`
      )

      setTableState({ tablePage: 1, showData: requests })
    }
  }

  return (
    <Style
      className='Filters'
      getData={filterTable}
      filters={{ to, from, name, role, status }}
    >
      <Presence
        exit='exit'
        animate='enter'
        variants={reset}
        condition={values}
        presenceProps={{ exitBeforeEnter: true }}
      >
        {name ? (
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
        ) : (
          <></>
        )}

        {role || status ? (
          <div id='row'>
            {role ? (
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
            ) : (
              <></>
            )}

            {status ? (
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
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        <div id='row'>
          {from ? (
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
          ) : (
            <></>
          )}

          {to ? (
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
          ) : (
            <></>
          )}
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
