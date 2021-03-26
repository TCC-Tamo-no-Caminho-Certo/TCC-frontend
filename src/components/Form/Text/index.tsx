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
import Style, { IconSpace } from './styles'

import { FormContext, FormState } from '../'

import EyeClosedIcon from 'assets/Inputs/EyeClosedIcon'
import EyeIcon from 'assets/Inputs/EyeIcon'

import { dateToValue } from 'components/Form/Datepicker'
import ErrorTooltip from 'components/Tooltips/ErrorTooltip'
import { Ref } from 'components/Form'

export interface TextColors {
  unfocused?: string
  focused?: string
}

export interface TextProps extends HTMLProps<HTMLInputElement> {
  eye?: boolean
  icon?: FC
  isDate?: boolean
  pasteAndDrop?: boolean
  optional?: boolean
  textColors?: TextColors
}

const Text = forwardRef<HTMLInputElement, TextProps>(
  (
    {
      id,
      onBlur,
      hidden,
      placeholder,
      icon: Icon,
      type = 'text',
      className = 'Text',
      eye = false,
      isDate = false,
      optional = false,
      pasteAndDrop = true,
      textColors = {
        unfocused: '#6e4850',
        focused: '#d65881'
      },
      ...rest
    },
    ref
  ) => {
    const textRef = useRef<HTMLInputElement>(null)
    const form = useContext<FormState | null>(FormContext)
    const auxRef = (ref as RefObject<HTMLInputElement>) || textRef
    const [error, setError] = useState<string>()
    const [isFilled, setIsFilled] = useState(false)
    const [showInput, setShowInput] = useState(false)

    useEffect(() => {
      const input: Ref = {
        setError,
        inputRef: auxRef,
        type: isDate ? 'date' : type,
        value: isDate ? dateToValue(auxRef.current?.value) : undefined
      }

      form?.registerInput(input)
      return () => form?.removeInput(input)
    }, [auxRef, form, type, isDate, auxRef.current?.value])

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
        id={id}
        hasEye={!!eye}
        hidden={hidden}
        hasIcon={!!Icon}
        isFilled={isFilled}
        optional={optional}
        isErrored={!!error}
        colors={textColors}
        className={className}
        onFocus={() => textRef.current?.focus()}
      >
        <ErrorTooltip error={!!error} content={error} />

        {Icon && !error && (
          <IconSpace>
            <button type='button' onClick={() => textRef.current?.focus()}>
              <Icon />
            </button>
          </IconSpace>
        )}

        <input
          spellCheck='false'
          id={rest.name}
          ref={ref || textRef}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          placeholder={`${placeholder}${optional ? ' - Opcional ' : ''}`}
          {...rest}
        />

        {eye &&
          (showInput ? (
            <IconSpace>
              <EyeClosedIcon onClick={() => setShowInput(false)} />
            </IconSpace>
          ) : (
            <IconSpace>
              <EyeIcon onClick={() => setShowInput(true)} />
            </IconSpace>
          ))}
      </Style>
    )
  }
)

export default Text

Text.displayName = 'Text'
