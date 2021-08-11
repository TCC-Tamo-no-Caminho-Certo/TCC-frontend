import React from 'react'
import Style from './styles'

import Content from './Content'

import { HomeActions } from 'store/Sync/home'

import BackButton from 'components/BackButton'

import { useDispatch } from 'react-redux'

const ConfirmPassword = () => {
  const dispatch = useDispatch()

  const onBackButtonClick = () => {
    dispatch(HomeActions.update({ initial: false, page: 'login' }))
  }

  return (
    <Style>
      <BackButton to='/forgot-password' onClick={onBackButtonClick} />

      <Content />
    </Style>
  )
}

export default ConfirmPassword
