import React, { useContext } from 'react'
import Style from './styles'

import Aside from './Aside'
import About from './About'

import { GlobalContext } from 'App'

const Login = () => {
  const { overflow } = useContext(GlobalContext)

  return (
    <Style overflow={overflow?.overflow}>
      <Aside />
      <About />
    </Style>
  )
}

export default Login
