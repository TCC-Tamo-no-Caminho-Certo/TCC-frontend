import React from 'react'
import { useRegister } from 'hooks/useRegister'
import { Style } from './styles'
import Signup from './Signup'
import Login from './Login'
import About from './About'
import Subscribe from './Subscribe'

const Home: React.FC = () => {
  const { register } = useRegister()

  return (
    <Style register={register}>
      <Login />

      <Subscribe />

      <Signup />

      <About />
    </Style>
  )
}

export default Home
