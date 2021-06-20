import React from 'react'
import Form from './styles'

import DateField from './DateField'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import { Submit } from 'components/Form'

import { useSelector } from 'react-redux'

interface Periods {
  confirm: number
  dispatch: number
  evaluate: number
  in_progress: number
}

interface DatesTableProps {
  periods: Periods
}

const DatesTable = ({ periods }: DatesTableProps) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const isAdmin = user.selectedRole === 'admin'

  const { evaluate, in_progress, confirm, dispatch } = periods
  const periodsArray = [dispatch, evaluate, confirm, in_progress]

  return (
    <Form>
      <table>
        <thead>
          <tr>
            <th>Período</th>

            <th>Data de início</th>
          </tr>
        </thead>

        <tbody>
          {periodsArray.map((period, index) => {
            let name
            if (index === 0) name = 'dispatch'
            else if (index === 1) name = 'evaluate'
            else if (index === 2) name = 'confirm'
            else name = 'in_progress'

            return (
              <DateField
                key={index}
                name={name}
                default={period}
                isAdmin={isAdmin}
              />
            )
          })}
        </tbody>
      </table>

      {isAdmin && <Submit>Salvar alterações</Submit>}
    </Form>
  )
}

export default DatesTable
