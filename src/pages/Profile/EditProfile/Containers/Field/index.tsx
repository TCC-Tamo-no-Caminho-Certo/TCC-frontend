import React, { useEffect, useRef, useState } from 'react'
import Style from './styles'

import { InputData } from '../formatUpdateUser'

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

  return (
    <Style key={data.inputname} className='Field'>
      <button
        type='button'
        className='label'
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
