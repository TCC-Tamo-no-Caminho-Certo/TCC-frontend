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

interface PopupProps {
  top?: string
  translateY?: string
  bgHeight?: string
  onOkClick?: () => void
  onCloseClick?: () => void
}

interface ConfigPopupProps {
  setModal?: boolean
  type: PopupType
  message?: string
  title?: string
}

export interface PopupMethods {
  configPopup: (_props: ConfigPopupProps) => void
}

const Popup = forwardRef<PopupMethods, PopupProps>(
  ({ onOkClick, onCloseClick, bgHeight, top, translateY }, ref) => {
    const modalRef = useRef<ModalMethods>(null)
    const [openPopup, setOpenPopup] = useState(false)

    const [type, setType] = useState<PopupType>('warning')
    const [title, setTitle] = useState<string | undefined>()
    const [message, setMessage] = useState<string | undefined>()

    const onClick = () => {
      setOpenPopup(false)
      onOkClick && onOkClick()
    }

    const configPopup = (content: ConfigPopupProps) => {
      if (content.setModal === undefined) setOpenPopup(!openPopup)
      else setOpenPopup(content.setModal)

      if (content) {
        setTitle(content.title)
        setMessage(content.message)
        setType(content.type)
      }
    }

    useEffect(() => {
      modalRef.current?.toggleModal(openPopup)
    }, [openPopup])

    useImperativeHandle(ref, () => ({ configPopup }))

    const popup = {
      error: (
        <Style className='Popup' type='error'>
          <span>Error</span>

          <hr />

          <p>{message}</p>

          <button type='button' onClick={onClick}>
            Entendi!
          </button>
        </Style>
      ),
      warning: (
        <Style className='Popup' type='warning'>
          <span>Atenção</span>

          <hr />

          <p>{message}</p>

          <button type='button' onClick={onClick}>
            Entendi!
          </button>
        </Style>
      ),
      success: (
        <Style className='Popup' type='success'>
          <span>Sucesso</span>

          <hr />

          <p>{message}</p>

          <button type='button' onClick={onClick}>
            Entendi!
          </button>
        </Style>
      ),
      other: (
        <Style className='Popup' type='success'>
          <span>{title}</span>

          <hr />

          <p>{message}</p>

          <button type='button' onClick={onClick}>
            Entendi!
          </button>
        </Style>
      )
    }

    return (
      <Modal
        ref={modalRef}
        onBgClick={onCloseClick}
        top={top}
        translateY={translateY}
        bgHeight={bgHeight}
      >
        {popup[type]}
      </Modal>
    )
  }
)

export default Popup
