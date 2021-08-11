import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { GlobalContext } from 'App'
import { createPortal } from 'react-dom'

export interface ModalForwardeds {
  toggle: (_open?: boolean) => void
  content: (_open?: ReactNode) => void
}

interface ModalProps {
  children?: ReactNode
}

const Modal = forwardRef<ModalForwardeds, ModalProps>(({ children }, ref) => {
  const { overflow } = useContext(GlobalContext)

  const content = useRef<ReactNode | null>(null)

  const [open, setOpen] = useState(false)

  const root = document.getElementById('root')

  window.addEventListener('keydown', ({ key }) => {
    key === 'Escape' && setOpen(false)
  })

  const forwardToggle = (toggleValue?: boolean) => {
    toggleValue ? setOpen(toggleValue) : setOpen(!open)
  }

  const forwardContent = (contentValue: ReactNode) => {
    if (content.current) content.current = contentValue
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

  return open ? (
    root &&
      createPortal(<Style ref={ref as any}>{content || children}</Style>, root)
  ) : (
    <></>
  )
})

export default Modal
