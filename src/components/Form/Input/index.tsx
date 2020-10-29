import React, {
  ComponentType,
  FocusEvent,
  FormEvent,
  forwardRef,
  memo,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react'
import { CheckboxStyle, DefaultInput, Field } from './styles'

import FormContext, { FormState } from '../Form/FormContext'
import Checkbox from '../Checkbox'

import ErrorTooltip from 'components/Tooltips'

import { IconBaseProps } from 'react-icons'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  eye?: boolean
  noStyle?: boolean
  pasteAndDrop?: boolean
  icon?: ComponentType<IconBaseProps>
  handleValue?: (value: any) => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      eye,
      type,
      onBlur,
      noStyle = false,
      className,
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

    form?.setRef({
      input: auxRef,
      setError,
    })

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
        {...{
          onClick: type === 'checkbox' ? () => setChecked(!checked) : undefined,
        }}
      >
        {error ? (
          <ErrorTooltip theme={form?.theme} content={error} />
        ) : (
          Icon && <Icon className='icon' />
        )}

        {type === 'checkbox' && !noStyle && <Checkbox theme={form?.theme} checked={checked} />}

        <input
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
            <AiFillEyeInvisible onClick={() => setShowInput(false)} className='eyeIcon' />
          ) : (
            <AiFillEye className='eyeIcon' onClick={() => setShowInput(true)} />
          ))}
      </InputStyle>
    )
  }
)

export default memo(Input)

Input.displayName = 'Input'
