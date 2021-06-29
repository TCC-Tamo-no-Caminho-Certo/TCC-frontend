import React, { useContext, useEffect, useState } from 'react'
import Style, {
  Background,
  Gear,
  RightMenuOpen,
  RoleLi,
  SelectRoles,
  UserInfo
} from './styles'

import { getRoleLabel } from 'utils/roles'
import formatterName from 'utils/formatterName'

import api from 'services/api'

import { RootState } from 'store'
import { UserActions, UserState } from 'store/Async/user'
// import { ThemeState } from 'store/theme'
import { HomeActions } from 'store/Sync/home'
import { getValidation } from 'store/Async/validation'

import useWindowDimensions from 'hooks/useWindowDimensions'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'
import GearIcon from 'assets/RightMenuOpen/GearIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'
import CloseIcon from 'assets/global/CloseIcon'

import Presence from 'components/Presence'
import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'

import { motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

const menu: Variants = {
  open: {
    transition: {
      type: 'tween',
      duration: 0.2,
      staggerChildren: 0.1
    }
  },
  closed: {
    transition: {
      type: 'tween',
      duration: 0.2,
      staggerChildren: 0
    }
  }
}

const hr: Variants = {
  open: {
    opacity: [0, 1],
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  closed: {
    opacity: [1, 0],
    transition: {
      type: 'tween',
      duration: 0.1
    }
  }
}

const li: Variants = {
  open: {
    opacity: [0, 1],
    x: [16, 0],
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  closed: {
    opacity: [1, 0],
    transition: {
      type: 'tween',
      duration: 0.1
    }
  }
}

const logout: Variants = {
  open: {
    opacity: [0, 1],
    y: [-16, 0],
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  closed: {
    opacity: [1, 0],
    transition: {
      type: 'tween',
      duration: 0.1
    }
  }
}

const RightMenu = () => {
  const { name, selectedRole, roles, surname, dataLoading } = useSelector<
    RootState,
    UserState
  >(({ user }) => user)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [changeRole, setChangeRole] = useState(false)
  const { innerWidth } = useWindowDimensions()
  const [width, setWidth] = useState(innerWidth)
  const [isOpen, setIsOpen] = useState(false)

  const theme = useContext(ThemeContext)
  const dispatch = useDispatch()

  const closedHeight = 112
  const openHeight = 300 + closedHeight

  const motionPath: Variants = {
    closed: {
      d: `M0,0 H${width} V${closedHeight} H0 V0 Z`,
      opacity: innerWidth >= 545 ? 1 : 0.95,
      transition: {
        type: 'tween',
        duration: 0.2
      }
    },
    open: {
      d: `M0,0 H${width} V${openHeight} H0 V0 Z`,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.2
      }
    }
  }

  const onLogoutClick = async () => {
    setLogoutLoading(true)
    await api.get('logout')

    localStorage.removeItem('@SLab_ac_token')

    dispatch(UserActions.reset())
    dispatch(getValidation())
    dispatch(HomeActions.update({ initial: false, page: 'login' }))
  }

  useEffect(() => {
    if (innerWidth <= 300) setWidth(320)
    else innerWidth >= 545 ? setWidth(300) : setWidth(innerWidth)
  }, [innerWidth])

  return (
    <>
      {(isOpen === true || innerWidth >= 545) && (
        <>
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

          <Style
            closedHeight={`${closedHeight}px`}
            onMouseLeave={() => setIsOpen(false)}
          >
            <Avatar size={80} />

            <UserInfo className='UserInfo' selectedRole={selectedRole}>
              {dataLoading ? (
                <DotsLoader color={theme.colors.secondary} />
              ) : (
                <>
                  <span id='userRole'>{getRoleLabel(selectedRole)}</span>

                  <span id='userName'>{formatterName(name, surname)}</span>

                  {/* ~
                    <span id='userActivity'>
                      <svg width='5' height='5' xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='2.5' cy='2.5' r='2.5' fill={theme.colors.green} />
                      </svg>
                      Online
                    </span>
                  */}
                </>
              )}
            </UserInfo>

            {innerWidth >= 545 && (
              <GearIcon onClick={() => setIsOpen(!isOpen)} />
            )}

            <Presence condition={isOpen}>
              <>
                {changeRole && (
                  <SelectRoles onMouseLeave={() => setChangeRole(false)}>
                    {innerWidth < 545 && (
                      <CloseIcon onClick={() => setChangeRole(false)} />
                    )}

                    <ul>
                      {roles.map(role => (
                        <RoleLi key={role} role={role}>
                          <button
                            type='button'
                            onClick={() =>
                              dispatch(
                                UserActions.update({
                                  selectedRole: role
                                })
                              )
                            }
                          >
                            {getRoleLabel(role)}
                          </button>
                        </RoleLi>
                      ))}
                    </ul>
                  </SelectRoles>
                )}
              </>

              <RightMenuOpen
                exit='close'
                animate='open'
                variants={menu}
                width={`${width}px`}
                changeRole={changeRole}
                height={`${openHeight - closedHeight}px`}
              >
                <motion.hr variants={hr} />

                <motion.li key='toggleRole' variants={li}>
                  <button
                    type='button'
                    onClick={() => setChangeRole(!changeRole)}
                  >
                    <ChangeIcon />
                    Alternar entre papéis
                  </button>
                </motion.li>

                <motion.li key='editProfile' variants={li}>
                  <Link to='/session/profile/edit-profile'>
                    <EditUserIcon /> Editar perfil
                  </Link>
                </motion.li>

                <motion.li key='orderNewRole' variants={li}>
                  <Link to='/session/profile/change-role'>
                    <AddRoleIcon /> Solicitar novo papel
                  </Link>
                </motion.li>

                <motion.button
                  id='logout'
                  type='button'
                  animate='open'
                  data-cy='button-main-logout'
                  variants={logout}
                  onClick={onLogoutClick}
                  disabled={logoutLoading}
                >
                  {logoutLoading && (
                    <DotsLoader color={theme.colors.secondary} />
                  )}

                  <span id='leave'>Sair</span>

                  <LogoutIcon />
                </motion.button>
              </RightMenuOpen>
            </Presence>

            {selectedRole === 'guest' && (
              <Link id='baseButton' to='/session/profile/change-role'>
                <AddRoleIcon /> Adicionar papel
              </Link>
            )}
          </Style>
        </>
      )}

      {innerWidth <= 545 && (
        <Gear
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      )}
    </>
  )
}

export default RightMenu
