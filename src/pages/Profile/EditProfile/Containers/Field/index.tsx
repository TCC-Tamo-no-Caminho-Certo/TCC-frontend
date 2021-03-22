import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Icon, Input, Label } from './styles'

import { InputData } from '../formatUpdateUser'
import { EditProfileContext } from '../../index'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import { Datepicker, Text } from 'components/Form'
import { valueToDate } from 'components/Form/Datepicker'

import { useSelector } from 'react-redux'

interface FieldProps {
  data: InputData
}

const Field = ({ data }: FieldProps) => {
  const { globalChange, setGlobalChange } = useContext(EditProfileContext)
  const [change, setChange] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const input =
    data.inputname === 'birthday' ? (
      <Datepicker
        isBirthday
        arrow='bottom'
        name={data.inputname}
        bodyColor={theme.colors.secondary}
        headerColor={theme.colors.tertiary}
        selectedColor={theme.colors.primary}
        placeholder='Clique para alterar a data'
      />
    ) : (
      <Text
        ref={inputRef}
        name={data.inputname}
        placeholder={data.dontShow ? '********' : ''}
        defaultValue={data.dontShow ? '' : data.value}
      />
    )

  const onFieldClick = () => {
    change ? inputRef.current?.focus() : setChange(true)
    globalChange === false && setGlobalChange && setGlobalChange(true)
  }

  const onIconClick = () => {
    setChange(!change)
    globalChange === false && setGlobalChange && setGlobalChange(true)
  }

  const setInput = () => {
    if (change) return input

    return (
      <div className='value'>
        {data.date ? valueToDate(data.value as string) : data.value}
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
    <Style key={data.inputname} className='Field'>
      <Label className='button' onClick={onFieldClick}>
        {data.label}
      </Label>

      <Input className='button' onClick={onFieldClick}>
        {setInput()}
      </Input>

      <Icon className='button' onClick={onIconClick}>
        {change ? <CloseIcon /> : <PencilIcon />}
      </Icon>
    </Style>
  )
}

export default Field
