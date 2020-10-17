import React from 'react'
import Style, { Content, SidebarStyle } from './styles'

import { ThemeState } from 'store/theme'
import { useSelector, RootState } from 'store'

import Hamburger from 'components/Hamburger'

import { Link, Switch, Route } from 'react-router-dom'
import { useCycle } from 'framer-motion'

interface RouteProps {
  path: string
  icon?: string
  exact?: boolean
  label?: string
  content(): JSX.Element
}

interface SidebarProps {
  routes: RouteProps[]
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const [closed, setClosed] = useCycle(true, false)

  const cycleNavbar = () => (closed ? 'closed' : 'open')
  const cycleContent = () => (closed ? 'open' : 'closed')

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

  const content = {
    open: {
      width: 'calc(100vw - 72px)',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    closed: {
      width: 'calc(100vw - 210px)',
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  function onToggle() {
    setClosed()
  }

  return (
    <Style>
      <SidebarStyle theme={theme} variants={navbar} initial={false} animate={cycleNavbar()}>
        <ul>
          <Hamburger toggle={onToggle} />

          {routes.map(route => (
            <li key={route.path}>
              <Link to={route.path}>
                <button type='button'>
                  <img src={route.icon} alt={route.path} />
                  {!closed && <span>{route.label}</span>}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarStyle>

      <Content variants={content} initial={false} animate={cycleContent()}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              children={<route.content />}
            />
          ))}
        </Switch>
      </Content>
    </Style>
  )
}

export default Sidebar
