import React from 'react'
import Style, { Background, RightMenuOpen, UserInfo } from './styles'

import { RootState, useSelector } from 'store'
import { ThemeState } from 'store/theme'

import api from 'services/api'
import { useHistory, Link } from 'react-router-dom'

import gear from 'assets/gear.svg'
import logout from 'assets/RightMenuOpen/logout.svg'
import avatar from 'assets/avatar.jpg'
import change from 'assets/RightMenuOpen/change.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import { motion, useCycle } from 'framer-motion'

const RightMenu: React.FC = () => {
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

  return (
    <>
      <Background width={`${width}px`} height={`${editHeight}px`}>
        <motion.path initial={false} variants={pathAnimation} animate={cycle()} fill='#6E4850' />
      </Background>

      <Style width={`${width}px`} theme={theme}>
        <img src={avatar} alt='avatar' id='avatar' />

        <UserInfo theme={theme}>
          <span id='userRole'>Estudante</span>
          <span id='userName'>Miguel Andrade</span>

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
      </Style>

      {editOpen && (
        <RightMenuOpen width={`${width}px`} height={`${editHeight - closedHeight}px`} theme={theme}>
          <hr />

          <ul>
            <li>
              <Link to='/session/profile/edit-profile'>
                <img src={editProfile} alt='Edit Profile' /> Editar perfil
              </Link>
            </li>
            <li>
              <Link to='/editProfile'>
                <img src={change} alt='Edit Profile' />
                Alternar perfil
              </Link>
            </li>
          </ul>

          <button type='button' onClick={onLogoutClick}>
            <div>Sair</div>
            <img src={logout} alt='Logout' />
          </button>
        </RightMenuOpen>
      )}
    </>
  )
}

export default RightMenu
