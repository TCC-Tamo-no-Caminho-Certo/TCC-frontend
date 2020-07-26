import React, { useRef } from 'react'
import { Style } from './styles'

const About: React.FC = () => {
  const loginRef = useRef(null)

  return (
    <Style ref={loginRef}>
      <h1>ABOUT</h1>
    </Style>
  )
}

export default About
