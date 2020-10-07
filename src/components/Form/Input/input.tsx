import React, {
  FC,
  HTMLProps,
  ComponentType,
  RefObject,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { ErrorTooltip } from 'components/Tooltips/index'

import { Style, CheckboxStyle } from './style'

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

export interface InputProps extends HTMLProps<HTMLInputElement> {
  theme?: any

  type?: Types

  eye?: boolean

  icon?: ComponentType<IconBaseProps>

  pasteAndDrop?: boolean

  handleValue?: (value: any) => void

  _setref?: (ref: Ref) => void
}

const Input: FC<InputProps> = ({
  _setref = t => {},

  eye,

  type,

  theme,

  className,

  handleValue,

  icon: Icon,

  pasteAndDrop,

  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string>()

  const [showInput, setShowInput] = useState(false)

  const [isFilled, setIsFilled] = useState(false)

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    _setref({ input: inputRef, setError })
  }, [_setref])

  const onInputBlur = () => {
    setIsFilled(!!inputRef.current?.value)

    setError(undefined)
  }

  const valueHandler = (e: FormEvent) => {
    e.preventDefault()

    handleValue && handleValue(inputRef.current?.value)
  }

  const InputStyle = type === 'checkbox' ? CheckboxStyle : Style

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

      {type === 'checkbox' && <Checkbox checked={checked} />}

      <input
        ref={inputRef}
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
}

export default Input
