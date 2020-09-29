import React, { useState } from 'react'
import Style, { Row } from './styles'

import About from './About'
import Login from './Login'
import Signup from './Signup'
import Subscribe from './Subscribe'

import { useHomeSlider } from 'hooks/useHomeSlider'
import { useSelector, RootState, ThemeState } from 'store'

import Modal, { ModalAttributes } from 'components/Modal'

import Anime from '@mollycule/react-anime'

const Home: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({ visible: false })
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const modalChangeVisible = () => {
    setModalAttributes({ visible: false })
  }

  const setModal = (Atribute: ModalAttributes) => {
    setModalAttributes(Atribute)
  }

  return (
    <Style>
      <Modal {...modalAttributes} onOKClick={modalChangeVisible} />

      <Anime
        in={!homeSlider}
        appear={false}
        duration={1000}
        unmountOnExit={false}
        easing='easeOutQuad'
        onExiting={{ translateX: [0, '-100vw'] }}
        onEntering={{ translateX: ['-100vw', 0] }}
      >
        <Row theme={theme}>
          <About />

          <Login setModalVisible={setModal} />

          <Signup setModalVisible={setModal} />

          <Subscribe />
        </Row>
      </Anime>
    </Style>
  )
}

export default Home
