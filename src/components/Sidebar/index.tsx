import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { SidebarActions } from 'store/sidebar'
import { RootState, useDispatch, useSelector } from 'store'

import Hamburger from 'components/Hamburger'

import { NavLink } from 'react-router-dom'

export interface RouteProps {
  icon: string
  label: string
  path: string
}

interface SidebarProps {
  routes: RouteProps[]
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()

  const cycle = () => (open ? 'open' : 'closed')
  const onToggle = () => dispatch(SidebarActions.openSidebar(!open))

  const navbar = {
    open: {
      width: 210,
    },
    closed: {
      width: 72,
    },
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  }

  return (
    <Style
      theme={theme}
      variants={navbar}
      transition={navbar.transition}
      initial={false}
      animate={cycle()}
    >
      <ul>
        <Hamburger toggle={onToggle} />

        {routes.map(route => (
          <li key={route.path}>
            <NavLink to={route.path}>
              <button type='button'>
                <img src={route.icon} alt={route.path} />
                {open && <span>{route.label}</span>}
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
    </Style>
  )
}

export default Sidebar
