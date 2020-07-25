import React from 'react'
import { useRegister } from 'hooks/useRegister'
import Signup from './Signup'
import Login from './Login'
import { Style } from './styles'
import About from './About'

const Home: React.FC = () => {
  const { register } = useRegister()

  return (
    <Style register={register}>
      <Login />

      <Signup />

      <About />
    </Style>
  )
}

export default Home
