import React, { useContext, useState } from 'react'
import Style, { InitialMenu } from './styles'

import RolesToSelect from './RolesToSelect'

import transition from 'utils/transition'

import api from 'services/api'

import { AsyncUserActions } from 'store/Async/user'
import { HomeActions } from 'store/Sync/home'
import { getValidation } from 'store/Async/validation'

import LogoutIcon from 'assets/RightMenuOpen/LogoutIcon'
import AddRoleIcon from 'assets/RightMenuOpen/AddRoleIcon'
import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'

import DotsLoader from 'components/DotsLoader'

import { motion, Variants } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

interface MenuProps {
  width: number
  height: number
  condition: boolean
}

const menuAnimation: Variants = {
  open: { transition: { type: 'tween', duration: 0.2, staggerChildren: 0.1 } },
  closed: { transition: { type: 'tween', duration: 0.2, staggerChildren: 0 } }
}

const hrAnimation: Variants = {
  open: { opacity: [0, 1], transition },
  closed: { opacity: [1, 0], transition: { type: 'tween', duration: 0.1 } }
}

const liAnimation: Variants = {
  open: { x: [16, 0], opacity: [0, 1], transition },
  closed: { opacity: [1, 0], transition: { type: 'tween', duration: 0.1 } }
}

const logoutAnimation: Variants = {
  open: { y: [-16, 0], opacity: [0, 1], transition },
  closed: { opacity: [1, 0], transition: { type: 'tween', duration: 0.1 } }
}

const Menu = ({ width, height, condition }: MenuProps) => {
  const theme = useContext(ThemeContext)

  const [logoutLoading, setLogoutLoading] = useState(false)
  const [changeRole, setChangeRole] = useState(false)

  const dispatch = useDispatch()

  const onLogoutClick = async () => {
    setLogoutLoading(true)
    await api.get('logout')

    localStorage.removeItem('@SLab_ac_token')

    dispatch(AsyncUserActions.reset())
    dispatch(getValidation())
    dispatch(HomeActions.update({ initial: false, page: 'login' }))
  }

  return (
    <Style condition={condition}>
      <InitialMenu
        exit='close'
        animate='open'
        variants={menuAnimation}
        width={`${width}px`}
        height={`${height}px`}
        changeRole={changeRole}
      >
        <motion.hr variants={hrAnimation} />

        <motion.li key='toggleRole' variants={liAnimation}>
          <button type='button' onClick={() => setChangeRole(!changeRole)}>
            <ChangeIcon />
            Alternar entre papéis
          </button>
        </motion.li>

        <motion.li key='editProfile' variants={liAnimation}>
          <Link to='/session/profile/edit-profile'>
            <EditUserIcon /> Editar perfil
          </Link>
        </motion.li>

        <motion.li key='orderNewRole' variants={liAnimation}>
          <Link to='/session/profile/change-role'>
            <AddRoleIcon /> Solicitar novo papel
          </Link>
        </motion.li>

        <motion.button
          id='logout'
          type='button'
          animate='open'
          variants={logoutAnimation}
          onClick={onLogoutClick}
          disabled={logoutLoading}
        >
          {logoutLoading && <DotsLoader color={theme.colors.secondary} />}

          <span id='leave'>Sair</span>

          <LogoutIcon />
        </motion.button>
      </InitialMenu>

      <RolesToSelect state={changeRole} setState={setChangeRole} />
    </Style>
  )
}

export default Menu
