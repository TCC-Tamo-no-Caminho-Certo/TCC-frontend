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
import { IconBaseProps } from 'react-icons'
import { Style } from './style'

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
  handleValue,
  icon: Icon,
  pasteAndDrop,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>()
  const [showInput, setShowInput] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)


  useEffect(() => {
    _setref({ input: inputRef, setError })
  }, [_setref])

  const onInputFocus = () => setIsFocused(true)

  const onInputBlur = () => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
    setError(undefined)
  }

  const valueHandler = (e: FormEvent) => {
    e.preventDefault()
    handleValue && handleValue(inputRef.current?.value)
  }

  return (
    <>
      {!rest.hidden ? (
        <Style
          theme={theme}
          hasEye={!!eye}
          hasIcon={!!Icon}
          isFilled={isFilled}
          isErrored={!!error}
          isFocused={isFocused}
        >
          {error ? <ErrorTooltip content={error} /> : Icon && <Icon className='icon' />}
          <input
            ref={inputRef}
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
            onFocus={onInputFocus}
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
        </Style>
      ) : (
        <input
          ref={inputRef}
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
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          onPaste={event => pasteAndDrop || event?.preventDefault()}
          onDrop={event => pasteAndDrop || event?.preventDefault()}
          {...rest}
        />
      )}
    </>
  )
}

export default Input
