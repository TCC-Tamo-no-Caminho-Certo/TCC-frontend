import React, { useEffect, useState } from 'react'

import validateSession from 'utils/validateSession'

import { useDispatch } from 'store'
import { UserActions } from 'store/user'

import { useHistory } from 'react-router-dom'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

const Logged: React.FC<Props> = ({ children }) => {
  const [firstTime, setFirstTime] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    validateSession().then(response => {
      console.log('a')

      setFirstTime(false)

      if (response) {
        dispatch(UserActions.setValidated(true))

        history.push('/session/main')
      }
    })
  }, [history, dispatch])

  return <>{firstTime || children}</>
}

export default Logged
