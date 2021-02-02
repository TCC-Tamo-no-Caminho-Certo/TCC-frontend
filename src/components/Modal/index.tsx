import React, { forwardRef, ReactElement, useImperativeHandle, useRef, useState } from 'react'
import Style, { ModalBackground } from './styles'

interface ModalProps {
  children: ReactElement | ReactElement[]
}

export interface ModalMethods {
  toggleModal: (setModal?: boolean) => void
}

const Modal: React.ForwardRefRenderFunction<ModalMethods, ModalProps> = ({ children }, ref) => {
  const modalRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)

  const toggleModal = (setModal?: boolean) => {
    if (setModal === undefined) setOpenModal(!openModal)
    else setOpenModal(setModal)
  }

  useImperativeHandle(ref, () => {
    return { toggleModal }
  })

  return openModal ? (
    <>
      <ModalBackground />

      <Style ref={modalRef} className='Modal'>
        {children}
      </Style>
    </>
  ) : (
    <></>
  )
}

export default forwardRef(Modal)
