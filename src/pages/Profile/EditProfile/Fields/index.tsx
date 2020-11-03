import React, { FC, memo } from 'react'

import Field from './Field'

import formatUpdateUser, { Info, Types } from 'utils/formatUpdateUser'

import { RootState, useDispatch, UserState, useSelector } from 'store'
import { ModalsActions } from 'store/modals'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'

interface Props {
  theme: any
}

const Fields: FC<Props> = ({ theme }) => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const dispatch = useDispatch()

  return (
    <Slider width={550} gap={200} gapVertical={100}>
      <Card key='Personal' headerText='Dados Pessoais'>
        <Avatar size={128} onClick={() => dispatch(ModalsActions.setUser(true))} />

        {formatUpdateUser(user, user.role === 'baseUser' ? 'baseUser' : 'user').map(
          (info: Info) => (
            <Field key={info.inputname} theme={theme} data={info} />
          )
        )}
      </Card>

      <Card key='Professor' headerText='Dados de Professor'>
        {formatUpdateUser(user, 'professor').map((info: Info) => (
          <Field key={info.inputname} theme={theme} data={info} />
        ))}
      </Card>

      <Card key='Student' headerText='Dados de Estudante'>
        {formatUpdateUser(user, 'student').map((info: Info) => (
          <Field key={info.inputname} theme={theme} data={info} />
        ))}
      </Card>
    </Slider>
  )
}

export default memo(Fields)
