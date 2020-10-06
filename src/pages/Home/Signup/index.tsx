import React from 'react'
import Style from './styles'

import FormSignup from './FormSignup'
import Subscribe from './Subscribe'

const Signup: React.FC = () => {
  const signupAnimation = {
    start: {
      x: '100vw',
    },

    enter: {
      x: '0vw',
      transition: {
        type: 'tween',
        duration: 0.9,
      },
    },

    exit: {
      x: '100vw',
      transition: {
        type: 'tween',
        duration: 0.9,
      },
    },
  }

  return (
    <Style variants={signupAnimation} initial='start' animate='enter' exit='exit'>
      <FormSignup />
      <Subscribe />
    </Style>
  )
}

export default Signup
