import React, { ComponentType, useEffect, useState } from 'react'
import styled from 'styled-components'

import Logo from 'styles/Logo'
import fromTheme from 'utils/fromTheme'

import { RouteProps as RouterPropsDOM, Route, useHistory } from 'react-router-dom'
import api from 'services/api'

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
  // const token = localStorage.getItem('@SLab_ac_token')
  // let access = false

  // const history = useHistory()

  // useEffect(() => {
  //   async function getAccess() {
  //     try {
  //       const response = await api.get('validate-session', {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })

  //       access = response.data.success
  //     } catch (e) {
  //       history.push('/')
  //     }
  //   }
  //   setTimeout(getAccess, 2000)
  // }, [token, history])

  if (/*!access*/false) {
    return (
      <Container>
        <Logo />
      </Container>
    )
  }

  return <Route component={Component} {...rest} />
}

export default PrivateRoute
