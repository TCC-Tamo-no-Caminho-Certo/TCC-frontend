import React, {
  forwardRef,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { ModalBackground } from './styles'

import CloseIcon from 'assets/Inputs/CloseIcon'

interface ModalProps {
  children: ReactElement | ReactElement[]
  id?: string
  top?: string
  zIndex?: number
  bottom?: string
  bgHeight?: string
  translateY?: string
  onBgClick?: () => void
}

export interface ModalMethods {
  toggleModal: (_setModal?: boolean) => void
}

const Modal = forwardRef<ModalMethods, ModalProps>(
  (
    {
      children,
      onBgClick,
      top = '50vh',
      bottom = 'auto',
      bgHeight = '100vh',
      translateY = '-60%',
      zIndex = 10,
      ...rest
    },
    ref
  ) => {
    const modalRef = useRef(null)
    const [openModal, setOpenModal] = useState(false)

    window.addEventListener('keydown', ({ key }) => {
      key === 'Escape' && setOpenModal(false)
    })

    const toggleModal = (setModal?: boolean) => {
      setModal === undefined ? setOpenModal(!openModal) : setOpenModal(setModal)
    }

    const onBackgroundClick = () => {
      setOpenModal(false)
      onBgClick && onBgClick()
    }

    useImperativeHandle(ref, () => ({ toggleModal }))

    return openModal ? (
      <>
        <ModalBackground
          height={bgHeight}
          onClick={onBackgroundClick}
          zIndex={zIndex}
        />

        <Style
          top={top}
          bottom={bottom}
          ref={modalRef}
          translateY={translateY}
          zIndex={zIndex}
          {...rest}
        >
          <CloseIcon onClick={onBackgroundClick} />

          {children}
        </Style>
      </>
    ) : (
      <></>
    )
  }
)

export default Modal
