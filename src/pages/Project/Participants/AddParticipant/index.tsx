import React, { useContext, useEffect, useState } from 'react'
import Style, { Body, Header } from './styles'

import Month from './Month'

import transition from 'utils/transition'

import useWindowDimensions from 'hooks/useWindowDimensions'

import CloseIcon from 'assets/global/CloseIcon'

import Form, { Select, Submit } from 'components/Form'
import Presence from 'components/Presence'
import AvatarAndInfo from 'components/User/AvatarAndInfo'

import { motion, Variants } from 'framer-motion'
import { lighten } from 'polished'
import { Theme } from 'react-select'
import { ThemeContext } from 'styled-components'

const getFakeUser = [
  { label: 'Miguel', value: 'student' },
  { label: 'Gabriel', value: 'professor' },
  { label: 'João', value: 'moderator' },
  { label: 'André', value: 'all' }
]

const avatarAppear: Variants = {
  initial: { height: 0, opacity: 0 },
  exit: { height: 0, transition, opacity: 0 },
  enter: { transition, opacity: 1, height: 'auto' }
}

export const bodyAnimation: Variants = {
  initial: { height: 0 },
  exit: { height: 0, transition },
  enter: { height: 'auto', transition }
}

export const headerAnimation: Variants = {
  initial: { paddingBottom: 0 },
  noPadding: { transition, paddingBottom: 0 },
  padding: { transition, paddingBottom: 160 }
}

const AddParticipant = () => {
  const theme = useContext(ThemeContext)

  const { innerWidth } = useWindowDimensions()

  const [isLarge, setisLarge] = useState(innerWidth >= 750)
  const [showInvite, setShowInvite] = useState(false)
  const [showAvatar, setShowAvatar] = useState(false)

  const monthsQuantity = 10
  const months = []

  // const getUsers = async () => {
  //   const users = api.get(`project/${id}`)
  // }

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

  const onHeaderClick = () => {
    if (showInvite) {
      setShowAvatar(false)
      setTimeout(() => setShowInvite(false), 300)
    } else setShowInvite(true)
  }

  useEffect(() => {
    setisLarge(innerWidth >= 750)
  }, [innerWidth])

  const AddParticipantAnimation: Variants = {
    initial: { width: 250 },
    fullInitial: { width: '100%' },
    open: { width: 250, transition },
    fullOpen: { width: '100%', transition }
  }

  return (
    <Style
      className='AddParticipant'
      variants={AddParticipantAnimation}
      initial={isLarge ? 'initial' : 'fullInitial'}
      animate={isLarge && !showInvite ? 'open' : 'fullOpen'}
      style={{ padding: showInvite ? '16px' : '16px 16px 0px 16px' }}
    >
      <Header onClick={onHeaderClick}>
        <motion.div
          initial={{ rotate: 45 }}
          animate={{ rotate: showInvite ? 0 : -45, transition }}
        >
          <CloseIcon />
        </motion.div>

        <div id='label'>
          {showInvite ? 'Cancelar convite' : 'Convidar participante'}
        </div>
      </Header>

      <Body
        exit='exit'
        animate='enter'
        initial='initial'
        condition={showInvite}
        variants={bodyAnimation}
      >
        <Form path='test' manipulateData={manipulateForm}>
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

          <Presence
            variants={avatarAppear}
            condition={showAvatar && showInvite}
          >
            <AvatarAndInfo role='student' name='Miguel Andrade' />
          </Presence>

          <ul>{months.map(month => month)}</ul>

          <Submit>Enviar convite</Submit>
        </Form>
      </Body>
    </Style>
  )
}

export default AddParticipant
