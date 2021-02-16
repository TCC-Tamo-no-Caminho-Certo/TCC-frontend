import React, { HTMLProps, useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

type TextareaProps = HTMLProps<HTMLTextAreaElement>

const Textarea: React.FC<TextareaProps> = props => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState<string>()
  const form = useContext<FormState | null>(FormContext)

  useEffect(() => {
    const sendRef = {
      inputRef: textareaRef,
      setError,
      type: 'textarea',
    }

    form?.registerInput(sendRef)
    return () => form?.removeInput(sendRef)
  }, [textareaRef, form])

  return (
    <>
      <ErrorTooltip error={!!error} content={error} />

      <Style className='Textarea' ref={textareaRef as any} {...(props as any)} />
    </>
  )
}

export default Textarea
