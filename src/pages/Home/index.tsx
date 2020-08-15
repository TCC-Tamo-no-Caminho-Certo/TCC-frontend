import React from 'react'
import Style, { Row } from './styles'

import About from './About'
import Login from './Login'
import Signup from './Signup'
import Subscribe from './Subscribe'

import { useRegisterSlide } from 'hooks/useRegisterSlide'

import Anime from '@mollycule/react-anime'

const Home: React.FC = () => {
  const { registerSlide } = useRegisterSlide()

  return (
    <Style>
      <Anime
        in={!registerSlide}
        appear={false}
        duration={1000}
        unmountOnExit={false}
        easing='easeOutQuad'
        onExiting={{ ranslateX: [0, '-100vw'] }}
        onEntering={{ translateX: ['-100vw', 0] }}
      >
        <Row>
          <About />

          <Login />

          <Signup />

          <Subscribe />
        </Row>
      </Anime>
    </Style>
  )
}

export default Home
