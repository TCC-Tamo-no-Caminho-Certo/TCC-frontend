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
  translateY?: string
  bgHeight?: string
  onBgClick?: () => void
}

export interface ModalMethods {
  toggleModal: (_setModal?: boolean) => void
}

const Modal = forwardRef<ModalMethods, ModalProps>(
  (
    {
      bottom = 'auto',
      top = '50vh',
      translateY = '-60%',
      bgHeight = '100vh',
      children,
      onBgClick
    },
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
        <ModalBackground
          height={bgHeight}
          onClick={() => {
            setOpenModal(false)
            onBgClick && onBgClick()
          }}
        />

        <Style top={top} bottom={bottom} translateY={translateY} ref={modalRef}>
          {children}
        </Style>
      </>
    ) : (
      <></>
    )
  }
)

export default Modal
