import React from 'react'
import Style from './styles'

import Content from './Content'

import { HomeActions } from 'store/home'

import BackButton from 'components/BackButton'

import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  return (
    <Style>
      <BackButton
        to='/home'
        onTap={() => {
          dispatch(
            HomeActions.update({
              initial: false,
              page: 'login'
            })
          )
        }}
      />

      <Content />
    </Style>
  )
}

export default ForgotPassword
