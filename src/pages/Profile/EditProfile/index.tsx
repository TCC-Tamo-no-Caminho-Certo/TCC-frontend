import React from 'react'
import Style from './styles'

import Slider from './Slider'
import navbarList from '../navbarList'

import LeftMenuPage from 'components/LeftMenuPage'

import { useSelector, RootState, ThemeState } from 'store'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={navbarList} selected='editProfile'>
      <Style theme={theme}>
        <Slider />
      </Style>
    </LeftMenuPage>
  )
}

export default EditProfile
