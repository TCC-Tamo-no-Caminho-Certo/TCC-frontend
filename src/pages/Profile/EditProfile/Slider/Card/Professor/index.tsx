import React from 'react'

import Style, { Label, Value, Change } from './styles'

import { Form, Input, Button } from 'components/Form'
import editPencil from 'assets/editPencil.svg'

const Professor: React.FC<any> = ({user}) => {
  return (
    <Form path=''>
      <Style>
        <Label><label htmlFor='name'>Nome:</label></Label>
        <Value><Input name='name' defaultValue={user?.name} noStyle /></Value>
        <Change><img src={editPencil} alt='edit' /></Change>
      </Style>

      <Style>
        <Label><label htmlFor='surname'>Sobrenome:</label></Label>
        <Value><Input name='surname' defaultValue={user?.surname} noStyle /></Value>
        <Change><img src={editPencil} alt='edit' /></Change>
      </Style>

      <Style>
        <Label><label htmlFor='email'>E-mail:</label></Label>
        <Value><Input name='email' defaultValue={user?.email} noStyle /></Value>
        <Change><img src={editPencil} alt='edit' /></Change>
      </Style>

      <Style>
        <Label><label htmlFor='birthday'>Nascimento:</label></Label>
        <Value><Input name='birthday' defaultValue={user?.birthday} noStyle /></Value>
        <Change><img src={editPencil} alt='edit' /></Change>
      </Style>

      <Style>
        <Label><label htmlFor='password'>Senha:</label></Label>
        <Value><Input name='password' defaultValue='**********' noStyle /></Value>
        <Change><img src={editPencil} alt='edit' /></Change>
      </Style>

      <Button>Submit</Button>
    </Form>
  )
}

export default Professor
