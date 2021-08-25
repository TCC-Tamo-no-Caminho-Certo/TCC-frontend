import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import Style, { Background } from './styles'

import { GlobalContext } from 'App'
import { createPortal } from 'react-dom'

export interface ModalForwardeds {
  toggle: (_open?: boolean) => void
  content: (_open?: ReactNode) => void
}

interface ModalProps {
  zIndex?: number
  children?: ReactNode
}

const Modal = forwardRef<ModalForwardeds, ModalProps>(
  ({ children, zIndex = 1000 }, ref) => {
    const { overflow } = useContext(GlobalContext)

    const [content, setContent] = useState<ReactNode>()
    const [open, setOpen] = useState(false)

    const root = document.getElementById('modal')

    window.addEventListener('keydown', ({ key }) => {
      key === 'Escape' && setOpen(false)
    })

    const forwardToggle = (toggleValue?: boolean) => {
      toggleValue !== undefined ? setOpen(toggleValue) : setOpen(!open)
    }

    const forwardContent = (contentValue: ReactNode) => {
      setContent(contentValue)
    }

    useEffect(() => {
      if (overflow?.setOverflow)
        open
          ? overflow.setOverflow({ overflow: 'hidden' })
          : overflow.setOverflow({ overflow: 'auto' })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    useImperativeHandle(ref, () => ({
      toggle: forwardToggle,
      content: forwardContent
    }))

    return open && root ? (
      createPortal(
        <>
          <Background onClick={() => setOpen(false)} zIndex={zIndex} />

          <Style ref={ref as any} zIndex={zIndex + 1}>
            {content || children}
          </Style>
        </>,
        root
      )
    ) : (
      <></>
    )
  }
)

export default Modal
