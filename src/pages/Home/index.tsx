import React from 'react'
import { Style, Row } from './styles'
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
        duration={2000}
        easing='easeOutQuad'
        onExiting={{
          translateX: [0, '-100vw'],
        }}
        onEntering={{
          easing: 'easeOutQuad',
          translateX: ['-100vw', 0],
        }}
        unmountOnExit={false}
      >
        <Row registerSlide={registerSlide}>
          <Login />

          <Subscribe />

          <Signup />

          <About />
        </Row>
      </Anime>
    </Style>
  )
}

export default Home
