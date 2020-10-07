import React from 'react'
import Style from './styles'

import FormLogin from './FormLogin'
import About from './About'
import { useSelector, RootState } from 'store'

const Login: React.FC = () => {
  const animate = useSelector<RootState>(state => state.home.animate)
  console.log(animate)

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

    none: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0,
      },
    },
  }

  return (
    <Style
      variants={loginAnimation}
      initial={animate ? 'start' : 'none'}
      animate='enter'
      exit={animate ? 'exit' : 'none'}
    >
      <About />
      <FormLogin />
    </Style>
  )
}

export default Login
