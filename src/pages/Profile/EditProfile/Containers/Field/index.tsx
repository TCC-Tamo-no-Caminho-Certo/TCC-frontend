import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Icon, Input, Label } from './styles'

import { InputData } from '../formatUpdateUser'
import { EditProfileContext } from '../../index'

import { isoToDate } from 'utils/dates'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'

import { Datepicker, Text } from 'components/Form'

import { darken } from 'polished'
import { ThemeContext } from 'styled-components'

interface FieldProps {
  data: InputData
}

const Field = ({ data }: FieldProps) => {
  const { globalChange, setGlobalChange } = useContext(EditProfileContext)
  const theme = useContext(ThemeContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const [change, setChange] = useState(false)

  const { name, label, date, dontShow, value, editable } = data

  const input = date ? (
    <Datepicker
      isBirthday
      arrow='top'
      placeholder='Clique para alterar a data'
      name={name}
      dateColors={{
        body: theme.colors.secondary,
        header: darken(0.05, theme.colors.tertiary),
        selected: theme.colors.primary
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
    if (editable) {
      change ? inputRef.current?.focus() : setChange(true)
      globalChange === false && setGlobalChange && setGlobalChange(true)
    }
  }

  const onIconClick = () => {
    if (editable) {
      setChange(!change)
      globalChange === false && setGlobalChange && setGlobalChange(true)
    }
  }

  const setInput = () => {
    if (change) return input

    return (
      <div className='value'>
        {date ? isoToDate(value as string, 'all') : value}
      </div>
    )
  }

  useEffect(() => {
    change && inputRef.current?.focus()
  }, [change])

  useEffect(() => {
    !globalChange && setChange(false)
  }, [globalChange])

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
