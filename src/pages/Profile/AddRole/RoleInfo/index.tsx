import React, { useRef, useState } from 'react'
import Style, { Buttons, Title } from './styles'

import transition from 'utils/transition'
import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import { RootState } from 'store'
import { getUser, UserState } from 'store/Async/user'

import CheckIcon from 'assets/global/CheckIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'
import Popup, { PopupForwardeds } from 'components/Popup'

import { RolesResType, RoleType } from 'types/Responses/user/roles'
import { RequestsResType } from 'types/Responses/user/requests'

import { motion, useCycle, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

interface RoleInfoProps {
  id?: string
  title: string
  color: string
  role: RoleType
  onClick?(): void
  benefits: string[]
  noButton?: boolean
  userRoles?: string[]
  onLabelClick?(): void
}

const item: Variants = {
  initial: { y: '0%', opacity: 0 },
  show: { y: ['-100%', '0%'], opacity: [0, 1], transition },
  hidden: { y: ['0%', '-100%'], opacity: [1, 0], transition }
}

export const content: Variants = {
  initial: { height: 0 },
  hidden: { height: 0, transition },
  show: { height: 'auto', transition }
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
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const popupRef = useRef<PopupForwardeds>(null)

  const [show, toggleShow] = useState(false)
  const [deg, rotate] = useCycle(0, -90)

  const dispatch = useDispatch()

  const haveThisRole = userRoles?.includes(title)

  const onButtonClick = () => {
    onClick !== undefined && onClick()
  }

  const onDeleteButtonClick = () => {
    popupRef.current?.configPopup({
      open: true,
      type: 'warning',
      message: `Tem certeza que deseja excluir o papel: ${getRoleLabel(role)}?`,
      confirmTitle: 'Tenho certeza',
      onOkClick: async () => {
        if (user) {
          const { success }: RolesResType = await api.delete(
            `api/users/roles/${role}`
          )
          const { requests }: RequestsResType = await api.get(
            `api/users/${user?.id}/roles/requests`
          )

          const requestToRemove = requests.find(
            request => request.role === role
          )

          if (requestToRemove)
            await api.delete(`api/users/roles/requests/${requestToRemove?.id}`)

          if (success)
            popupRef.current?.configPopup({
              open: true,
              type: 'success',
              message: 'Papel removido',
              onClick: () => dispatch(getUser({ id: user.id }))
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

  const onTitleClick = () => {
    toggleShow(!show)
    rotate()
    onLabelClick && onLabelClick()
  }

  return (
    <>
      <Style className='RoleInfo' id={id} color={color} title={title}>
        <Title type='button' data-cy={id} onClick={onTitleClick}>
          <ArrowIcon animate={{ rotate: deg, transition }} />

          {title}
        </Title>

        <Presence
          exit='hidden'
          animate='show'
          condition={show}
          initial='initial'
          variants={content}
        >
          <ul>
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                exit='hidden'
                animate='show'
                variants={item}
              >
                <p>
                  <CheckIcon />
                  {benefit}
                </p>
              </motion.li>
            ))}
          </ul>

          {!noButton && (
            <Buttons>
              {!haveThisRole ? (
                <motion.button
                  id='wantBe'
                  type='button'
                  exit='hidden'
                  animate='show'
                  variants={item}
                  onClick={onButtonClick}
                  data-cy='RoleInfo-roleButton'
                >
                  Quero ser {title}!
                </motion.button>
              ) : (
                <>
                  <motion.button
                    disabled
                    exit='hidden'
                    animate='show'
                    id='alreadyAm'
                    variants={item}
                  >
                    Já sou {title}!
                  </motion.button>

                  <motion.button
                    exit='hidden'
                    animate='show'
                    id='deleteRole'
                    variants={item}
                    data-cy='DeleteRole'
                    onClick={onDeleteButtonClick}
                  >
                    Remover papel
                  </motion.button>
                </>
              )}
            </Buttons>
          )}
        </Presence>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default RoleInfo
