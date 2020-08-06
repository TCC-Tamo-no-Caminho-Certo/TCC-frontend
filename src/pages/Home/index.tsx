import React from 'react'
import Style, { Row } from './styles'
import About from './About'
import Login from './Login'
import Signup from './Signup'
import Subscribe from './Subscribe'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import Anime from '@mollycule/react-anime'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const Home: React.FC = () => {
  const { registerSlide } = useRegisterSlide()

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      language='pt-BR'
    >
      <Style>
        <Anime
          in={!registerSlide}
          appear={false}
          duration={2000}
          unmountOnExit={false}
          easing='easeOutQuad'
          onExiting={{
            translateX: [0, '-100vw'],
          }}
          onEntering={{
            easing: 'easeOutQuad',

            translateX: ['-100vw', 0],
          }}
        >
          <Row registerSlide={registerSlide}>
            <About />

            <Login />

            <Signup />

            <Subscribe />
          </Row>
        </Anime>
      </Style>
    </GoogleReCaptchaProvider>
  )
}

export default Home
