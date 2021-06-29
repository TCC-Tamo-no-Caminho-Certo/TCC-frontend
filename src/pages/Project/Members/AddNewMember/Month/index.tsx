import React, { useContext, useState } from 'react'
import Style from './styles'

import InterrogationIcon from 'assets/global/InterrogationIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import { Text, Textarea } from 'components/Form'

import { motion, Transition, Variants } from 'framer-motion'
import { ThemeContext } from 'styled-components'

interface MonthProps {
  index: number
}

const transition: Transition = {
  type: 'tween',
  duration: 0.3
}

const Month = ({ index }: MonthProps) => {
  const theme = useContext(ThemeContext)

  const [showBorder, setShowBorder] = useState(false)
  const [showTask, setShowTask] = useState(false)

  const monthAppear: Variants = {
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
      y: ((showTask ? 160 : 52) + 24) * -index,
      transition
    }
  }

  return (
    <Style
      exit='exit'
      animate='enter'
      initial='initial'
      className='month'
      showTask={showTask}
      variants={monthAppear}
      showBorder={showBorder}
    >
      <div className='title'>
        <button
          type='button'
          onClick={() => {
            setShowTask(!showTask)
          }}
        >
          <ArrowIcon
            animate={{
              rotate: showTask ? 0 : -90
            }}
          />
          {`${index + 1}° Mês`}
        </button>

        <div id='text'>
          <Text
            name={`title_${index + 1}`}
            placeholder='Título'
            textColors={{
              focused: theme.colors.secondary,
              unfocused: theme.colors.secondary
            }}
          />
        </div>

        <div
          onMouseEnter={() => {
            setShowBorder(true)
            !showTask && setShowTask(true)
          }}
          onMouseLeave={() => {
            setShowBorder(false)
          }}
        >
          <InterrogationIcon />
        </div>
      </div>

      <motion.div
        id='textareaField'
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: showTask ? 1 : 1,
          y: showTask ? 0 : -45,
          x: showTask ? 0 : -200,
          height: showTask ? 'auto' : 0,
          scale: showTask ? 1 : 0,
          transition: {
            type: 'tween',
            duration: 0.3
          }
        }}
      >
        <Textarea
          name={`task_${index + 1}`}
          placeholder='Tarefas'
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />
      </motion.div>
    </Style>
  )
}

export default Month
