import Style, { StyledTextarea } from './styles'
import React, {
  forwardRef,
  HTMLProps,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

interface TextareaMethods {}

type TextareaProps = HTMLProps<HTMLTextAreaElement>

const Textarea = forwardRef<TextareaMethods, TextareaProps>((props, _ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState<string>()
  const form = useContext<FormState | null>(FormContext)

  useEffect(() => {
    const sendRef = {
      inputRef: textareaRef,
      setError,
      type: 'textarea'
    }

    form?.registerInput(sendRef)
    return () => form?.removeInput(sendRef)
  }, [textareaRef, form])

  return (
    <Style error={!!error}>
      <div className='Error'>
        <ErrorTooltip error={!!error} content={error} />
      </div>

      <StyledTextarea
        onClick={() => setError('')}
        className='Textarea'
        ref={textareaRef as any}
        {...(props as any)}
      />
    </Style>
  )
})

export default Textarea
