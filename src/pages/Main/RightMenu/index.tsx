import React, { useContext, useEffect, useState } from 'react'
import Style, {
  Background,
  Gear,
  RightMenuOpen,
  RoleLi,
  UserInfo
} from './styles'

import selectRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { UserActions, UserState } from 'store/AsyncThunks/user'
// import { ThemeState } from 'store/theme'
import { HomeActions } from 'store/home'

import useWindowDimensions from 'hooks/useWindowDimensions'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'
import GearIcon from 'assets/RightMenuOpen/GearIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import Avatar from 'components/User/Avatar'
import DotsLoader from 'components/DotsLoader'

import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

const motionMenu: Variants = {
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

const motionHr: Variants = {
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

const motionLi: Variants = {
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

const motionLogout: Variants = {
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
  >(state => state.user)

  const [disabledLogout, setDisabledLogout] = useState(false)
  const [changeRole, setChangeRole] = useState(false)
  const { innerWidth } = useWindowDimensions()
  const [width, setWidth] = useState(innerWidth)
  const [isOpen, setIsOpen] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const theme = useContext(ThemeContext)

  const [editOpen, toggleEditOpen] = useCycle(false, true)
  const dispatch = useDispatch()
  const history = useHistory()

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
    setDisabledLogout(true)
    setLogoutLoading(true)

    localStorage.removeItem('@SLab_ac_token')
    await api.get('logout')
    setLogoutLoading(false)

    dispatch(HomeActions.update({ initial: false, page: 'login' }))
    history.push('/home')
  }

  const formatterName = (name: string): string => {
    const fullName = name.split(' ')
    const firstName = fullName[0]
    const secondName = fullName[1]

    if (secondName)
      return firstName.length <= 20
        ? `${firstName} ${secondName.substr(0, 1)}.`
        : `${firstName}...`

    return firstName.length <= 20
      ? `${firstName} ${surname.substr(0, 1)}.`
      : `${firstName}...`
  }

  useEffect(() => {
    if (innerWidth <= 300) setWidth(320)
    else innerWidth >= 545 ? setWidth(300) : setWidth(innerWidth)
  }, [innerWidth, toggleEditOpen])

  return (
    <>
      {(isOpen === true || innerWidth >= 545) && (
        <>
          <Background
            isOpen={editOpen}
            openHeight={`${openHeight}px`}
            closedHeight={`${closedHeight}px`}
          >
            <motion.path
              initial={false}
              variants={motionPath}
              animate={editOpen ? 'open' : 'closed'}
            />
          </Background>

          <Style closedHeight={`${closedHeight}px`}>
            <Avatar size={80} />

            <UserInfo selectedRole={selectedRole} className='UserInfo'>
              {dataLoading ? (
                <DotsLoader color={theme.colors.secondary} />
              ) : (
                <>
                  <span id='userRole'>{selectRoleLabel(selectedRole)}</span>

                  <span id='userName'>{formatterName(name)}</span>

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
              <button
                type='button'
                onClick={() => {
                  setIsOpen(true)
                  toggleEditOpen()
                }}
              >
                <GearIcon />
              </button>
            )}

            <AnimatePresence>
              {editOpen && (
                <RightMenuOpen
                  animate='open'
                  exit='close'
                  width={`${width}px`}
                  variants={motionMenu}
                  changeRole={changeRole}
                  height={`${openHeight - closedHeight}px`}
                >
                  <ul id='openProfile'>
                    <motion.hr variants={motionHr} />

                    <motion.li key='toggleRole' variants={motionLi}>
                      <button
                        type='button'
                        onClick={() => setChangeRole(!changeRole)}
                      >
                        <ChangeIcon />
                        Alternar entre papéis
                      </button>
                    </motion.li>

                    <motion.li key='editProfile' variants={motionLi}>
                      <Link to='/session/profile/edit-profile'>
                        <EditUserIcon /> Editar perfil
                      </Link>
                    </motion.li>

                    <motion.li key='orderNewRole' variants={motionLi}>
                      <Link to='/session/profile/change-role'>
                        <AddRoleIcon /> Solicitar novo papel
                      </Link>
                    </motion.li>

                    <motion.button
                      id='logout'
                      data-cy='button-main-logout'
                      animate='open'
                      type='button'
                      variants={motionLogout}
                      onClick={onLogoutClick}
                      disabled={disabledLogout}
                    >
                      {logoutLoading && (
                        <DotsLoader color={theme.colors.secondary} />
                      )}
                      <span id='leave'>Sair</span>
                      <LogoutIcon />
                    </motion.button>
                  </ul>

                  {dataLoading ? (
                    <></>
                  ) : (
                    changeRole && (
                      <motion.div
                        id='selectRoles'
                        onMouseLeave={() => setChangeRole(false)}
                      >
                        {innerWidth < 545 && (
                          <CloseIcon onClick={() => setChangeRole(false)} />
                        )}

                        <ul>
                          {roles.map(role => (
                            <RoleLi
                              key={role}
                              role={role}
                              onClick={() => {
                                setIsOpen(false)
                                toggleEditOpen()
                              }}
                            >
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
                                {selectRoleLabel(role)}
                              </button>
                            </RoleLi>
                          ))}
                        </ul>
                      </motion.div>
                    )
                  )}
                </RightMenuOpen>
              )}
            </AnimatePresence>

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
            toggleEditOpen()
          }}
        />
      )}
    </>
  )
}

export default RightMenu
