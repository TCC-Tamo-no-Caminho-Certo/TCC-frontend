import React, { ComponentType } from 'react'
import { useAuth } from 'hooks/useAuth'
import {
  RouteProps as RouterPropsDOM,
  Route as RouteDOM,
  Redirect,
} from 'react-router-dom'

interface RouteProps extends RouterPropsDOM {
  isPrivate?: boolean
  component: ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { authData } = useAuth()

  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return true ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/map',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

export default Route
