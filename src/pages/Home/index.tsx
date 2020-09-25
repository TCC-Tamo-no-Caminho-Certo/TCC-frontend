import React, { useState } from 'react'
import Style, { Row } from './styles'

import About from './About'
import Login from './Login'
import Signup from './Signup'
import Subscribe from './Subscribe'

import Modal, { Atributes } from 'components/Modal'

import { useHomeSlider } from 'hooks/useHomeSlider'

import Anime from '@mollycule/react-anime'

const Home: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [modalAtributes, setModalAtributes] = useState<Atributes>({ visible: false })

  const modalChangeVisible = () => {
    setModalAtributes({ visible: false })
  }

  const modal = (Atribute: Atributes) => {
    setModalAtributes(Atribute)
  }

  return (
    <Style>
      <Modal atributes={modalAtributes} setVisible={modalChangeVisible} />

      <Anime
        in={!homeSlider}
        appear={false}
        duration={1000}
        unmountOnExit={false}
        easing='easeOutQuad'
        onExiting={{ translateX: [0, '-100vw'] }}
        onEntering={{ translateX: ['-100vw', 0] }}
      >
        <Row>
          <About />

          <Login setModalVisible={modal} />

          <Signup setModalVisible={modal} />

          <Subscribe />
        </Row>
      </Anime>
    </Style>
  )
}

export default Home
