import React, { useContext, useEffect, useState } from 'react'
import Style, { AddRole, Background, Gear, UserInfo } from './styles'

import Menu from './Menu'

import { getRoleLabel } from 'utils/roles'
import formatterName from 'utils/formatterName'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import useWindowDimensions from 'hooks/useWindowDimensions'

import GearIcon from 'assets/RightMenuOpen/GearIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'

import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'

import { motion, Variants } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

const RightMenu = () => {
  const theme = useContext(ThemeContext)
  const { user, loading } = useSelector<RootState, UserState>(
    ({ user }) => user
  )

  const { innerWidth } = useWindowDimensions()
  const [width, setWidth] = useState(innerWidth)
  const [isOpen, setIsOpen] = useState(false)

  const closedHeight = 112
  const openHeight = 300 + closedHeight

  const motionPath: Variants = {
    closed: {
      d: `M0,0 H${width} V${closedHeight} H0 V0 Z`,
      opacity: innerWidth >= 545 ? 1 : 0.95,
      transition: { type: 'tween', duration: 0.2 }
    },
    open: {
      opacity: 1,
      d: `M0,0 H${width} V${openHeight} H0 V0 Z`,
      transition: { type: 'tween', duration: 0.2 }
    }
  }

  useEffect(() => {
    if (innerWidth <= 300) setWidth(320)
    else innerWidth >= 545 ? setWidth(300) : setWidth(innerWidth)
  }, [innerWidth])

  return (
    <>
      {(isOpen === true || innerWidth >= 545) && (
        <div onMouseLeave={() => setIsOpen(false)}>
          <Background
            isOpen={isOpen}
            openHeight={`${openHeight}px`}
            closedHeight={`${closedHeight}px`}
          >
            <motion.path
              initial={false}
              variants={motionPath}
              animate={isOpen ? 'open' : 'closed'}
            />
          </Background>

          <Style closedHeight={`${closedHeight}px`}>
            {loading ? (
              <div id='dots'>
                <DotsLoader color={theme.colors.secondary} />
              </div>
            ) : (
              <>
                <Avatar size={80} />

                <UserInfo selectedRole={user?.selectedRole}>
                  <span id='userRole'>{getRoleLabel(user?.selectedRole)}</span>

                  <span id='userName'>
                    {formatterName(user?.name, user?.surname)}
                  </span>
                </UserInfo>
              </>
            )}

            {innerWidth >= 545 && (
              <GearIcon onClick={() => setIsOpen(!isOpen)} />
            )}

            <Menu
              width={width}
              condition={isOpen}
              height={openHeight - closedHeight}
            />
          </Style>
        </div>
      )}

      <AddRole condition={user?.selectedRole === 'guest'}>
        <Link to='/session/profile/change-role'>
          <AddRoleIcon /> Adicionar papel
        </Link>
      </AddRole>

      {innerWidth <= 545 && (
        <Gear
          data-cy='RightMenu-gear'
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      )}
    </>
  )
}

export default RightMenu
