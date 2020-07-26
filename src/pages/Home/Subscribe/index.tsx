import React from 'react'
import { useRegister } from 'hooks/useRegister'

import Anime from '@mollycule/react-anime'
import { Style } from './styles'

const Subscribe: React.FC = () => {
  const { register } = useRegister()

  return (
    <Anime
      in={register}
      appear={false}
      duration={2000}
      mountOnEnter
      unmountOnExit
      onEntering={{
        easing: 'easeOutQuad',
        translateX: [0, '-100vw'],
      }}
      onExiting={{
        easing: 'easeOutQuad',
        translateX: ['-100vw', 0],
      }}
    >
      <Style>
        <h1>SUBSCRIBE</h1>
      </Style>
    </Anime>
  )
}

export default Subscribe
