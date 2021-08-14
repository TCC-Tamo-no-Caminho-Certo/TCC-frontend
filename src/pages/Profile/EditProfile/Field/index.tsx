import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Icon, Input, Label } from './styles'

import { isoToDate } from 'utils/dates'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'

import { Datepicker, Text } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

import { darken } from 'polished'
import { ThemeContext } from 'styled-components'

export interface InputData {
  value?: any
  name: string
  label: string
  date?: boolean
  editable?: boolean
  dontShow?: boolean
}

interface FieldProps {
  data: InputData
}

const Field = ({
  data: { name, label, value, editable = true, date = false, dontShow = false }
}: FieldProps) => {
  const theme = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const [change, setChange] = useState(false)
  const input = date ? (
    <Datepicker
      isBirthday
      arrow='top'
      placeholder='Clique para alterar a data'
      name={name}
      dateColors={{
        body: theme.colors.secondary,
        selected: theme.colors.primary,
        header: darken(0.05, theme.colors.tertiary)
      }}
    />
  ) : (
    <Text
      placeholder=' '
      name={name}
      ref={inputRef}
      eye={dontShow}
      defaultValue={dontShow ? '' : value}
    />
  )

  const onFieldClick = () => {
    if (editable) change ? inputRef.current?.focus() : setChange(true)
  }

  const onIconClick = () => {
    if (editable) setChange(!change)
  }

  const setInput = () => {
    if (change) return input

    return value === undefined ? (
      <DotsLoader />
    ) : (
      <div className='value'>
        {date ? isoToDate(value as string, 'all') : value}
      </div>
    )
  }

  useEffect(() => {
    change && inputRef.current?.focus()
  }, [change])

  return (
    <Style className='Field' key={name}>
      <Label className='button' onClick={onFieldClick}>
        {label}
      </Label>

      <Input className='button' onClick={onFieldClick}>
        {setInput()}
      </Input>

      <Icon className='button' onClick={onIconClick}>
        {editable ? change ? <CloseIcon /> : <PencilIcon /> : <></>}
      </Icon>
    </Style>
  )
}

export default Field
