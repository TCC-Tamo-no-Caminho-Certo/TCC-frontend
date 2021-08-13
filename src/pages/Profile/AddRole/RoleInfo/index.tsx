import React, { useRef, useState } from 'react'
import Style from './styles'

import transition from 'utils/transition'
import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import CheckIcon from 'assets/global/CheckIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'
import Popup, { PopupForwardeds } from 'components/Popup'

import { RoleType } from 'types/Responses/user/roles'

import { motion, useCycle, Variants } from 'framer-motion'
import { useSelector } from 'react-redux'

interface RoleInfoProps {
  id: string
  role: RoleType
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
    opacity: 1,
    height: 'auto',
    cursor: 'pointer',
    transition: { ...transition, staggerChildren: 0.05 }
  },
  hidden: {
    height: 0,
    opacity: 0,
    cursor: 'pointer',
    transition: { ...transition, staggerDirection: -1, staggerChildren: 0.1 }
  }
}

const item: Variants = {
  show: { y: ['-100%', '0%'], opacity: [0, 1], transition },
  hidden: { y: ['0%', '-100%'], opacity: [1, 0], transition }
}

const button: Variants = {
  show: { opacity: [0, 1], transition },
  hidden: { opacity: [1, 0], transition }
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
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const popupRef = useRef<PopupForwardeds>(null)

  const [show, toggleShow] = useState(false)
  const [deg, rotate] = useCycle(0, -90)

  const haveThisRole = userRoles?.includes(title)

  const onButtonClick = () => {
    onClick !== undefined && onClick()
  }

  const onDeleteButtonClick = () => {
    popupRef.current?.configPopup({
      open: true,
      type: 'warning',
      message: `Tem certeza que deseja excluir o papel: ${getRoleLabel(role)}`,
      confirmTitle: 'Tenho certeza',
      onOkClick: async () => {
        if (user) {
          const { success } = await api.delete(`users/roles/${role}`)

          if (success)
            popupRef.current?.configPopup({
              open: true,
              type: 'success',
              message: 'Papel removido'
            })
          else
            popupRef.current?.configPopup({
              open: true,
              type: 'error',
              message: 'Algo deu errado :('
            })
        }
      }
    })
  }

  return (
    <>
      <Style className='RoleInfo' id={id} color={color} title={title}>
        <button
          type='button'
          className='title'
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
          exit='hidden'
          animate='show'
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
                    id='deleteRole'
                    variants={button}
                    onClick={onDeleteButtonClick}
                  >
                    Remover papel
                  </motion.button>
                </>
              ))}
          </>
        </Presence>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default RoleInfo
