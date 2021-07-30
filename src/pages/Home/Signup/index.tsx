import React from 'react'
import Style from './styles'

import Aside from './Aside'
import Subscribe from './Subscribe'

import { MotionProps } from 'framer-motion'

const Signup = (props: MotionProps) => (
  <Style {...props}>
    <Aside />
    <Subscribe />
  </Style>
)

export default Signup
