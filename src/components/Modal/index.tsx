import React from 'react'

import { Container, ModalBox } from './styles'

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
  return (
    <>
      {atributes.visible && (
        <Container>
          <ModalBox color={atributes.color || '#ccc'}>
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
