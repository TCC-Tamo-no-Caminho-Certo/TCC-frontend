import React, { useEffect } from 'react'
import Style, { BackButton } from './styles'

import { ThemeState } from 'store/theme'
import { SidebarActions } from 'store/sidebar'
import { RootState, useDispatch, useSelector } from 'store'

import Hamburger from 'components/Hamburger'

import { RiArrowLeftSLine } from 'react-icons/ri'

import { NavLink, useLocation, useParams } from 'react-router-dom'

export interface RouteProps {
  icon: string
  label: string
  path: string
}

interface SidebarProps {
  routes: RouteProps[]
  goBack?: boolean
  noScroll?: boolean
}
interface ParamsType {
  id: string
}

const Sidebar: React.FC<SidebarProps> = ({ routes, goBack, noScroll }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()

  const cycle = () => (open ? 'open' : 'closed')
  const onToggle = () => dispatch(SidebarActions.openSidebar(!open))

  const height = window.innerHeight
  const { id }: ParamsType = useParams()
  const { pathname } = useLocation()

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

  useEffect(() => {
    if (!noScroll) {
      const searchArray = routes.map((route, index) => (route.path === pathname ? index : 0))
      window.scrollTo(0, height * searchArray.indexOf(1))
    }
  }, [id, pathname, routes, height, noScroll])

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

        {routes.map((route, index) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              onClick={() => !noScroll && window.scrollTo(0, height * index)}
            >
              <button type='button'>
                <img src={route.icon} alt={route.path} />
                {open && <span>{route.label}</span>}
              </button>
            </NavLink>
          </li>
        ))}
      </ul>

      {goBack && (
        <BackButton>
          <NavLink to='/session/main'>
            <button type='button'>
              <RiArrowLeftSLine color='white' size={32} />
              {open && <span>Voltar</span>}
            </button>
          </NavLink>
        </BackButton>
      )}
    </Style>
  )
}

export default Sidebar
