import React from 'react'
import Style from './styles'

import api from 'services/api'

import { Role } from 'store/AsyncThunks/roles'

import CheckIcon from 'assets/global/CheckIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion'

interface RoleInfoProps {
  id: string
  role: Role
  title: string
  color: string
  benefits: string[]
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
  id,
  role,
  title,
  color,
  onClick,
  benefits,
  userRoles,
  onLabelClick,
  noButton = false
}: RoleInfoProps) => {
  const [show, toggleShow] = useCycle<boolean>(false, true)
  const [deg, rotate] = useCycle(0, -90)

  const haveThisRole = userRoles?.includes(title)

  const onButtonClick = () => {
    onClick !== undefined && onClick()
  }

  return (
    <Style className='RoleInfo' id={id} show={show} color={color} title={title}>
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
                <>
                  <motion.button
                    disabled
                    id='roleAlreadyExists'
                    variants={button}
                  >
                    Já sou {title}!
                  </motion.button>

                  <motion.button
                    onClick={async () => {
                      await api.delete(`user/role/${role}`)
                      console.log('papel removido')
                      history.go(0)
                    }}
                    variants={button}
                    id='deleteRole'
                  >
                    Remover papel
                  </motion.button>
                </>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Style>
  )
}

export default RoleInfo
