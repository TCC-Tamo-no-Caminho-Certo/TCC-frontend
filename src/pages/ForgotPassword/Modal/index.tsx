import React from 'react'
import Style from './styles'

export interface ModalAttributes {
  message?: string
  visible: boolean
  title?: string
  color?: string
  onOKClick?: () => void
}

const Modal: React.FC<ModalAttributes> = ({ message, visible, title, color, onOKClick }) => {
  if (!onOKClick) throw new Error('onOKClick function not provided to the modal!')

  return (
    <>
      {visible && (
        <Style color={color || '#ccc'}>
          <div>
            <header>
              <h1>{title}</h1>
            </header>

            <section>
              <p>{message}</p>

              <button onClick={onOKClick} type='button'>
                Ok
              </button>
            </section>
          </div>
        </Style>
      )}
    </>
  )
}

export default Modal
