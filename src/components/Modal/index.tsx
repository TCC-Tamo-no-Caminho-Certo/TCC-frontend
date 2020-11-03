import React, { ReactElement } from 'react'
import Style, { ModalBackground } from './styles'

interface ModalProps {
  show: boolean
  children: (ReactElement | ReactElement[])[] | ReactElement
  onClick(): void
}

const Modal: React.FC<ModalProps> = ({ show, children: Children, onClick }) => {
  return show ? (
    <>
      <Style>{Children}</Style>

      <ModalBackground onClick={onClick} />
    </>
  ) : (
    <></>
  )
}

export default Modal
