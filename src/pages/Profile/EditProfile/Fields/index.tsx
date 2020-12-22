import React, { memo, useContext } from 'react'

import Field from './Field'
import { ModalContext } from '../'

import formatUpdateUser, { InputData } from 'utils/formatUpdateUser'
import selectedRoleLabel from 'utils/selectedRoleLabel'

import { RootState, UserState, useSelector } from 'store'

import Avatar from 'components/User/Avatar'
import Card from 'components/Card'
import Slider from 'components/Slider'

const Fields: React.FC = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const modal = useContext(ModalContext)

  return (
    <Slider width={550} gap={200} gapVertical={100}>
      {user.roles.map(role => {
        if (role === 'guest') {
          return (
            <Card key={role} headerText='Dados Pessoais'>
              <Avatar
                border
                size={128}
                onClick={() => modal?.setShow(true)}
                loaderColor='#D65881'
                shadow
              />

              {formatUpdateUser(user, 'guest').map((info: InputData) => (
                <Field key={info.inputname} data={info} />
              ))}
            </Card>
          )
        }

        return (
          <Card key={role} headerText={`Dados de ${selectedRoleLabel(role)}`}>
            {formatUpdateUser(user, role).map((info: InputData) => (
              <Field key={info.inputname} data={info} />
            ))}
          </Card>
        )
      })}
    </Slider>
  )
}

export default memo(Fields)
