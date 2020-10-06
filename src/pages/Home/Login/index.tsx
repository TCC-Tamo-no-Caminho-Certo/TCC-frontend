import React from 'react'
import Style from './styles'

import FormLogin from './FormLogin'
import About from './About'

const Login: React.FC = () => {
  const loginAnimation = {
    start: {
      x: '-100vw',
    },

    enter: {
      x: '0vw',
      transition: {
        type: 'tween',
        duration: 0.9,
      },
    },

    exit: {
      x: '-100vw',
      transition: {
        type: 'tween',
        duration: 0.9,
      },
    },
  }

  return (
    <Style variants={loginAnimation} initial='start' animate='enter' exit='exit'>
      <About />
      <FormLogin />
    </Style>
  )
}

export default Login
