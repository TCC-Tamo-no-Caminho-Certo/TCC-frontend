import React, { useEffect, useRef, useState } from 'react'
import { DefaultField, EditField } from './styles'

import CloseIcon from 'assets/global/CloseIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'

import { Datepicker, Text } from 'components/Form'
import { TextProps } from 'components/Form/Text'
import { DatepickerProps } from 'components/Form/Datepicker'

interface FieldProps {
  icon?: any
  defaultValue?: any
  textProps?: TextProps
  enableToEdit?: boolean
  onFieldClick?: () => void
  onCloseClick?: () => void
  inputType?: 'text' | 'datepicker'
  datepickerProps?: DatepickerProps
}

const Field = ({
  textProps,
  icon: Icon,
  onCloseClick,
  onFieldClick,
  defaultValue,
  datepickerProps,
  inputType = 'text',
  enableToEdit = true
}: FieldProps) => {
  const [editing, setEditing] = useState(false)

  const datepickerRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  const onCloseIconClick = () => {
    onCloseClick && onCloseClick()
    setEditing(false)
  }

  const onPencilClick = () => {
    onFieldClick && onFieldClick()
    setEditing(true)
  }

  useEffect(() => {
    if (enableToEdit) {
      inputType === 'text' && textRef.current?.focus()

      setTimeout(
        () => inputType === 'datepicker' && datepickerRef.current?.click(),
        300
      )
    }
  }, [enableToEdit, inputType])

  return editing || !defaultValue ? (
    <EditField
      className='Field'
      data-cy={`Field-${textProps?.name || datepickerProps?.name}`}
    >
      {Icon && <Icon id='icon' />}

      {inputType === 'text' && <Text ref={textRef} {...(textProps as any)} />}

      {inputType === 'datepicker' && (
        <Datepicker ref={datepickerRef} {...(datepickerProps as any)} />
      )}

      {defaultValue && <CloseIcon id='closeIcon' onClick={onCloseIconClick} />}
    </EditField>
  ) : (
    <DefaultField
      className='DefaultField'
      data-cy={`DefaultField-${textProps?.name || datepickerProps?.name}`}
    >
      <div>{defaultValue}</div>

      {enableToEdit && <PencilIcon onClick={onPencilClick} />}
    </DefaultField>
  )
}

export default Field
