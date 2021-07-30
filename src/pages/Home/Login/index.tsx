import React, { useContext } from 'react'
import Style from './styles'

import Aside from './Aside'
import About from './About'

import { GlobalContext } from 'App'
import { MotionProps } from 'framer-motion'

const Login = (props: MotionProps) => {
  const { overflow } = useContext(GlobalContext)

  return (
    <Style overflow={overflow?.overflow} {...props}>
      <Aside />
      <About />
    </Style>
  )
}

export default Login
