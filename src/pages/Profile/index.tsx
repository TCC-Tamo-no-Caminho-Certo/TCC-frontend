/* eslint-disable react/no-children-prop */
import React from 'react'
import Style, { Content, Sidebar } from './styles'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

import ProfileHome from './Home'
import EditProfile from './EditProfile'

import Hamburger from 'components/Hamburger'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import { Link, Switch, Route, useLocation } from 'react-router-dom'
import { useCycle } from 'framer-motion'

const Profile: React.FC = () => {
  const location = useLocation()

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

  const profileRoutes = [
    {
      path: '/profile',
      icon: home,
      exact: true,
      label: 'Perfil',
      content: () => <ProfileHome />,
    },
    {
      path: '/profile/editProfile',
      icon: editProfile,
      label: 'Editar Perfil',
      content: () => <EditProfile />,
    },
  ]

  function onToggle() {
    setClosed()
  }

  return (
    <Style>
      <Sidebar theme={theme} variants={navbar} initial={false} animate={cycleNavbar()}>
        <ul>
          <Hamburger toggle={onToggle} />

          {profileRoutes.map(route => (
            <li>
              <Link to={route.path}>
                <button type='button'>
                  <img src={route.icon} alt={route.path} />
                  {!closed && <span>{route.label}</span>}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </Sidebar>

      <Content variants={content} initial={false} animate={cycleContent()}>
        <Switch location={location} key={location.key}>
          {profileRoutes.map(route => (
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

export default Profile
