import React, { FC } from 'react'
import Style, { Change, Label, Value } from './styles'

import formatUpdateUser, { Info, Types } from 'utils/formatUpdateUser'

import { useDispatch, UserState } from 'store'
import { ModalsActions } from 'store/modals'

import editPencil from 'assets/editPencil.svg'

import { Input, InputDate } from 'components/Form'
import Card from 'components/Card'
import Avatar from 'components/User/Avatar'

interface Props {
  theme: any
  type: Types
  data: UserState
  headerText: string
}

const Field: FC<Props> = ({ theme, type, data, headerText }) => {
  const dispatch = useDispatch()

  const inputDateValue = (value: string) => {
    const old = value.split('-')
    return old[0] ? `${old[2]}/${old[1]}/${old[0]}` : ''
  }

  return (
    <Card headerText={headerText}>
      {type === 'baseUser' || type === 'user' ? (
        <Avatar size={128} onClick={() => dispatch(ModalsActions.setUser(true))} />
      ) : (
        <></>
      )}

      {formatUpdateUser(data, type).map((info: Info) => (
        <Style key={info.inputname} theme={theme}>
          <Label>
            <label htmlFor={info.inputname}>{info.label}</label>
          </Label>

          <Value>
            {info.inputname === 'birthday' ? (
              <InputDate
                name={info.inputname}
                value={`${inputDateValue(info.value as string)}`}
                noStyle
              />
            ) : (
              <Input
                name={info.inputname}
                placeholder={info.dontShow ? `*********` : ''}
                defaultValue={info.dontShow ? '' : info.value}
                noStyle
              />
            )}
          </Value>

          <Change>
            <label htmlFor={info.inputname}>
              <img src={editPencil} alt='edit' />
            </label>
          </Change>
        </Style>
      ))}
    </Card>
  )
}

export default Field
