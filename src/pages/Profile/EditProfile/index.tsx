import React from 'react'
import Style, { Cover } from './styles'

import ProfileSection from '../ProfileSection'

import ContainerChange from 'components/ContainerChange/index'

import avatar from 'assets/avatarEditProfile.png'

const EditProfile: React.FC = () => {
  return (
    <ProfileSection selected='editProfile'>
      <Style>
        <Cover>
          <img src={avatar} alt='avatar' />
        </Cover>

        <form>
          <ContainerChange label='Nome' value='Miguel' />
          <ContainerChange label='Sobrenome' value='Andrade' />
          <ContainerChange label='E-mail' value='miguelandradebarreto2@gmail.com' />
          <ContainerChange label='Nascimento' value='19/08/2001' />
          <ContainerChange label='Senha' value='**********' />
        </form>
      </Style>
    </ProfileSection>
  )
}

export default EditProfile
