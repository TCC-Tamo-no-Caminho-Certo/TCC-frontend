import React, { ComponentType, useEffect, useState } from 'react'

import fromTheme from 'utils/fromTheme'
import validateSession from 'utils/validateSession'

import { Route, RouteProps as RouterPropsDOM, useHistory } from 'react-router-dom'
import styled from 'styled-components'

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
  const [access, setAccess] = useState(false)
  // let access = false

  const history = useHistory()

  useEffect(() => {
    validateSession().then(response => {
      console.log('response', response)
      setAccess(response)

      // if (!response) {
      //   history.push('/')
      // }
    })
  }, [])

  // return <>{access && <Route component={Component} {...rest} />}</>

  return <Route component={Component} {...rest} />
}

export default PrivateRoute
