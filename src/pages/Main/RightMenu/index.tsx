import React from 'react'
import Style, { Background, RightMenuOpen, UserInfo } from './styles'

import api from 'services/api'

import { RootState, ThemeState, UserState, useSelector } from 'store'

import gear from 'assets/gear.svg'
import logout from 'assets/RightMenuOpen/logout.svg'
import change from 'assets/RightMenuOpen/change.svg'
import editProfile from 'assets/ProfileSidebar/editProfile.svg'

import Avatar from 'components/User/Avatar'

import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { Link, useHistory } from 'react-router-dom'

const RightMenu: React.FC = () => {
  const { name, surname, role } = useSelector<RootState, UserState>(state => state.user)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [editOpen, toggle] = useCycle(false, true)
  const history = useHistory()

  const width = 300
  const closedHeight = 112
  const editHeight = 127 + closedHeight

  const cycle = () => (editOpen ? 'open' : 'closed')

  function onGearClick() {
    toggle()
  }

  const onLogoutClick = async () => {
    const token = localStorage.getItem('@SLab_ac_token')
    await api.get('logout', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    history.push('/')
  }

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
      d: `M0,8 C0,3.5 3.5,0 8,0 H${width} V${editHeight} H8 C3.5,${editHeight} 0,${
        editHeight - 4
      } 0,${editHeight - 8} V8Z`,
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
      <Background width={`${width}px`} height={`${editHeight}px`}>
        <motion.path initial={false} variants={pathAnimation} animate={cycle()} fill='#6E4850' />
      </Background>

      <Style width={`${width}px`} theme={theme}>
        <Avatar size={80} id='avatar' />

        <UserInfo theme={theme}>
          <span id='userRole'>{role}</span>
          <span id='userName'>{`${name} ${surname}`}</span>

          <span id='userActivity'>
            <svg width='5' height='5' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='2.5' cy='2.5' r='2.5' fill='#00FF66' />
            </svg>
            Online
          </span>
        </UserInfo>

        <button type='button' onClick={onGearClick}>
          <img src={gear} alt='edit profile' id='gear' />
        </button>

        <AnimatePresence>
          {editOpen && (
            <RightMenuOpen
              width={`${width}px`}
              height={`${editHeight - closedHeight}px`}
              theme={theme}
              variants={rightMenuOpenAnimation}
              animate='open'
              exit='close'
            >
              <ul>
                <motion.hr variants={hrAnimation} />

                <motion.li key='Edit Profile' variants={liAnimation}>
                  <Link to='/session/profile/edit-profile'>
                    <img src={editProfile} alt='Edit Profile' /> Editar perfil
                  </Link>
                </motion.li>

                <motion.li key='Switch Perfil' variants={liAnimation}>
                  <Link to='/editProfile'>
                    <img src={change} alt='Switch Perfil' />
                    Alternar papel
                  </Link>
                </motion.li>
              </ul>

              <motion.button
                type='button'
                onClick={onLogoutClick}
                variants={logoutAnimation}
                animate='open'
              >
                <div>Sair</div>
                <img src={logout} alt='Logout' />
              </motion.button>
            </RightMenuOpen>
          )}
        </AnimatePresence>
      </Style>
    </>
  )
}

export default RightMenu
