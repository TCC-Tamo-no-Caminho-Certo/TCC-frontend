import React, { FC, memo } from 'react'

import Field from './Field'

import { RootState, UserState, useSelector } from 'store'

import Slider from 'components/Slider'

interface Props {
  theme: any
}

const Fields: FC<Props> = ({ theme }) => {
  const user = useSelector<RootState, UserState>(state => state.user)

  return (
    <Slider width={550} gap={200} gapVertical={100}>
      <Field
        key='Personal'
        theme={theme}
        type={user.role === 'baseUser' ? 'baseUser' : 'user'}
        data={user}
        headerText='Dados Pessoais'
      />
      <Field
        key='Professor'
        theme={theme}
        type='professor'
        data={user}
        headerText='Dados de Professor'
      />
      <Field
        key='Student'
        theme={theme}
        type='student'
        data={user}
        headerText='Dados de Estudante'
      />
    </Slider>
  )
}

export default memo(Fields)
