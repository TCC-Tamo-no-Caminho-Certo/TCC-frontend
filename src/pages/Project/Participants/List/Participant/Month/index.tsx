import React, { Dispatch, forwardRef, SetStateAction, useState } from 'react'
import Style from './styles'

import transition from 'utils/transition'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

interface MonthProps {
  id: number
  size: number
  index: number
  task: { task: string; title: string }
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const taskAnimation: Variants = {
  initial: { y: -12, opacity: 0, height: 0 },
  exit: { y: -12, opacity: 0, height: 0, transition },
  enter: { y: 0, opacity: 1, height: 'auto', transition }
}

const buttonAnimation: Variants = {
  initial: { borderRadius: '24px 24px 24px 24px' },
  unrounded: {
    transition,
    borderRadius: '24px 24px 0px 0px'
  },
  rounded: {
    borderRadius: '24px 24px 24px 24px',
    transition: { ...transition, delay: 0.2 }
  }
}

const Month = forwardRef<any, MonthProps>(
  ({ task, index, size, id, selecteds, setSelecteds }, ref) => {
    const [disabledButton, setDisabledButton] = useState(false)

    const monthId = `${id}-${index}`
    const isSelected =
      selecteds?.find(selected => selected === monthId) !== undefined

    const monthAnimation: Variants = {
      enter: { opacity: 1, y: 0, transition },
      initial: { opacity: 0, y: -index * (size + 16) },
      exit: { opacity: 0, y: -index * (size + 16), transition }
    }

    const onMonthClick = () => {
      setDisabledButton(true)

      if (setSelecteds)
        setSelecteds(prev => {
          if (isSelected) return prev?.filter(selected => selected !== monthId)
          return prev ? [...prev, monthId] : [monthId]
        })

      setTimeout(() => setDisabledButton(false), 400)
    }

    return (
      <Style
        exit='exit'
        animate='enter'
        initial='initial'
        className='Month'
        ref={ref as any}
        variants={monthAnimation}
      >
        <motion.button
          initial='initial'
          onClick={onMonthClick}
          disabled={disabledButton}
          variants={buttonAnimation}
          animate={isSelected ? 'unrounded' : 'rounded'}
        >
          <div>{`${index + 1}° Mês`}</div>
          <div>{task.title}</div>
        </motion.button>

        <Presence variants={taskAnimation} condition={isSelected}>
          <p>{task.task}</p>
        </Presence>
      </Style>
    )
  }
)

export default Month
