import React, { useContext, useState } from 'react'
import Style, { Header } from './styles'

import transition from 'utils/transition'

import InterrogationIcon from 'assets/global/InterrogationIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

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

const textareaAnimation: Variants = {
  initial: { height: 0, scale: 0, opacity: 0 },
  hide: { y: -45, height: 0, scale: 0, opacity: 1, transition },
  show: { transition, y: 0, scale: 1, opacity: 1, height: 'auto' }
}

const Month = ({ index }: MonthProps) => {
  const { colors } = useContext(ThemeContext)

  const [showBorder, setShowBorder] = useState(false)
  const [showTask, setShowTask] = useState(false)

  const month = index + 1

  return (
    <Style className='Month' showTask={showTask} showBorder={showBorder}>
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
          <ArrowIcon
            initial='initialRight'
            variants={arrowAnimation}
            animate={showTask ? 'bottom' : 'right'}
          />

          {`${month}° Mês`}
        </motion.button>

        <Text
          maxLength={32}
          placeholder='Título'
          name={`title_${month}`}
          textColors={{
            focused: colors.secondary,
            unfocused: colors.secondary
          }}
        />

        <InterrogationIcon
          onMouseLeave={() => setShowBorder(false)}
          onMouseEnter={() => {
            setShowBorder(true)
            !showTask && setShowTask(true)
          }}
        />
      </Header>

      <Textarea
        maxLength={500}
        placeholder='Tarefas'
        name={`task_${month}`}
        textColors={{
          focused: colors.secondary,
          unfocused: colors.secondary
        }}
        containerProps={{
          initial: 'initial',
          variants: textareaAnimation,
          animate: showTask ? 'show' : 'hide'
        }}
      />
    </Style>
  )
}

export default Month
