import React from 'react'
import Style from './styles'

import { RouteProps } from './Content'

import { ThemeState } from 'store/theme'
import { SidebarActions } from 'store/sidebar'
import { useSelector, useDispatch, RootState } from 'store'

import Hamburger from 'components/Hamburger'

import { Link } from 'react-router-dom'

interface SidebarProps {
  routes: RouteProps[]
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()

  const cycle = () => (open ? 'closed' : 'open')

  const navbar = {
    open: {
      width: 210,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    closed: {
      width: 72,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  function onToggle() {
    dispatch(SidebarActions.openSidebar(!open))
  }

  return (
    <Style theme={theme} variants={navbar} initial={false} animate={cycle()}>
      <ul>
        <Hamburger toggle={onToggle} />

        {routes.map(route => (
          <li key={route.path}>
            <Link to={route.path}>
              <button type='button'>
                <img src={route.icon} alt={route.path} />
                {open && <span>{route.label}</span>}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </Style>
  )
}

export default Sidebar
