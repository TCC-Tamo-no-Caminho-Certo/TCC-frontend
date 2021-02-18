import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { ModalBackground } from './styles'

interface ModalProps {
  children: ReactElement
  top?: string
  bottom?: string
}

export interface ModalMethods {
  toggleModal: (_setModal?: boolean) => void
}

const Modal: React.ForwardRefRenderFunction<ModalMethods, ModalProps> = (
  { top = '50%', bottom = '0%', children },
  ref
) => {
  const modalRef = useRef(null)

  const [openModal, setOpenModal] = useState(false)

  const toggleModal = (setModal?: boolean) => {
    if (setModal === undefined) setOpenModal(!openModal)
    else setOpenModal(setModal)
  }

  useImperativeHandle(ref, () => ({ toggleModal }))

  window.addEventListener('keydown', e => {
    e.key === 'Escape' && setOpenModal(false)
  })

  return openModal ? (
    <>
      <ModalBackground onClick={() => setOpenModal(false)} />

      <Style top={top} bottom={bottom} ref={modalRef}>
        {children}
      </Style>
    </>
  ) : (
    <></>
  )
}

export default forwardRef(Modal)
