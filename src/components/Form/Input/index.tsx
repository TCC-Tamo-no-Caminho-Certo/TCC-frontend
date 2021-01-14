import React, {
  FocusEvent,
  FormEvent,
  forwardRef,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CheckboxStyle, DefaultInput, Field } from './styles'

import FormContext, { FormState } from '../Form/FormContext'
import Checkbox from '../Checkbox'

import EyeClosedIcon from 'assets/Inputs/EyeClosedIcon'
import EyeIcon from 'assets/Inputs/EyeIcon'

import ErrorTooltip from 'components/Tooltips'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  eye?: boolean
  noStyle?: boolean
  pasteAndDrop?: boolean
  icon?: () => JSX.Element
  handleValue?: (value: any) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      eye,
      type,
      onBlur,
      noStyle = false,
      className = 'Input',
      handleValue,
      icon: Icon,
      pasteAndDrop = true,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const auxRef = (ref as RefObject<HTMLInputElement>) || inputRef

    const [showInput, setShowInput] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [checked, setChecked] = useState(false)
    const [error, setError] = useState<string>()

    const form = useContext<FormState | null>(FormContext)

    useEffect(() => {
      const input = {
        input: auxRef,
        setError,
      }

      form?.setRef(input)

      return () => form?.removeRef(input)
    }, [auxRef, form])

    const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e)
      setIsFilled(!!auxRef.current?.value)
      setError(undefined)
    }

    const valueHandler = (e: FormEvent) => {
      e.preventDefault()
      handleValue && handleValue(auxRef.current?.value)
    }

    const setInputStyle = () => {
      if (noStyle) return DefaultInput
      if (type === 'checkbox') return CheckboxStyle
      return Field
    }

    const hiddenInput = () => {
      if (eye) return showInput ? 'text' : 'password'

      return type
    }

    const InputStyle = setInputStyle()

    return (
      <InputStyle
        theme={form?.theme}
        hasEye={!!eye}
        hasIcon={!!Icon}
        isFilled={isFilled}
        isErrored={!!error}
        hidden={rest.hidden}
        className={className}
        onFocus={() => inputRef.current?.focus()}
        {...{
          onClick: type === 'checkbox' ? () => setChecked(!checked) : undefined,
        }}
      >
        {error ? (
          <div className='iconSpace'>
            <ErrorTooltip theme={form?.theme} content={error} />
          </div>
        ) : (
          Icon && (
            <div className='iconSpace'>
              <button type='button' onClick={() => inputRef.current?.focus()}>
                <Icon />
              </button>
            </div>
          )
        )}

        {type === 'checkbox' && !noStyle && <Checkbox theme={form?.theme} checked={checked} />}

        <input
          spellCheck='false'
          ref={ref || inputRef}
          id={rest.name}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onSubmit={valueHandler}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          {...{
            readOnly: type === 'checkbox' ? true : undefined,
          }}
          {...{
            checked: type === 'checkbox' ? checked : undefined,
          }}
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
      </InputStyle>
    )
  }
)

export default Input

Input.displayName = 'Input'
