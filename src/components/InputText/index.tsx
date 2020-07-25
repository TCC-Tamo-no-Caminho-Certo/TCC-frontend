import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  InputHTMLAttributes,
  ComponentType,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'
import { FcHighPriority } from 'react-icons/fc'
import ReactTooltip from 'react-tooltip'
import { Style } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: ComponentType<IconBaseProps>
}

const InputText: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    defaultValue,
    fieldName,
    registerField,
    error,
    clearError,
  } = useField(name)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

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
    >
      {error ? (
        <>
          <FcHighPriority data-tip data-for={fieldName} />
          <ReactTooltip
            id={fieldName}
            className='alert'
            place='top'
            type='error'
            effect='solid'
          >
            {error}
          </ReactTooltip>
        </>
      ) : (
        Icon && <Icon />
      )}

      <input
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </Style>
  )
}

export default InputText
