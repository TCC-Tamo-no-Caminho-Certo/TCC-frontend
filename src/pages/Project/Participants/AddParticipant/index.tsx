import React, { useContext, useRef, useState } from 'react'
import Style, { Body, Header } from './styles'

import Month from './Month'
import { ulAnimation } from '../List'

import transition from 'utils/transition'

import CloseIcon from 'assets/global/CloseIcon'

import Form, { Select, Submit } from 'components/Form'
import Presence from 'components/Presence'
import AvatarAndInfo from 'components/User/AvatarAndInfo'

import { motion, Variants } from 'framer-motion'
import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

const avatarAppear: Variants = {
  initial: {
    height: 0,
    opacity: 0
  },
  enter: {
    transition,
    opacity: 1,
    height: 'auto'
  },
  exit: {
    height: 0,
    transition,
    opacity: 0
  }
}

const getFakeUser = [
  { label: 'Miguel', value: 'student' },
  { label: 'Gabriel', value: 'professor' },
  { label: 'João', value: 'moderator' },
  { label: 'André', value: 'all' }
]

const AddParticipant = () => {
  const theme = useContext(ThemeContext)

  const [inviteNewParticipant, setInviteNewParticipant] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

  const ulRef = useRef<any>()

  const monthsQuantity = 10
  const months = []

  for (let i = 1; i <= monthsQuantity; i++)
    months.push(<Month index={i - 1} key={i} />)

  // const getUsers = async () => {
  //   const users = api.get(`project/${id}`)
  // }

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

  const manipulateForm = (data: any) => {
    const tasks = []

    for (let i = 1; i <= 10; i++)
      tasks.push({
        task: data[`task_${i}`],
        title: data[`title_${i}`]
      })

    return {
      tasks,
      member: data.new_member
    }
  }

  return (
    <Style
      className='AddParticipant'
      animate={{
        transition,
        width: inviteNewParticipant ? '100%' : '100%'
      }}
    >
      <Header
        type='button'
        onClick={() => {
          setShowAvatar(false)
          setInviteNewParticipant(!inviteNewParticipant)
        }}
      >
        <motion.div
          id='closeIcon'
          initial={{ rotate: 45 }}
          animate={{ rotate: inviteNewParticipant ? 0 : -45, transition }}
        >
          <CloseIcon />
        </motion.div>

        {inviteNewParticipant ? 'Cancelar convite' : 'Convidar participante'}
      </Header>

      <Body
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        condition={inviteNewParticipant}
      >
        <Form path='test' manipulateData={manipulateForm}>
          <motion.ul
            exit='exit'
            animate='enter'
            initial='initial'
            ref={ulRef}
            variants={ulAnimation}
          >
            <li>
              <Select
                name='id'
                placeholder='Participante'
                theming={selectTheme}
                styling={selectStyle}
                options={getFakeUser}
                onChange={() => {
                  setShowAvatar(false)
                  setTimeout(() => setShowAvatar(true), 300)
                }}
              />
            </li>

            <Presence
              variants={avatarAppear}
              condition={showAvatar && inviteNewParticipant}
            >
              <AvatarAndInfo role='student' name='Miguel Andrade' />
            </Presence>

            {months.map(month => month)}

            <li>
              <Submit>Enviar convite</Submit>
            </li>
          </motion.ul>
        </Form>
      </Body>
    </Style>
  )
}

export default AddParticipant
