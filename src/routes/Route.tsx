import React, { ComponentType } from 'react'
import {
  RouteProps as RouterPropsDOM,
  Route as RouteDOM,
  Redirect,
} from 'react-router-dom'

interface RouteProps extends RouterPropsDOM {
  isPrivate?: boolean
  component: ComponentType
}

const Route: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const access = localStorage.getItem('@SteamsLab:success')

  return (
    <RouteDOM
      {...rest}
      render={() => {
        return access ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }}
    />
  )
}

export default Route
