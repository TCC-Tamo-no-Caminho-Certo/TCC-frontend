import React, { useEffect, useState } from 'react'
import Style from './styles'
import { Form, Button } from 'components/Form'

import { Header } from '../styles'
import ChangeSetter from '../ChangeSetter'

import avatar from 'assets/avatar.jpg'
import api from 'services/api'

const Professor: React.FC = () => {
  const [user, setUser] = useState<any>()
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get('user/get', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('@SLab_ac_token')}`
        }
      })
      setUser(data.user)
    }
    getData()
  }, [])

  return (
    <Style>
      <Header>Dados do professor</Header>

      <img src={avatar} alt='avatar' draggable={false} />

      <Form path=''>
        <ChangeSetter label='Nome:' name='name' value={user?.name} />
        <ChangeSetter label='Sobrenome:' name='surname' value={user?.surname} />
        <ChangeSetter label='E-mail:' name='email' value={user?.email} />
        <ChangeSetter label='Nascimento:' name='birthday' value={user?.birthday} />
        <ChangeSetter label='Senha:' name='password' value='**********' />
        <Button>a</Button>
      </Form>
    </Style>
  )
}

export default Professor
