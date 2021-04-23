import React, { useEffect, useState } from 'react'
import Style from './styles'

import api from 'services/api'

import { Role } from 'store/AsyncThunks/roles'

import CheckIcon from 'assets/global/CheckIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion, useCycle, Variants } from 'framer-motion'

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
    transition: {
      type: 'tween',
      duration: 0.2,
      staggerChildren: 0.05
    }
  },
  hidden: {
    cursor: 'pointer',
    height: 0,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      staggerChildren: 0.1,
      staggerDirection: -1
    }
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
  const [show, toggleShow] = useState(false)
  const [deg, rotate] = useCycle(0, -90)

  const haveThisRole = userRoles?.includes(title)

  const onButtonClick = () => {
    onClick !== undefined && onClick()
  }

  useEffect(() => {
    console.log('tst', show)
  }, [show])

  return (
    <Style className='RoleInfo' id={id} color={color} title={title}>
      <button
        className='title'
        type='button'
        onClick={() => {
          toggleShow(!show)
          rotate()
          onLabelClick && onLabelClick()
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

        {title}
      </button>

      <Presence
        animate='show'
        exit='hidden'
        condition={show}
        variants={container}
      >
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

        <>
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
                    history.go(0)
                  }}
                  variants={button}
                  id='deleteRole'
                >
                  Remover papel
                </motion.button>
              </>
            ))}
        </>
      </Presence>
    </Style>
  )
}

export default RoleInfo
