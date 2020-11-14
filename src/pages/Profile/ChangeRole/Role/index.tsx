import React from 'react'
import Style from './styles'

import CheckIcon from 'assets/CheckIcon'
import ArrowIcon from 'assets/ArrowIcon'

import { AnimatePresence, motion, useCycle } from 'framer-motion'

interface RoleProps {
  title: string
  titleColor?: string
  benefits: string[]
  color: string
  noButton?: boolean
}

const Role: React.FC<RoleProps> = ({
  title,
  benefits,
  color,
  titleColor = color,
  noButton = false,
}) => {
  const [show, toggleShow] = useCycle<boolean>(false, true)
  const [deg, rotate] = useCycle(-90, 0)

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
      transition: { duration: 0.02 },
    },
  }

  return (
    <Style show={show} color={color} titleColor={titleColor} className='Role'>
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
              {benefits.map(benefit => (
                <motion.li variants={item}>
                  <CheckIcon />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {!noButton && (
              <motion.button type='button' variants={item}>
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
