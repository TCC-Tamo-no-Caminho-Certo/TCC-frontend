/* eslint-disable react/no-children-prop */
import React from 'react'
import Style, { Content, Navbar } from './styles'

import EditProfile from './EditProfile'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import { useSelector, RootState, ThemeState } from 'store'

import Hamburger from 'components/Hamburger'

import { useCycle } from 'framer-motion'
import { Link, Route, Switch } from 'react-router-dom'

const routes = [
  {
    path: '/profile',
    exact: true,
    content: () => <h2>Profile</h2>,
    icon: home,
    label: 'Perfil',
    alt: 'profile',
  },
  {
    path: '/profile/editProfile',
    content: () => <EditProfile />,
    icon: editProfile,
    label: 'Editar perfil',
    alt: 'editProfile',
  },
]

const Profile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const [closed, setClosed] = useCycle(true, false)

  const navbar = {
    open: {
      width: 210,
    },

    closed: {
      width: 72,
    },
  }

  function onToggle() {
    setClosed()
  }

  const cycle = () => (closed ? 'closed' : 'open')

  return (
    <Style>
      <Navbar theme={theme} variants={navbar} initial={false} animate={cycle()}>
        <Hamburger toggle={onToggle} />

        <ul>
          {routes.map(route => (
            <li>
              <Link to={route.path}>
                <button type='button'>
                  <img src={route.icon} alt={route.alt} />
                  {!closed && <span>{route.label}</span>}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </Navbar>

      <Content>
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

export default Profile
