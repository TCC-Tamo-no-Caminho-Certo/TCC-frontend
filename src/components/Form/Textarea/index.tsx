import Style, { StyledTextarea } from './styles'
import React, {
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import { MotionProps } from 'framer-motion'

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  containerProps?: MotionProps
  textColors?: { unfocused: string; focused: string }
}

const Textarea = ({
  containerProps,
  textColors = { focused: '#d65881', unfocused: '#6e4850' },
  ...props
}: TextareaProps) => {
  const form = useContext<FormState | null>(FormContext)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState<string>()

  useEffect(() => {
    const sendRef = {
      setError,
      type: 'textarea',
      inputRef: textareaRef
    }

    form?.registerInput(sendRef)
    return () => form?.removeInput(sendRef)
  }, [textareaRef, form])

  return (
    <Style className='Textarea' error={!!error} {...containerProps}>
      <div className='Error'>
        <ErrorTooltip error={!!error} content={error} />
      </div>

      <StyledTextarea
        id={props.name}
        data-autoresize
        {...(props as any)}
        textColors={textColors}
        ref={textareaRef as any}
        onClick={() => setError('')}
      />
    </Style>
  )
}

export default Textarea
