import React, { useEffect, useState } from 'react'

import validateSession from 'utils/validateSession'

import { useHistory } from 'react-router-dom'

interface Props {
  children: React.ReactElement[] | React.ReactElement
}

const Logged: React.FC<Props> = ({ children }) => {
  const [firstTime, setFirstTime] = useState(true)
  const history = useHistory()

  useEffect(() => {
    validateSession().then(response => {
      setFirstTime(false)
      response && history.push('/main')
    })
  }, [history])

  return <>{firstTime || children}</>
}

export default Logged
