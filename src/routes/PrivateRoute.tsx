import React, { ComponentType, useEffect, useState } from 'react'

import Logo from 'assets/Logo'
import fromTheme from 'utils/fromTheme'

import { RouteProps as RouterPropsDOM, Route, useHistory } from 'react-router-dom'
import api from 'services/api'

interface RouteProps extends RouterPropsDOM {
  component: ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('@SLab_ac_token')
  const [access, setAccess] = useState<boolean>(false)

  const history = useHistory()

  useEffect(() => {
    async function getAccess() {
      try {
        const response = await api.get('validate-session', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        setAccess(response.data.success)
      } catch (e) {
        history.push('/')
      }
    }
    setTimeout(getAccess, 2000)
  }, [token, history])

  if (!access) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${fromTheme('secondary')}`,
        }}
      >
        <Logo />
      </div>
    )
  }

  return <Route component={Component} {...rest} />
}

export default PrivateRoute
