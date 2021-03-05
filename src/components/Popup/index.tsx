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

interface ConfigPopupProps {
  setModal?: boolean
  type: PopupType
  message?: string
  title?: string
}

export interface PopupMethods {
  configPopup: (_props: ConfigPopupProps) => void
}

const Popup = forwardRef<PopupMethods>((_props, ref) => {
  const modalRef = useRef<ModalMethods>(null)
  const [openPopup, setOpenPopup] = useState(false)

  const [type, setType] = useState<PopupType>('warning')
  const [title, setTitle] = useState<string | undefined>()
  const [message, setMessage] = useState<string | undefined>()

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
      <Style type='error'>
        <span>Error</span>

        <hr />

        <p>{message}</p>

        <button
          type='button'
          onClick={() => {
            setOpenPopup(false)
          }}
        >
          Entendi!
        </button>
      </Style>
    ),
    warning: (
      <Style type='warning'>
        <span>Atenção</span>

        <hr />

        <p>{message}</p>

        <button type='button' onClick={() => setOpenPopup(false)}>
          Entendi!
        </button>
      </Style>
    ),
    success: (
      <Style type='success'>
        <span>Sucesso</span>

        <hr />

        <p>{message}</p>

        <button type='button' onClick={() => setOpenPopup(false)}>
          Ok
        </button>
      </Style>
    ),
    other: (
      <Style type='success'>
        <span>{title}</span>

        <hr />

        <p>{message}</p>

        <button type='button' onClick={() => setOpenPopup(false)}>
          Ok
        </button>
      </Style>
    )
  }

  return <Modal ref={modalRef}>{popup[type]}</Modal>
})

export default Popup
