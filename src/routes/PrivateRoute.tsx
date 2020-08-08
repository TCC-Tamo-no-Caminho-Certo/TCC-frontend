import React, { ComponentType } from 'react'
import { useAuth } from 'hooks/useAuth'
import { RouteProps as RouterPropsDOM, Route, Redirect } from 'react-router-dom'

interface RouteProps extends RouterPropsDOM {
  component: ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const { token } = useAuth()

  return (
    <Route
      render={() => {
        return true ? <Component /> : <Redirect to={{ pathname: '/' }} />
      }}
      {...rest}
    />
  )
}

export default PrivateRoute
