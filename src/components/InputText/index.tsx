import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  InputHTMLAttributes,
  ComponentType,
} from 'react'
import { Style } from './styles'
import { ErrorTooltip } from 'components/Tooltips/index'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  icon?: ComponentType<IconBaseProps>
  size?: number
  eye?: boolean
}

const InputText: React.FC<InputProps> = ({
  name,
  type,
  icon: Icon,
  size,
  eye = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const { defaultValue, fieldName, registerField, error, clearError } = useField(name)

  const onInputFocus = useCallback(() => setIsFocused(true), [])

  const onInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
    clearError()
  }, [clearError])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Style
      hasIcon={!!Icon}
      isFilled={isFilled}
      isErrored={!!error}
      isFocused={isFocused}
      className='InputText'
      id={name}
    >
      {error ? <ErrorTooltip content={error} /> : Icon && <Icon size={size} />}

      <input
        ref={inputRef}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        defaultValue={defaultValue}
        type={showInput ? 'text' : type}
        {...rest}
      />

      {eye &&
        (showInput ? (
          <AiFillEyeInvisible onClick={() => setShowInput(false)} size={22} />
        ) : (
          <AiFillEye onClick={() => setShowInput(true)} size={22} />
        ))}
    </Style>
  )
}

export default InputText
