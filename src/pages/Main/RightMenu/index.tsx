import React, { useEffect, useState } from 'react'
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
import { UserActions, UserState } from 'store/user'
import { ThemeState } from 'store/theme'

import useWindowDimensions from 'hooks/useWindowDimensions'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'
import GearIcon from 'assets/RightMenuOpen/GearIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'

import Avatar from 'components/User/Avatar'

import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

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
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()
  const { innerWidth } = useWindowDimensions()
  const [width, setWidth] = useState(innerWidth)
  const [editOpen, toggleEditProfile] = useCycle(false, true)
  const [isOpen, setIsOpen] = useState(false)
  const [changeRole, setChangeRole] = useState(false)
  const { name, surname, selectedRole, roles } = useSelector<
    RootState,
    UserState
  >(state => state.user)

  const closedHeight = 112
  const openHeight = 300 + closedHeight

  useEffect(() => {
    ;(async () => {
      await toggleEditProfile()
      toggleEditProfile()
    })()

    if (innerWidth <= 300) setWidth(320)
    else innerWidth >= 545 ? setWidth(300) : setWidth(innerWidth)

    // eslint-disable-next-line
  }, [innerWidth])

  const onLogoutClick = async () => {
    await api.get('logout', {})
    localStorage.removeItem('@SLab_ac_token')
    history.push('/home')
  }

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
              <span id='userRole'>{selectRoleLabel(selectedRole)}</span>

              <span id='userName'>{`${name} ${surname}`}</span>

              <span id='userActivity'>
                <svg width='5' height='5' xmlns='http://www.w3.org/2000/svg'>
                  <circle cx='2.5' cy='2.5' r='2.5' fill={theme.colors.green} />
                </svg>
                Online
              </span>
            </UserInfo>

            {innerWidth >= 545 && (
              <button type='button' onClick={() => toggleEditProfile()}>
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
                  onMouseLeave={() => setChangeRole(false)}
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
                      animate='open'
                      type='button'
                      variants={motionLogout}
                      onClick={onLogoutClick}
                    >
                      <span>Sair</span>
                      <LogoutIcon />
                    </motion.button>
                  </ul>

                  {changeRole && (
                    <motion.div id='selectRoles'>
                      <ul>
                        {roles.map(role => (
                          <RoleLi key={role} role={role}>
                            <button
                              type='button'
                              onClick={() =>
                                dispatch(
                                  UserActions.updateUserInfo({
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
            toggleEditProfile()
          }}
        />
      )}
    </>
  )
}

export default RightMenu
