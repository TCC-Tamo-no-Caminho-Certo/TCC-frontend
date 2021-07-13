import React, { forwardRef, useContext, useEffect, useState } from 'react'
import Style from './styles'

import { ListContext } from '../../../List'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

interface MonthProps {
  id: number
  size: number
  index: number
  task: {
    task: string
    title: string
  }
}

const Month = forwardRef<any, MonthProps>(({ task, index, size, id }, ref) => {
  const { month, transition } = useContext(ListContext)
  const [disabledButton, setDisabledButton] = useState(false)

  const { setSelectedMonths, selectedMonths } = month

  const monthId = `${id}-${index}`

  const monthAppear: Variants = {
    initial: {
      opacity: 0,
      y: (size + 24) * -index
    },
    enter: {
      y: 0,
      opacity: 1,
      transition
    },
    exit: {
      opacity: 0,
      transition
    }
  }

  const workAppear: Variants = {
    initial: {
      y: -12,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0.1 }
    },
    exit: {
      y: -12,
      opacity: 0,
      transition
    }
  }

  const onMonthClick = () => {
    setDisabledButton(true)
    setTimeout(() => setDisabledButton(false), 300)

    if (setSelectedMonths)
      setSelectedMonths(prev => {
        if (
          prev?.find(selectedMonth => selectedMonth === monthId) !== undefined
        )
          return prev?.filter(selectedMonth => selectedMonth !== monthId)
        return prev ? [...prev, monthId] : [monthId]
      })
  }

  useEffect(() => {
    return () => {
      setDisabledButton(false)
    }
  }, [])

  return (
    <motion.li
      exit='exit'
      animate='enter'
      initial='initial'
      className='Month'
      variants={monthAppear}
    >
      <Style layout ref={ref as any} transition={transition}>
        <motion.button
          id='month'
          layout='position'
          onClick={onMonthClick}
          disabled={disabledButton}
          transition={transition}
        >
          <div>{`${index + 1}° Mês`}</div>
          <div>{task.title}</div>
        </motion.button>

        <Presence
          variants={workAppear}
          condition={
            selectedMonths?.find(selectedMonth => selectedMonth === monthId) !==
            undefined
          }
        >
          <motion.p layout='position' transition={transition}>
            {task.task}
          </motion.p>
        </Presence>
      </Style>
    </motion.li>
  )
})

export default Month
