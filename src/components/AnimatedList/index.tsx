import React, { ReactNode, useEffect, useState } from 'react'
import Style from './styles'

import { motion, Transition, Variants } from 'framer-motion'

interface AnimatedListProps {
  keyItem: string
  condition: boolean
  className?: string
  children?: ReactNode[]
  dataCy?: string
}

const transition: Transition = { duration: 0.3, type: 'tween' }

const ulAnimation: Variants = {
  initial: { y: '-100%' },
  enter: { y: 0, transition },
  exit: { y: '-100%', transition }
}

const AnimatedList = ({
  keyItem,
  children,
  condition,
  className = 'AnimatedList'
}: AnimatedListProps) => {
  const [overflow, setOverflow] = useState('hidden')

  const presenceAnimation: Variants = {
    exit: { opacity: 0, height: 0, transition },
    initial: { opacity: 0, height: 0, transition },
    enter: { opacity: 1, height: 'auto', transition }
  }

  useEffect(() => {
    if (condition) {
      setOverflow('hidden')

      setTimeout(() => {
        setOverflow('visible')
      }, 300)
    } else setOverflow('hidden')
  }, [condition])

  useEffect(() => {
    console.log(overflow)
  }, [overflow])

  return (
    <Style
      style={{ overflow }}
      condition={condition}
      className='AnimatedList'
      variants={presenceAnimation}
    >
      <motion.ul
        exit='exit'
        animate='enter'
        initial='initial'
        className={className}
        variants={ulAnimation}
        data-cy='AnimatedList'
      >
        {children?.map((item, index) => (
          <li key={keyItem + index}>{item}</li>
        ))}
      </motion.ul>
    </Style>
  )
}

export default AnimatedList
