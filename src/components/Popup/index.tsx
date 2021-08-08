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
  title?: string
  type?: PopupType
  message?: string
  setModal?: boolean
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
  title: undefined,
  message: undefined,
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
  ({ bgHeight = '100vh', top, translateY, bottom }, ref) => {
    const modalRef = useRef<ModalMethods>(null)

    const [
      { type, setModal, message, title, onClick, onOkClick, onCloseClick },
      setConfigState
    ] = useState<ConfigPopupProps>(initialState)

    const onPopupCloseClick = () => {
      setConfigState(prev => ({ ...prev, setModal: false }))

      if (onClick) onClick()
      else onCloseClick && onCloseClick()
    }

    const onConfirmClick = () => {
      setConfigState(prev => ({ ...prev, setModal: false }))

      if (onClick) onClick()
      else onOkClick && onOkClick()
    }

    const configPopup = (content: ConfigPopupProps) => setConfigState(content)

    useImperativeHandle(ref, () => ({ configPopup }))

    useEffect(() => {
      modalRef.current?.toggle(setModal)

      setModal
        ? (document.documentElement.style.overflow = 'hidden')
        : (document.documentElement.style.overflow = 'auto')
    }, [setModal])

    return (
      <Modal
        top={top}
        ref={modalRef}
        bottom={bottom}
        closeIcon={false}
        bgHeight={bgHeight}
        translateY={translateY}
        onClose={onPopupCloseClick}
      >
        <Style type={type || 'other'}>
          <span>{makeTitle(type || 'other', title)}</span>

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
