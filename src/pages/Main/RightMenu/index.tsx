/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react'
import Style, { Background, RightMenuOpen, RoleLi, UserInfo } from './styles'

import selectRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { UserActions, UserState } from 'store/user'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'
import GearIcon from 'assets/RightMenuOpen/GearIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'

import Avatar from 'components/User/Avatar'

import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const RightMenu: React.FC = () => {
  const { name, surname, selectedRole, roles } = useSelector<RootState, UserState>(
    state => state.user
  )

  const dispatch = useDispatch()
  const [editOpen, toggleEditProfile] = useCycle(false, true)
  const [changeRole, setChangeRole] = useState(false)
  const history = useHistory()
  const width = 300
  const closedHeight = 112
  const openHeight = 300 + closedHeight

  const onLogoutClick = async () => {
    await api.get('logout')

    localStorage.removeItem('@SLab_ac_token')
    history.push('/home')
  }

  const motionPath: Variants = {
    closed: {
      d: `M0,8 C0,3.5 3.5,0 8,0 H${width} V${closedHeight} H8 C3.5,${closedHeight} 0,${
        closedHeight - 4
      } 0,${closedHeight - 8} V8Z`,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    open: {
      d: `M0,8 C0,3.5 3.5,0 8,0 H${width} V${openHeight} H8 C3.5,${openHeight} 0,${
        openHeight - 4
      } 0,${openHeight - 8} V8Z`,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  const motionMenu: Variants = {
    open: {
      transition: {
        type: 'tween',
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        type: 'tween',
        duration: 0.2,
        staggerChildren: 0,
      },
    },
  }

  const motionHr: Variants = {
    open: {
      opacity: [0, 1],

      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: [1, 0],
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },
  }

  const motionLi: Variants = {
    open: {
      opacity: [0, 1],
      x: [16, 0],
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: [1, 0],
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },
  }

  const motionLogout: Variants = {
    open: {
      opacity: [0, 1],
      y: [-16, 0],
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: [1, 0],
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },
  }

  return (
    <>
      <Background width={`${width}px`} height={`${openHeight}px`}>
        <motion.path initial={false} variants={motionPath} animate={editOpen ? 'open' : 'closed'} />
      </Background>

      <Style width={`${width}px`}>
        <Avatar size={80} />

        <UserInfo selectedRole={selectedRole}>
          <span id='userRole'>{selectRoleLabel(selectedRole)}</span>
          <span id='userName'>{`${name} ${surname}`}</span>

          <span id='userActivity'>
            <svg width='5' height='5' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='2.5' cy='2.5' r='2.5' fill='#00FF66' />
            </svg>
            Online
          </span>
        </UserInfo>

        <button type='button' onClick={() => toggleEditProfile()}>
          <GearIcon />
        </button>

        <AnimatePresence>
          {editOpen && (
            <RightMenuOpen
              onMouseLeave={() => setChangeRole(false)}
              changeRole={changeRole}
              width={`${width}px`}
              height={`${openHeight - closedHeight}px`}
              variants={motionMenu}
              animate='open'
              exit='close'
            >
              {changeRole && (
                <motion.div id='selectRoles'>
                  <ul>
                    {roles.map(role => (
                      <RoleLi key={role} role={role}>
                        <button
                          type='button'
                          onClick={() =>
                            dispatch(UserActions.updateUserInfo({ selectedRole: role }))
                          }
                        >
                          {selectRoleLabel(role)}
                        </button>
                      </RoleLi>
                    ))}
                  </ul>
                </motion.div>
              )}

              <ul id='openProfile'>
                <motion.hr variants={motionHr} />

                <motion.li key='Profiles toggleEditProfile' variants={motionLi}>
                  <button type='button' onClick={() => setChangeRole(!changeRole)}>
                    <ChangeIcon />
                    Alternar entre papéis
                  </button>
                </motion.li>

                <motion.li key='Edit Profile' variants={motionLi}>
                  <Link to='/session/profile/edit-profile'>
                    <EditUserIcon /> Editar perfil
                  </Link>
                </motion.li>

                <motion.li key='Switch Perfil' variants={motionLi}>
                  <Link to='/session/profile/change-role'>
                    <AddRoleIcon /> Solicitar novo papel
                  </Link>
                </motion.li>

                <motion.button
                  type='button'
                  onClick={onLogoutClick}
                  variants={motionLogout}
                  animate='open'
                  id='logout'
                >
                  <span>Sair</span>
                  <LogoutIcon />
                </motion.button>
              </ul>
            </RightMenuOpen>
          )}
        </AnimatePresence>

        {selectedRole === 'guest' && (
          <Link to='/session/profile/change-role' id='baseButton'>
            <AddRoleIcon /> Adicionar papel
          </Link>
        )}
      </Style>
    </>
  )
}

export default RightMenu
