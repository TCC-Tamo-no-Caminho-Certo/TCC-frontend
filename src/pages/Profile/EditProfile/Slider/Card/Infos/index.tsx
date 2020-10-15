import React from 'react'

import Style, { Label, Value, Change } from './styles'

import { Form, Input, Button } from 'components/Form'
import editPencil from 'assets/editPencil.svg'

export interface Info {
  label: string
  value: string
  inputname: string
  dontShow?: boolean
}

interface Props {
  userData: Info[]
}

const Professor: React.FC<Props> = ({ userData }) => {
  return (
    <Form path=''>
      {userData.map((info: Info, i) => (
        <Style key={i}>
          <Label><label htmlFor={info.inputname}>{info.label}</label></Label>
          <Value><Input name={info.inputname} defaultValue={info.dontShow ? `*********` : info.value} noStyle /></Value>
          <Change><img src={editPencil} alt='edit' /></Change>
        </Style>
      ))}

      <Button>Submit</Button>
    </Form>
  )
}

export default Professor
