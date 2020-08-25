import React, { ComponentType, useEffect, useState } from 'react'

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
    getAccess()
  }, [token, history])

  if (!access) {
    return null
  }

  return <Route component={Component} {...rest} />
}

export default PrivateRoute
