import React from 'react'
import Style from './styles'

import FormLogin from './FormLogin'
import About from './About'

const Login: React.FC = () => {
  return (
    <Style>
      <FormLogin />
      <About />
    </Style>
  )
}

export default Login
