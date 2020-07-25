import React, { useEffect, useRef } from 'react'
import { useRegister } from 'hooks/useRegister'
import anime from 'animejs'
import { Style } from './styles'

const About: React.FC = () => {
  const loginRef = useRef(null)
  const { register } = useRegister()

  useEffect(() => {
    if (register !== 'starting') {
      anime({
        targets: loginRef.current,
        duration: 1000,
        easing: 'easeInOutCirc',
        translateY: register === 'registering' ? [0, '100vh'] : ['100vh', 0],
      })
    }
  }, [register])

  return (
    <Style ref={loginRef} register={register}>
      <h1>Existe um pagina chamada Sobre bem qui</h1>
    </Style>
  )
}

export default About
