import React, { useContext, useState } from 'react'
import Style from './styles'

import Month from './Month'

import CloseIcon from 'assets/global/CloseIcon'

import Form, { Select, Submit } from 'components/Form'
import Presence from 'components/Presence'
import AvatarAndInfo from 'components/User/AvatarAndInfo'

import { motion } from 'framer-motion'
import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

const AddNewMember = () => {
  const theme = useContext(ThemeContext)

  const [inviteNewMember, setInviteNewMember] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

  const monthsQuantity = 10
  const months = []

  for (let i = 1; i <= monthsQuantity; i++)
    months.push(<Month index={i - 1} key={i} />)

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
      primary: theme.colors.tertiary,
      dangerLight: lighten(0.5, theme.colors.red),
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

  const avatarAppear = {
    initial: {
      x: -320,
      opacity: 0
    },
    enter: {
      x: 0,
      opacity: 1,
      transition: { type: 'tween', duration: 0.3 }
    },
    exit: {
      x: 320,
      opacity: 0,
      transition: { type: 'tween', duration: 0.3 }
    }
  }

  return (
    <Style
      id='newMember'
      animate={{
        width: inviteNewMember ? '100%' : 250,
        transition: { type: 'tween', duration: 0.3 }
      }}
    >
      <button
        type='button'
        onClick={() => setInviteNewMember(!inviteNewMember)}
      >
        <motion.div
          id='closeIcon'
          initial={{ rotate: 45 }}
          transition={{ type: 'tween', duration: 0.3 }}
          animate={{ rotate: inviteNewMember ? 0 : 45 }}
        >
          <CloseIcon />
        </motion.div>

        <div id='invite' onClick={() => setShowAvatar(false)}>
          {inviteNewMember ? 'Cancelar convite' : 'Convidar participante'}
        </div>
      </button>

      <Presence id='body' condition={inviteNewMember}>
        <Form
          path='test'
          manipulateData={data => {
            const tasks = []

            for (let i = 1; i <= 10; i++)
              tasks.push({
                title: data[`title_${i}`],
                task: data[`task_${i}`]
              })

            return {
              member: data.new_member,
              tasks
            }
          }}
        >
          <Select
            name='id'
            placeholder='Participante'
            theming={selectTheme}
            styling={selectStyle}
            onChange={() => {
              setShowAvatar(false)
              setTimeout(() => setShowAvatar(true), 300)
            }}
            options={[
              { label: 'Miguel', value: 'student' },
              { label: 'Gabriel', value: 'professor' },
              { label: 'João', value: 'moderator' },
              { label: 'André', value: 'all' }
            ]}
          />

          <Presence condition={showAvatar} variants={avatarAppear}>
            <AvatarAndInfo name='Miguel Andrade' role='student' />
          </Presence>

          {months.map(month => month)}

          <Submit>Enviar convite</Submit>
        </Form>
      </Presence>
    </Style>
  )
}

export default AddNewMember
