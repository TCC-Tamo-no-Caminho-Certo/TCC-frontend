import React from 'react'
import Style from './styles'

import CheckIcon from 'assets/CheckIcon'
import ArrowIcon from 'assets/ArrowIcon'

import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion'

interface RoleInfoProps {
  title: string
  benefits: string[]
  color: string
  noButton?: boolean
  userRoles?: string[]
  onClick?(): void
  onLabelClick?(): void
}

const container: Variants = {
  show: {
    cursor: 'pointer',
    height: 'auto',
    opacity: 1,
    transition: { staggerChildren: 0.05, type: 'tween', duration: 0.1 }
  },
  hidden: {
    cursor: 'pointer',
    height: 0,
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  }
}

const item: Variants = {
  show: {
    y: ['-100%', '0%'],
    opacity: [0, 1],
    transition: { type: 'tween', duration: 0.2 }
  },
  hidden: {
    y: ['0%', '-100%'],
    opacity: [1, 0],
    transition: { type: 'tween', duration: 0.2 }
  }
}

const button: Variants = {
  show: {
    opacity: [0, 1],
    transition: { type: 'tween', duration: 0.2 }
  },
  hidden: {
    opacity: [1, 0],
    transition: { type: 'tween', duration: 0.2 }
  }
}

const RoleInfo = ({
  title,
  benefits,
  color,
  onClick,
  userRoles,
  noButton = false,
  onLabelClick
}: RoleInfoProps) => {
  const [show, toggleShow] = useCycle<boolean>(false, true)
  const [deg, rotate] = useCycle(0, -90)
  const haveThisRole = userRoles?.includes(title)

  const onButtonClick = () => {
    onClick !== undefined && onClick()

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 1)
  }

  return (
    <Style className='RoleInfo' show={show} color={color} title={title}>
      <button
        id='title'
        type='button'
        onClick={() => {
          toggleShow()
          rotate()
          setTimeout(() => onLabelClick && onLabelClick(), 301)
        }}
      >
        <ArrowIcon
          animate={{
            rotate: deg,
            transition: {
              type: 'tween',
              duration: 0.3
            }
          }}
        />

        <span>{title}</span>
      </button>

      <AnimatePresence>
        {show && (
          <motion.div animate='show' exit='hidden' variants={container}>
            <ul>
              {benefits.map((benefit, index) => (
                <motion.li key={index} variants={item}>
                  <p>
                    <CheckIcon />

                    {benefit}
                  </p>
                </motion.li>
              ))}
            </ul>

            {!noButton &&
              (!haveThisRole ? (
                <motion.button
                  type='button'
                  variants={button}
                  onClick={onButtonClick}
                >
                  Quero ser {title}!
                </motion.button>
              ) : (
                <motion.button
                  disabled
                  id='roleAlreadyExists'
                  variants={button}
                >
                  Já sou {title}!
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Style>
  )
}

export default RoleInfo
