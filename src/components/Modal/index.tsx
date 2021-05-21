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
import { ThemeContext } from 'styled-components'

interface ModalProps {
  children: ReactElement | ReactElement[]
  id?: string
  top?: string
  zIndex?: number
  bottom?: string
  bgHeight?: string
  closeTop?: number
  translateY?: string
  closeColor?: string
  closeRight?: number
  onBgClick?: () => void
}

export interface ModalMethods {
  toggleModal: (_setModal?: boolean) => void
}

const Modal = forwardRef<ModalMethods, ModalProps>(
  (
    {
      closeColor,
      closeTop,
      children,
      onBgClick,
      closeRight,
      top = '50vh',
      bottom = 'auto',
      bgHeight = '100%',
      translateY = '-60%',
      zIndex = 1000,
      ...rest
    },
    ref
  ) => {
    const theme = useContext(ThemeContext)
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
          overflow?.setOverflow(!setModal ? 'hidden' : 'auto')
      } else {
        setOpenModal(setModal)

        overflow?.setOverflow &&
          overflow?.setOverflow(setModal ? 'hidden' : 'auto')
      }
    }

    const onBackgroundClick = () => {
      onBgClick && onBgClick()
      setOpenModal(false)
      overflow?.setOverflow && overflow?.setOverflow('auto')
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
          closeTop={closeTop ? `${closeTop}px` : '8px'}
          closeRight={closeRight ? `${closeRight}px` : '8px'}
          closeColor={closeColor || theme.colors.secondary}
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
