import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Modal, { ModalMethods } from 'components/Modal'

export type PopupType = 'error' | 'warning' | 'success' | 'other'

export interface PopupProps {
  top?: string
  bottom?: string
  zIndex?: number
  bgHeight?: string
  translateY?: string
}

interface ConfigPopupProps {
  type: PopupType
  setModal?: boolean
  message?: string
  title?: string
  onClick?: () => void
  onOkClick?: () => void
  onCloseClick?: () => void
}

export interface PopupMethods {
  configPopup: (_props: ConfigPopupProps) => void
}

const initialState: ConfigPopupProps = {
  type: 'warning',
  setModal: false,
  message: undefined,
  title: undefined,
  onOkClick: undefined,
  onCloseClick: undefined
}

const makeTitle = (type: PopupType, title?: string) => {
  switch (type) {
    case 'success':
      return 'Sucesso'
    case 'warning':
      return 'Atenção'
    case 'error':
      return 'Error'
    default:
      return title || ''
  }
}

const Popup = forwardRef<PopupMethods, PopupProps>(
  ({ bgHeight = '100vh', top, translateY, bottom, zIndex }, ref) => {
    const modalRef = useRef<ModalMethods>(null)
    const [
      { type, setModal, message, title, onClick, onOkClick, onCloseClick },
      setConfigState
    ] = useState<ConfigPopupProps>(initialState)

    const onConfirmClick = () => {
      setConfigState(prev => ({ ...prev, setModal: false }))
      onClick ? onClick() : onOkClick && onOkClick()
    }

    const configPopup = (content: ConfigPopupProps) => setConfigState(content)

    useImperativeHandle(ref, () => ({ configPopup }))

    useEffect(() => {
      modalRef.current?.toggleModal(setModal)
      setModal
        ? (document.documentElement.style.overflow = 'hidden')
        : (document.documentElement.style.overflow = 'auto')
    }, [setModal])

    return (
      <Modal
        ref={modalRef}
        top={top}
        bottom={bottom}
        translateY={translateY}
        bgHeight={bgHeight}
        onBgClick={onClick || (onCloseClick && onCloseClick)}
        zIndex={zIndex}
      >
        <Style type={type}>
          <span>{makeTitle(type, title)}</span>

          <hr />

          <p>{message}</p>

          <button id='cy-confirm-popup' type='button' onClick={onConfirmClick}>
            Entendi!
          </button>
        </Style>
      </Modal>
    )
  }
)

export default Popup
