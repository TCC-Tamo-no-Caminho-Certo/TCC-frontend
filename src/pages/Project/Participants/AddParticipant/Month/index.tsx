import React, { useContext, useState } from 'react'
import Style, { Header } from './styles'

import transition from 'utils/transition'

import InterrogationIcon from 'assets/global/InterrogationIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import { Text, Textarea } from 'components/Form'

import { motion, Variants } from 'framer-motion'
import { ThemeContext } from 'styled-components'

interface MonthProps {
  index: number
}

const headerAnimation: Variants = {
  initial: { borderRadius: '16px 16px 16px 16px' },
  rounded: { borderRadius: '16px 16px 16px 16px' },
  unrounded: { borderRadius: '16px 16px 0px 0px' }
}

const buttonAnimation: Variants = {
  initial: { borderRadius: '16px 0px 0px 16px' },
  rounded: { borderRadius: '16px 0px 0px 16px' },
  unrounded: { borderRadius: '16px 0px 0px 0px' }
}

const Month = ({ index }: MonthProps) => {
  const { colors } = useContext(ThemeContext)

  const [showBorder, setShowBorder] = useState(false)
  const [showTask, setShowTask] = useState(false)

  const monthAnimation: Variants = {
    initial: {
      opacity: 0,
      y: ((showTask ? 100 : 52) + 24) * -index
    },
    enter: {
      y: 0,
      opacity: 1,
      transition
    },
    exit: {
      opacity: 0,
      transition,
      y: ((showTask ? 160 : 52) + 24) * -index
    }
  }

  return (
    <Style
      exit='exit'
      animate='enter'
      initial='initial'
      className='Month'
      showTask={showTask}
      showBorder={showBorder}
      variants={monthAnimation}
    >
      <Header
        initial='initial'
        variants={headerAnimation}
        animate={showTask ? 'unrounded' : 'rounded'}
      >
        <motion.button
          type='button'
          initial='initial'
          variants={buttonAnimation}
          onClick={() => setShowTask(!showTask)}
          animate={showTask ? 'unrounded' : 'rounded'}
        >
          <ArrowIcon animate={{ rotate: showTask ? 0 : -90 }} />
          {`${index + 1}° Mês`}
        </motion.button>

        <Text
          maxLength={32}
          placeholder='Título'
          name={`title_${index + 1}`}
          textColors={{
            focused: colors.secondary,
            unfocused: colors.secondary
          }}
        />

        <InterrogationIcon
          onMouseLeave={() => {
            setShowBorder(false)
          }}
          onMouseEnter={() => {
            setShowBorder(true)
            !showTask && setShowTask(true)
          }}
        />
      </Header>

      <motion.div
        id='textareaField'
        initial={{
          height: 0,
          opacity: 0
        }}
        animate={{
          transition,
          y: showTask ? 0 : -45,
          x: showTask ? 0 : -200,
          scale: showTask ? 1 : 0,
          opacity: showTask ? 1 : 1,
          height: showTask ? 'auto' : 0
        }}
      >
        <Textarea
          maxLength={500}
          placeholder='Tarefas'
          name={`task_${index + 1}`}
          textColors={{
            focused: colors.secondary,
            unfocused: colors.secondary
          }}
        />
      </motion.div>
    </Style>
  )
}

export default Month
