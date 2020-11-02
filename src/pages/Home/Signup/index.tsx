import React from 'react'
import Style from './styles'

import FormSignup from './FormSignup'
import Subscribe from './Subscribe'

const Signup: React.FC = () => {
  return (
    <Style>
      <FormSignup />
      <Subscribe />
    </Style>
  )
}

export default Signup
