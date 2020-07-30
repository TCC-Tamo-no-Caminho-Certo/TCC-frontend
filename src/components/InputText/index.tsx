import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  InputHTMLAttributes,
  ComponentType,
} from 'react'
import { Style } from './styles'
import ReactTooltip from 'react-tooltip'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FcHighPriority } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  eye?: boolean
  icon?: ComponentType<IconBaseProps>
}

const InputText: React.FC<InputProps> = ({
  name,
  icon: Icon,
  eye = false,
  type,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const {
    defaultValue,
    fieldName,
    registerField,
    error,
    clearError,
  } = useField(name)

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
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      hasIcon={!!Icon}
      className='InputText'
      id={name}
    >
      {error ? (
        <>
          <ReactTooltip
            id={fieldName}
            className='alert'
            place='top'
            type='error'
            effect='solid'
          >
            {error}
          </ReactTooltip>
          <FcHighPriority data-for={fieldName} data-tip />
        </>
      ) : (
        Icon && <Icon />
      )}

      <input
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        type={showInput ? 'text' : type}
        {...rest}
      />

      {eye &&
        (showInput ? (
          <AiFillEyeInvisible onClick={() => setShowInput(false)} />
        ) : (
          <AiFillEye onClick={() => setShowInput(true)} />
        ))}
    </Style>
  )
}

export default InputText
