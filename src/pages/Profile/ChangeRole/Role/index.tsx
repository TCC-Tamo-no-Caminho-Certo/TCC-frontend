/* eslint-disable react/no-array-index-key */
import React from 'react'
import Style from './styles'

import CheckIcon from 'assets/CheckIcon'
import ArrowIcon from 'assets/ArrowIcon'

import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { useHistory } from 'react-router-dom'

interface RoleProps {
  title: string
  benefits: string[]
  color: string
  path?: string
  onClick?(): void
  noButton?: boolean
}

const Role: React.FC<RoleProps> = ({
  title,
  benefits,
  color,
  onClick,
  noButton = false,
  path = 'invalid-path',
}) => {
  const [show, toggleShow] = useCycle<boolean>(true, false)
  const [deg, rotate] = useCycle(0, -90)

  const history = useHistory()

  const container = {
    show: {
      cursor: 'pointer',
      height: 320,
      opacity: 1,
      transition: { staggerChildren: 0.05, type: 'tween', duration: 0.1 },
    },
    hidden: {
      cursor: 'pointer',
      height: 0,
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  }

  const item = {
    show: {
      y: ['-100%', '0%'],
      opacity: [0, 1],
      transition: { type: 'tween', duration: 0.2 },
    },
    hidden: {
      y: ['0%', '-100%'],
      opacity: [1, 0],
      transition: { type: 'tween', duration: 0.2 },
    },
  }

  const button = {
    show: {
      opacity: [0, 1],
      transition: { type: 'tween', duration: 0.2 },
    },
    hidden: {
      opacity: [1, 0],
      transition: { type: 'tween', duration: 0.2 },
    },
  }

  function onButtonClick(pushPath: string) {
    onClick === undefined || onClick()
    history.push(pushPath)
  }

  return (
    <Style show={show} color={color} title={title} className='Role'>
      <button
        id='title'
        type='button'
        onClick={() => {
          toggleShow()
          rotate()
        }}
      >
        <ArrowIcon
          animate={{
            rotate: deg,
            transition: {
              type: 'tween',
              duration: 0.3,
            },
          }}
        />

        <span>{title}</span>
      </button>

      <AnimatePresence>
        {show && (
          <motion.div variants={container} animate='show' exit='hidden'>
            <ul>
              {benefits.map((benefit, index) => (
                <motion.li key={index} variants={item}>
                  <CheckIcon />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {!noButton && (
              <motion.button type='button' variants={button} onClick={() => onButtonClick(path)}>
                Sou {title}!
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Style>
  )
}

export default Role
