import React, {
  forwardRef,
  RefObject,
  ComponentType,
  FormEvent,
  FocusEvent,
  useRef,
  useState,
  useEffect,
} from 'react'

import { ErrorTooltip } from 'components/Tooltips/index'

import { IconBaseProps } from 'react-icons'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Checkbox from './Checkbox'
import { Field, CheckboxStyle, DefaultInput } from './styles'

export interface Ref {
  input: RefObject<HTMLInputElement>
  setError: (value: string) => void
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  eye?: boolean
  theme?: any
  noStyle?: boolean
  pasteAndDrop?: boolean
  icon?: ComponentType<IconBaseProps>
  handleValue?: (value: any) => void
  _setref?: (ref: Ref) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      _setref = () => {},
      eye,
      type,
      theme,
      onBlur,
      noStyle = false,
      className,
      handleValue,
      icon: Icon,
      pasteAndDrop,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const auxRef = (ref as RefObject<HTMLInputElement>) || inputRef
    const [error, setError] = useState<string>()
    const [showInput, setShowInput] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
      _setref({ input: auxRef, setError })
    }, [_setref, auxRef])

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
        theme={theme}
        hasEye={!!eye}
        hasIcon={!!Icon}
        isFilled={isFilled}
        isErrored={!!error}
        hidden={rest.hidden}
        className={className}
        {...{ onClick: type === 'checkbox' ? () => setChecked(!checked) : undefined }}
      >
        {error ? <ErrorTooltip content={error} /> : Icon && <Icon className='icon' />}

        {type === 'checkbox' && !noStyle && <Checkbox checked={checked} />}

        <input
          ref={ref || inputRef}
          id={rest.name}
          type={hiddenInput()}
          onBlur={onInputBlur}
          onSubmit={valueHandler}
          {...{ readOnly: type === 'checkbox' ? true : undefined }}
          {...{ checked: type === 'checkbox' ? checked : undefined }}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          {...rest}
        />

        {eye &&
          (showInput ? (
            <AiFillEyeInvisible onClick={() => setShowInput(false)} className='eyeIcon' />
          ) : (
            <AiFillEye onClick={() => setShowInput(true)} className='eyeIcon' />
          ))}
      </InputStyle>
    )
  }
)

export default Input

Input.displayName = 'Input'
