import React, { ComponentType, useEffect } from 'react'
import styled from 'styled-components'

import Logo from 'styles/Logo'
import fromTheme from 'utils/fromTheme'
import validateSession from 'services/validateSession'

import { RouteProps as RouterPropsDOM, Route, useHistory } from 'react-router-dom'

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${fromTheme('secondary')};
`

interface RouteProps extends RouterPropsDOM {
  component: ComponentType
}

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  let access = false

  const history = useHistory()

  useEffect(() => {
    validateSession().then(response => {
      // console.log(response)
      access = response
    })
  }, [])

  if (!access) {
    history.push('/')
  }

  return <Route component={Component} {...rest} />
}

export default PrivateRoute
