import React from 'react'

import { Style, Header, Form, Input } from './styles'

import { Button } from 'components/Form'

interface Props {
  formTitle: string
}

/*
 path do Form: informa qual a rota para onde será enviado a requisição
 callback: Função de submit (consultar o index do FormLogin)
*/

const FormRole: React.FC<Props> = ({ formTitle }) => {
  return (
    <Style>
      <Header>Solicitação de perfil</Header>

      <section>
        <span>{formTitle}</span>

        <Form path='user/complete-register' loading>
          <Input name='cpf' placeholder='CPF' />

          <p className='form-role-text'>
            A solicitação pode demorar um tempo pois será avaliada manualmente por um moderador
          </p>

          <Button>Enviar solicitação</Button>
        </Form>
      </section>
    </Style>
  )
}

export default FormRole

/*
curl --request POST \
  --url http://localhost:3030/api/user/complete-register \
  --header 'Authorization: Bearer 3ac0dd3a-864f-4b7c-abc6-f9908f21f92c' \
  --header 'Content-Type: application/json' \
  --data '{
  "cpf": "467-857-157-48",
  "role": "moderator",
  "form_data": {
    "name": "asd"
  }
}'

--- CÓDIGO PARA ALTERAÇÕES FUTURAS

          <Input name='university' placeholder='Universidade' />
          <Input name='curse' placeholder='Curso' />

          <p>Forma de comprovação</p>

          <Input name='university' placeholder='Email institucional' />

          <div className='form-role-description'>Ou</div>

          <Input name='university' placeholder='Upload de comprovante' />
*/
