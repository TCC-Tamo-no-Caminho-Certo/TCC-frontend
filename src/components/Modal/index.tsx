import React, { ReactElement, useCallback, useEffect, useRef } from 'react'
import Style, { ModalBackground } from './styles'

interface ModalProps {
  show: boolean
  children: (ReactElement | ReactElement[])[] | ReactElement
  onClick(): void
}

const Modal: React.FC<ModalProps> = ({ children: Children, onClick }) => {
  const modalRef = useRef(null)

  const onKeyDown = useCallback(
    (e: any) => {
      e.key === 'Escape' && onClick()
    },
    [onClick]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <>
      <ModalBackground onClick={onClick} />

      <Style ref={modalRef} className='Modal' onKeyDown={onKeyDown}>
        {Children}
      </Style>
    </>
  )
}

export default Modal
