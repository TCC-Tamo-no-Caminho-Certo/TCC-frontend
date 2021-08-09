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
  enableEdit?: boolean
  textProps?: TextProps
  conditionToEdit?: boolean
  inputType?: 'text' | 'datepicker'
  datepickerProps?: DatepickerProps
  onFieldClick?: () => void
  onCloseClick?: () => void
}

const Field = ({
  textProps,
  icon: Icon,
  onCloseClick,
  onFieldClick,
  defaultValue,
  datepickerProps,
  inputType = 'text',
  enableEdit = true,
  conditionToEdit
}: FieldProps) => {
  const [condition, setCondition] = useState(!defaultValue)

  const datepickerRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (enableEdit) {
      inputType === 'text' && textRef.current?.focus()

      setTimeout(
        () => inputType === 'datepicker' && datepickerRef.current?.click(),
        300
      )
    }
  }, [conditionToEdit, enableEdit, inputType])

  return conditionToEdit || condition ? (
    <EditField id='editField' className='Field'>
      {Icon && <Icon id='icon' />}

      {inputType === 'text' && <Text ref={textRef} {...(textProps as any)} />}

      {inputType === 'datepicker' && (
        <Datepicker ref={datepickerRef} {...(datepickerProps as any)} />
      )}

      {defaultValue && (
        <CloseIcon
          id='closeIcon'
          onClick={() => {
            onCloseClick && onCloseClick()
            conditionToEdit === undefined && setCondition(false)
          }}
        />
      )}
    </EditField>
  ) : (
    <DefaultField
      className='Field'
      id='defaultField'
      style={{ cursor: enableEdit ? 'pointer' : 'default' }}
      onClick={() => {
        onFieldClick && onFieldClick()
        if (!enableEdit) conditionToEdit === undefined && setCondition(true)
      }}
    >
      {conditionToEdit && <PencilIcon />}

      {defaultValue}
    </DefaultField>
  )
}

export default Field
