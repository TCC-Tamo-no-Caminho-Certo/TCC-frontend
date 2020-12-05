import React, { FC, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { Info } from 'utils/formatUpdateUser'

import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import { Input, InputDate } from 'components/Form'

interface Props {
  theme: any
  data: Info
}

const Field: FC<Props> = ({ theme, data }) => {
  const [change, setChange] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const inputDateValue = (value: string) => {
    const old = value.split('-')
    return old[0] ? `${old[2]}/${old[1]}/${old[0]}` : ''
  }

  const input =
    data.inputname === 'birthday' ? (
      <InputDate
        name={data.inputname}
        value={`${inputDateValue(data.value as string)}`}
        noStyle
        className='InputDate'
      />
    ) : (
      <Input
        ref={inputRef}
        name={data.inputname}
        placeholder={data.dontShow ? `*********` : ''}
        defaultValue={data.dontShow ? '' : data.value}
        noStyle
        className='InputChange'
      />
    )

  useEffect(() => {
    if (change) inputRef.current?.focus()
  }, [change])

  const setInput = () => {
    if (change) return input
    return data.date ? inputDateValue(data.value as string) : data.value
  }

  return (
    <Style key={data.inputname} theme={theme} className='Field'>
      <button
        className='label'
        type='button'
        onClick={() => (change ? inputRef.current?.focus() : setChange(true))}
      >
        {data.label}
      </button>

      <div className='input'>
        <button
          type='button'
          onClick={() => (change ? inputRef.current?.focus() : setChange(true))}
        >
          {setInput()}
        </button>
      </div>

      <button className='icon' type='button' onClick={() => setChange(!change)}>
        {change ? <CloseIcon /> : <PencilIcon />}
      </button>
    </Style>
  )
}

export default Field
