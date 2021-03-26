import React from 'react'
import Style from './styles'

import { File, Form } from 'components/Form'

const RestOfHome = () => {
  return (
    <Style>
      <Form path='#' getData={e => console.log(e)}>
        <File name='teste' label='teste' />
      </Form>
    </Style>
  )
}

export default RestOfHome
