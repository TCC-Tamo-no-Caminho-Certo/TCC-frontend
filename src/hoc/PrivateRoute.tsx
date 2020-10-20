import React, { useEffect } from 'react'

import api from 'services/api'

import { UserActions } from 'store/user'
import { useDispatch } from 'store'

interface RouteProps {
  children: React.ReactElement[] | React.ReactElement
}

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('@SLab_ac_token')

    api
      .get('user/get', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        dispatch(UserActions.userInfo(res.user))
      })
  }, [dispatch])

  return <>{children}</>
}

export default PrivateRoute
