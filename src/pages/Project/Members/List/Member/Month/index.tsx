import React, { forwardRef, useContext, useEffect, useState } from 'react'
import Style from './styles'

import { ListContext } from '../../../List'

import Presence from 'components/Presence'

import { motion, Transition, Variants } from 'framer-motion'

interface MonthProps {
  id: number
  work: string
  size: number
  index: number
}

const transition: Transition = { type: 'tween', duration: 0.3 }

const workAppear: Variants = {
  initial: {
    y: -24,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition
  },
  exit: {
    y: -24,
    opacity: 0,
    transition
  }
}

const Month = forwardRef<any, MonthProps>(({ work, index, size, id }, ref) => {
  const { month } = useContext(ListContext)

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
      y: (size + 24) * -index,
      transition
    }
  }

  const onMonthClick = () => {
    setDisabledButton(true)
    setTimeout(() => setDisabledButton(false), 600)

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
      <Style layout ref={ref as any} initial={{ borderRadius: 8 }}>
        <motion.button
          id='month'
          layout='position'
          onClick={onMonthClick}
          disabled={disabledButton}
        >
          {`${index + 1}° Mês`}
        </motion.button>

        <Presence
          variants={workAppear}
          condition={
            selectedMonths?.find(selectedMonth => selectedMonth === monthId) !==
            undefined
          }
        >
          <motion.p layout='position'>{work}</motion.p>
        </Presence>
      </Style>
    </motion.li>
  )
})

export default Month
