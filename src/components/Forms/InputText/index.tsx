import React, { useRef, useEffect, useState, InputHTMLAttributes, ComponentType } from 'react'
import Style from './styles'

import { ErrorTooltip } from 'components/Tooltips/index'

import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: string

  icon?: ComponentType<IconBaseProps>
  eye?: boolean
  pasteAndDrop?: boolean

  iconSize?: string
  eyeSize?: string
  errorSize?: string
}

const InputText: React.FC<InputProps> = ({
  name,
  type,

  icon: Icon,
  eye = false,
  pasteAndDrop = true,

  eyeSize = '55%',
  iconSize = '40%',
  errorSize = '55%',
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const { defaultValue, fieldName, registerField, error, clearError } = useField(name)

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' })
  }, [fieldName, registerField])

  const onInputFocus = () => setIsFocused(true)

  const onInputBlur = () => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
    clearError()
  }

  return (
    <Style
      id={name}
      hasEye={eye}
      hasIcon={!!Icon}
      isFilled={isFilled}
      isErrored={!!error}
      isFocused={isFocused}
      eyeSize={eyeSize}
      iconSize={iconSize}
      errorSize={errorSize}
      className='InputText'
    >
      {error ? <ErrorTooltip content={error} /> : Icon && <Icon className='icon' />}

      <input
        ref={inputRef}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        defaultValue={defaultValue}
        type={showInput ? 'text' : type}
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
  )
}

export default InputText
