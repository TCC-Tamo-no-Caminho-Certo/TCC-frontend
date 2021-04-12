import React, { useContext, useState } from 'react'
import Style from './styles'

import { RequestsContext } from '../'
import { transformArray } from '../Tbody'

import api from 'services/api'

import LoupeIcon from 'assets/Inputs/LoupeIcon'

import { Datepicker, Select, Submit, Text } from 'components/Form'
import Presence from 'components/Presence'

import { motion, Transition, Variants } from 'framer-motion'
import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

interface FiltersProps {
  quantity: number
}

const transition: Transition = {
  duration: 0.3,
  type: 'tween'
}

const reset: Variants = {
  enter: {
    opacity: [0, 1],
    marginTop: [-168, 0],
    // rotate: [240, 0],
    // x: [500, 0],
    // y: [-100, 0],
    transition
  },
  exit: {
    opacity: [1, 0],
    marginTop: [0, -168],
    // rotate: [0, 240],
    // y: [0, -100],
    // x: [0, 500],
    transition
  }
}

const Filters = ({ quantity }: FiltersProps) => {
  const requestsContext = useContext(RequestsContext)
  const theme = useContext(ThemeContext)

  const [values, setValues] = useState<any>(true)

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

  const filterTable = async ({ name, role, status, from, to }: any) => {
    const callStartCondition =
      (!name && !role && !status && !from && !to) ||
      (!name && role === 'all' && status === 'all' && !from && !to) ||
      (!name && role === 'all' && !status && !from && !to) ||
      (!name && !role && status === 'all' && !from && !to)

    console.log(name, role, status, from, to)

    if (callStartCondition) {
      const { requests } = await api.get(
        `user/role/requests?page=1&per_page=${quantity}`
      )

      const tableData = transformArray(requests, requestsContext.roles)

      requestsContext?.setTableState({
        tablePage: 1,
        showData: tableData
      })
    } else {
      const roleId = requestsContext.roles.filter(
        ({ title }) => role === title
      )[0]

      console.log(
        `user/role/requests?page=1&per_page=${quantity}
        ${name ? `&filter[full_name]=${name}` : ''}
        ${roleId ? `&filter[role_id]=${roleId.role_id}` : ''}
        ${status ? `&filter[status]=${status}` : ''}`
      )

      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}${
          name ? `&filter[full_name]=${name}` : ''
        }${roleId ? `&filter[role_id]=${roleId.role_id}` : ''}${
          status ? `&filter[status]=${status}` : ''
        }`
      )

      const { requests } = response

      requestsContext?.setTableState({
        showData: transformArray(requests, requestsContext.roles),
        tablePage: 1
      })
    }
  }

  return (
    <Style getData={filterTable}>
      <Presence
        condition={values}
        variants={reset}
        exit='exit'
        animate='enter'
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
              { label: 'Moderador', value: 'moderator' },
              { label: 'Professor', value: 'professor' },
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
            name='to'
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
