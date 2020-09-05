import React from 'react'
import Style from './styles'

import ProfileSection from './ProfileSection'

const Profile: React.FC = () => {
  return (
    <ProfileSection selected='home'>
      <Style>
        <h1>Profile</h1>
      </Style>
    </ProfileSection>
  )
}

export default Profile
