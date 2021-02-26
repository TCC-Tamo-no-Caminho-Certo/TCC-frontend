import React, { useEffect, useRef, useState } from 'react'
import Style from './styles'

import { InputData } from '../formatUpdateUser'

import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import { Datepicker, Text } from 'components/Form'

import { useSelector } from 'react-redux'

interface FieldProps {
  data: InputData
}

const inputDateValue = (value: string) => {
  const old = value.split('-')
  return old[0] ? `${old[2]}/${old[1]}/${old[0]}` : ''
}

const Field = ({ data }: FieldProps) => {
  const [change, setChange] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const input =
    data.inputname === 'birthday' ? (
      <Datepicker
        isBirthday
        arrow='bottom'
        ref={inputRef}
        name={data.inputname}
        bodyColor={theme.colors.secondary}
        headerColor={theme.colors.tertiary}
        selectedColor={theme.colors.primary}
      />
    ) : (
      <Text
        ref={inputRef}
        name={data.inputname}
        placeholder={data.dontShow ? '*********' : ''}
        defaultValue={data.dontShow ? '' : data.value}
      />
    )

  const setInput = () => {
    if (change) return input

    return data.date ? (
      inputDateValue(data.value as string)
    ) : (
      <div id='value'>{data.value}</div>
    )
  }

  useEffect(() => {
    if (change) inputRef.current?.focus()
  }, [change])

  return (
    <Style key={data.inputname} className='Field'>
      <button
        className='label'
        type='button'
        onClick={() => (change ? inputRef.current?.focus() : setChange(true))}
      >
        {data.label}
      </button>

      <button
        type='button'
        className='input'
        onClick={() => (change ? inputRef.current?.focus() : setChange(true))}
      >
        {setInput()}
      </button>

      <button className='icon' type='button' onClick={() => setChange(!change)}>
        {change ? <CloseIcon /> : <PencilIcon />}
      </button>
    </Style>
  )
}

export default Field
