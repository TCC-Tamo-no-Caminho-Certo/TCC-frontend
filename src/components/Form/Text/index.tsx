import React, {
  FC,
  FocusEvent,
  forwardRef,
  HTMLProps,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import EyeClosedIcon from 'assets/Inputs/EyeClosedIcon'
import EyeIcon from 'assets/Inputs/EyeIcon'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

export interface TextProps extends HTMLProps<HTMLInputElement> {
  eye?: boolean
  pasteAndDrop?: boolean
  icon?: FC
  color?: string
}

const Text = forwardRef<HTMLInputElement, TextProps>(
  (
    {
      eye = false,
      type = 'text',
      onBlur,

      icon: Icon,
      pasteAndDrop = true,
      color = '#d65881',
      className = 'Text',
      id,
      ...rest
    },
    ref
  ) => {
    const form = useContext<FormState | null>(FormContext)
    const textRef = useRef<HTMLInputElement>(null)
    const auxRef = (ref as RefObject<HTMLInputElement>) || textRef
    const [showInput, setShowInput] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [error, setError] = useState<string>()

    useEffect(() => {
      const input = {
        inputRef: auxRef,
        setError,
        type
      }

      form?.registerInput(input)
      return () => form?.removeInput(input)
    }, [auxRef, form, type])

    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
      setIsFilled(!!auxRef.current?.value)
      setError(undefined)
    }

    const hiddenInput = () => {
      if (eye) return showInput ? 'text' : 'password'
      return type
    }

    return (
      <Style
        className={className}
        color={color}
        hasEye={!!eye}
        hasIcon={!!Icon}
        isFilled={isFilled}
        isErrored={!!error}
        hidden={rest.hidden}
        onFocus={() => textRef.current?.focus()}
        id={id}
      >
        <ErrorTooltip error={!!error} content={error} />

        {Icon && !error && (
          <div className='iconSpace'>
            <button type='button' onClick={() => textRef.current?.focus()}>
              <Icon />
            </button>
          </div>
        )}

        <input
          spellCheck='false'
          ref={ref || textRef}
          id={rest.name}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          {...rest}
        />
        {eye &&
          (showInput ? (
            <div className='iconSpace'>
              <EyeClosedIcon onClick={() => setShowInput(false)} />
            </div>
          ) : (
            <div className='iconSpace'>
              <EyeIcon onClick={() => setShowInput(true)} />
            </div>
          ))}
      </Style>
    )
  }
)

export default Text

Text.displayName = 'Text'
