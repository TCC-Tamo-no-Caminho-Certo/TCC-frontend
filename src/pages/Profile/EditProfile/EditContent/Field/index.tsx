import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Icon, Input, Label } from './styles'

import { isoToDate } from 'utils/dates'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'

import { Checkbox, Datepicker, Select, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import { CheckboxForwardeds } from 'components/Form/Checkbox'

import { darken } from 'polished'
import { ThemeContext } from 'styled-components'

export interface FieldForwardeds {
  setChange: (_change: boolean) => void
}

export interface InputData {
  value?: any
  id?: string
  name: string
  label: string
  editable?: boolean
  dontShow?: boolean
  withEditIcon?: boolean
  onEditClick?: () => void
  type?: 'text' | 'date' | 'select' | 'checkbox'
  options?: Option[] | Promise<Option[] | undefined>
}

interface FieldProps {
  data: InputData
  globalEditing?: boolean
  setGlobalEditing?: Dispatch<SetStateAction<boolean | undefined>>
}

const Field = ({
  globalEditing,
  setGlobalEditing,
  data: {
    name,
    label,
    value,
    options,
    id = '',
    onEditClick,
    type = 'text',
    editable = true,
    dontShow = false,
    withEditIcon = false
  }
}: FieldProps) => {
  const theme = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>(null)
  const checkboxRef = useRef<CheckboxForwardeds>(null)

  const [change, setChange] = useState(false)

  const onFieldClick = () => {
    if (editable) change ? inputRef.current?.focus() : setChange(true)
  }

  const onIconClick = () => {
    if (type === 'checkbox') checkboxRef.current?.check(value)
    if (editable) setChange(!change)
  }

  const setInput = () => {
    if (change)
      switch (type) {
        case 'select':
          return (
            <Select name={name} options={options} placeholder='Selecione...' />
          )

        case 'date':
          return (
            <Datepicker
              isBirthday
              arrow='top'
              name={name}
              placeholder='Clique para alterar a data'
              dateColors={{
                body: theme.colors.secondary,
                selected: theme.colors.primary,
                header: darken(0.05, theme.colors.tertiary)
              }}
            />
          )

        case 'checkbox':
          return

        default:
          return (
            <Text
              inputId={id}
              name={name}
              ref={inputRef}
              eye={dontShow}
              placeholder=' '
              defaultValue={dontShow ? '' : value}
            />
          )
      }

    return (
      <div className='value'>
        {type === 'date' ? isoToDate(value as string, 'all') : value}
      </div>
    )
  }

  useEffect(() => {
    if (globalEditing !== undefined) {
      setChange(globalEditing)
      setGlobalEditing && setGlobalEditing(undefined)
    }
  }, [globalEditing, setGlobalEditing])

  useEffect(() => {
    change && inputRef.current?.focus()
  }, [change])

  useEffect(() => {
    if (type === 'checkbox') checkboxRef.current?.check(value)
  }, [type, value])

  const showIcon = () => {
    if ((editable && !withEditIcon) || (!editable && withEditIcon))
      return change ? (
        <CloseIcon />
      ) : (
        <PencilIcon onClick={() => onEditClick && onEditClick()} />
      )
    return <></>
  }

  return (
    <Style key={name} className='Field' isCheckbox={type === 'checkbox'}>
      <Label onClick={onFieldClick}>{label}</Label>

      <Input onClick={onFieldClick}>
        {type === 'checkbox' ? (
          <Checkbox name={name} ref={checkboxRef} disabled={!editable} />
        ) : (
          setInput()
        )}
      </Input>

      <Icon onClick={onIconClick}>{showIcon()}</Icon>
    </Style>
  )
}

export default Field
