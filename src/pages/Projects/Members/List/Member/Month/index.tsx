import React, { forwardRef, useContext, useEffect } from 'react'
import Style from './styles'

import { ListContext } from '../../../List'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

interface MonthProps {
  id: number
  work: string
  size: number
  index: number
}

const Month = forwardRef<any, MonthProps>(({ work, index, size, id }, ref) => {
  const { showCondition, month } = useContext(ListContext)

  const { setSelectedMonths, selectedMonths } = month

  const monthId = `${id}-${index}`

  useEffect(() => {
    if (!showCondition) setSelectedMonths && setSelectedMonths([])
  }, [showCondition, setSelectedMonths])

  return (
    <Style
      ref={ref as any}
      onClick={() => {
        setSelectedMonths &&
          setSelectedMonths(prev => {
            if (prev?.find(curr => curr === monthId) !== undefined)
              return prev?.filter(curr => curr !== monthId)
            return prev ? [...prev, monthId] : [monthId]
          })
      }}
    >
      <motion.div id='month'>{`${index + 1}° Mês`}</motion.div>

      <Presence
        condition={selectedMonths?.find(curr => curr === monthId) !== undefined}
      >
        <motion.p>{work}</motion.p>
      </Presence>
    </Style>
  )
})

export default Month
