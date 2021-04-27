import React, {
  forwardRef,
  ReactElement,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { ModalBackground } from './styles'

import CloseIcon from 'assets/Inputs/CloseIcon'

import { GlobalContext, GlobalContextProps } from 'App'

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
      bgHeight = '100%',
      translateY = '-60%',
      zIndex = 1000,
      ...rest
    },
    ref
  ) => {
    const { overflow } = useContext<GlobalContextProps>(GlobalContext)

    const modalRef = useRef(null)

    const [openModal, setOpenModal] = useState(false)

    window.addEventListener('keydown', ({ key }) => {
      key === 'Escape' && setOpenModal(false)
    })

    const toggleModal = (setModal?: boolean) => {
      if (setModal === undefined) {
        setOpenModal(!openModal)

        overflow?.setOverflow &&
          overflow?.setOverflow(!setModal ? 'hidden' : 'visible')
      } else {
        setOpenModal(setModal)

        overflow?.setOverflow &&
          overflow?.setOverflow(setModal ? 'hidden' : 'visible')
      }
    }

    const onBackgroundClick = () => {
      onBgClick && onBgClick()
      setOpenModal(false)
    }

    useImperativeHandle(ref, () => ({ toggleModal }))

    return openModal ? (
      <>
        <ModalBackground
          zIndex={zIndex}
          height={bgHeight}
          onClick={onBackgroundClick}
        />

        <Style
          top={top}
          ref={modalRef}
          zIndex={zIndex}
          bottom={bottom}
          translateY={translateY}
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
