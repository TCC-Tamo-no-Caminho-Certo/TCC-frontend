import React from 'react'
import Style, { Background, RightMenuOpen, UserInfo } from './styles'

import api from 'services/api'

import selectRoleLabel from "utils/selectRoleLabel"
import { RootState, ThemeState, UserState, useSelector } from 'store'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'
import GearIcon from 'assets/RightMenuOpen/GearIcon'
import ProfilesToggle from 'assets/RightMenuOpen/ProfilesToggle'

import Avatar from 'components/User/Avatar'

import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { Link, useHistory } from 'react-router-dom'

const RightMenu: React.FC = () => {
  const { name, surname, selectedRole } = useSelector<RootState, UserState>(state => state.user)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [editOpen, toggle] = useCycle(false, true)
  const history = useHistory()

  const width = 300
  const closedHeight = 112
  const openHeight = 300 + closedHeight

  function onGearClick() {
    toggle()
  }

  async function onLogoutClick() {
    const token = localStorage.getItem('@SLab_ac_token')

    await api.get('logout', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    history.push('/')
  }

  const cycle = () => (editOpen ? 'open' : 'closed')

  const pathAnimation = {
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

  const rightMenuOpenAnimation = {
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

  const hrAnimation = {
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

  const liAnimation = {
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

  const logoutAnimation = {
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
        <motion.path initial={false} variants={pathAnimation} animate={cycle()} fill='#6E4850' />
      </Background>

      <Style width={`${width}px`} theme={theme}>
        <Avatar size={80} />

        <UserInfo theme={theme}>
          <span id='userRole'>{selectRoleLabel(selectedRole)}</span>
          <span id='userName'>{`${name} ${surname}`}</span>

          <span id='userActivity'>
            <svg width='5' height='5' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='2.5' cy='2.5' r='2.5' fill='#00FF66' />
            </svg>
            Online
          </span>
        </UserInfo>

        <button type='button' onClick={onGearClick}>
          <GearIcon />
        </button>

        <AnimatePresence>
          {editOpen && (
            <RightMenuOpen
              width={`${width}px`}
              height={`${openHeight - closedHeight}px`}
              theme={theme}
              variants={rightMenuOpenAnimation}
              animate='open'
              exit='close'
            >
              <ul>
                <motion.hr variants={hrAnimation} />

                <motion.li key='Edit Profile' variants={liAnimation}>
                  <Link to='/session/profile/edit-profile'>
                    <EditUserIcon /> Editar perfil
                  </Link>
                </motion.li>

                <motion.li key='Profiles Toggle' variants={liAnimation}>
                  <Link to='/session/profile/edit-profile'>
                    <ProfilesToggle /> Alternar entre perfis
                  </Link>
                </motion.li>

                <motion.li key='Switch Perfil' variants={liAnimation}>
                  <Link to='/session/profile/change-role'>
                    <ChangeIcon /> Mudar papel
                  </Link>
                </motion.li>

                <motion.button
                  type='button'
                  onClick={onLogoutClick}
                  variants={logoutAnimation}
                  animate='open'
                >
                  <div>Sair</div>
                  <LogoutIcon />
                </motion.button>
              </ul>
            </RightMenuOpen>
          )}
        </AnimatePresence>
      </Style>
    </>
  )
}

export default RightMenu
