import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Icon, Input, Label } from './styles'

import { InputData } from '../formatUpdateUser'
import { EditProfileContext } from '../../index'

import { isoToDate } from 'utils/dates'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import { Datepicker, Text } from 'components/Form'

import { ThemeContext } from 'styled-components'

interface FieldProps {
  data: InputData
}

const Field = ({ data }: FieldProps) => {
  const { globalChange, setGlobalChange } = useContext(EditProfileContext)
  const [change, setChange] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useContext(ThemeContext)

  const { name, label, date, dontShow, value, editable } = data

  const input =
    name === 'birthday' ? (
      <Datepicker
        isBirthday
        arrow='bottom'
        placeholder='Clique para alterar a data'
        name={name}
        dateColors={{
          body: theme.colors.secondary,
          header: theme.colors.tertiary,
          selected: theme.colors.primary
        }}
      />
    ) : (
      <Text
        ref={inputRef}
        name={name}
        placeholder=' '
        defaultValue={dontShow ? '' : value}
        eye={dontShow}
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
    if (change) inputRef.current?.focus()
  }, [change])

  useEffect(() => {
    if (!globalChange) setChange(false)
  }, [globalChange])

  return (
    <Style key={name} className='Field'>
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
