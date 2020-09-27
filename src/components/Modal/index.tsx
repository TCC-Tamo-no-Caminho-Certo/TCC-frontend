import React from 'react'
import { Container, ModalBox } from './styles'

import { useSelector, RootState, ThemeState } from 'store'

export interface Atributes {
  message?: string
  visible: boolean
  title?: string
  color?: string
}

interface ModalProps {
  atributes: Atributes
  setVisible: () => void
}

const Modal: React.FC<ModalProps> = ({ atributes, setVisible }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  return (
    <>
      {atributes.visible && (
        <Container>
          <ModalBox theme={theme} color={atributes.color || '#ccc'}>
            <header>
              <h1>{atributes.title}</h1>
            </header>

            <section>
              <p>{atributes.message}</p>

              <button onClick={setVisible} type='button'>
                Ok
              </button>
            </section>
          </ModalBox>
        </Container>
      )}
    </>
  )
}

export default Modal
