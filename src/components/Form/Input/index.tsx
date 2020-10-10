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

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { ErrorTooltip } from 'components/Tooltips/index'
import { Style, StInput, CheckboxStyle } from './style'
import { IconBaseProps } from 'react-icons'
import Checkbox from './checkbox'

type Types =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

export interface Ref {
  input: RefObject<HTMLInputElement>
  setError: (value: string) => void
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  theme?: any
  type?: Types
  eye?: boolean
  noStyle?: boolean
  pasteAndDrop?: boolean
  icon?: ComponentType<IconBaseProps>
  handleValue?: (value: any) => void
  _setref?: (ref: Ref) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  _setref = t => {},
  eye,
  type,
  theme,
  onBlur,
  noStyle,
  className,
  handleValue,
  icon: Icon,
  pasteAndDrop,
  ...rest
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>()
  const [showInput, setShowInput] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [checked, setChecked] = useState(false)

  const auxRef = ref as RefObject<HTMLInputElement> || inputRef

  useEffect(() => {
    _setref({ input: auxRef, setError })
  }, [_setref])

  const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(e)
    setIsFilled(!!auxRef.current?.value)
    setError(undefined)
  }

  const valueHandler = (e: FormEvent) => {
    e.preventDefault()

    handleValue && handleValue(auxRef.current?.value)
  }

  const InputStyle = noStyle ? Style : type === 'checkbox' ? CheckboxStyle : StInput

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
        type={
          eye
            ? type === 'password'
              ? showInput
                ? 'text'
                : type
              : showInput
              ? type
              : 'password'
            : type
        }
        onSubmit={valueHandler}
        onBlur={onInputBlur}
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
})

export default Input
