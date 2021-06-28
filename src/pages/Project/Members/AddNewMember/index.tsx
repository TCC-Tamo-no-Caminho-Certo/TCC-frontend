import React, { useContext, useState } from 'react'
import Style from './styles'

import AddButtonIcon from 'assets/global/AddButtonIcon'

import Form, { Select, Text, Textarea } from 'components/Form'
import Presence from 'components/Presence'

import { AnimateSharedLayout, motion } from 'framer-motion'
import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

const AddNewMember = () => {
  const [inviteNewMember, setInviteNewMember] = useState(false)
  const theme = useContext(ThemeContext)

  const monthsQuantity = 10
  const months = []

  for (let i = 1; i <= monthsQuantity; i++)
    months.push(
      <AnimateSharedLayout>
        <motion.div layout className='month' key={i}>
          <div className='title'>
            {`${i}° Mês`}
            <Text
              name={`title_${i}`}
              placeholder='Título'
              textColors={{
                focused: theme.colors.primary,
                unfocused: theme.colors.secondary
              }}
            />
          </div>

          <Textarea
            name={`task_${i}`}
            placeholder='Tarefas'
            textColors={{
              focused: theme.colors.primary,
              unfocused: theme.colors.secondary
            }}
          />
        </motion.div>
      </AnimateSharedLayout>
    )

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

  return (
    <Style
      id='newMember'
      animate={{
        width: inviteNewMember ? '100%' : 250,
        transition: { type: 'tween', duration: 0.3 }
      }}
      showBorder={true}
    >
      <Presence condition={!inviteNewMember}>
        <button onClick={() => setInviteNewMember(!inviteNewMember)}>
          <AddButtonIcon />

          <span>Convidar participante</span>
        </button>
      </Presence>

      <Presence id='body' condition={inviteNewMember}>
        <Form>
          <Select
            name='new_member'
            placeholder='Participante'
            theming={selectTheme}
            styling={selectStyle}
            options={[
              { label: 'Miguel', value: 'student' },
              { label: 'Gabriel', value: 'professor' },
              { label: 'João', value: 'moderator' },
              { label: 'André', value: 'all' }
            ]}
          />

          {months.map(month => month)}
        </Form>
      </Presence>
    </Style>
  )
}

export default AddNewMember
