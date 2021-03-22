import React, { useContext, useMemo } from 'react'

// import ProfileHome from './ProfileHome'
import EditProfile from './EditProfile'
// import Historic from './Historic'
// import Financial from './Financial'
// import Customization from './Customization'
// import Security from './Security'
import AddRole from './AddRole'

// import CardIcon from 'assets/ProfileSidebar/CardIcon'
import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
// import HistoryIcon from 'assets/ProfileSidebar/HistoryIcon'
// import PalleteIcon from 'assets/ProfileSidebar/PalleteIcon'
// import SecurityIcon from 'assets/ProfileSidebar/SecurityIcon'
// import UserIcon from 'assets/ProfileSidebar/UserIcon'
import MapIcon from 'assets/MainSidebar/MapIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ThemeContext } from 'styled-components'

const Profile = () => {
  const { sidebar } = useContext(ThemeContext)

  const profileRoutes: RouteProps[] = useMemo(
    () => [
      // {
      //   icon: () => <UserIcon />,
      //   label: 'Perfil',
      //   paths: ['/session/profile/home'],
      //   exact: true,
      //   component: () => <ProfileHome />
      // },
      {
        icon: () => <EditUserIcon />,
        label: 'Editar Perfil',
        paths: ['/session/profile/edit-profile'],
        component: () => <EditProfile />
      },
      {
        icon: () => <ChangeIcon />,
        label: 'Adicionar Papel',
        paths: [
          '/session/profile/change-role',
          '/session/profile/change-role/student',
          '/session/profile/change-role/customer',
          '/session/profile/change-role/professor',
          '/session/profile/change-role/evaluator',
          '/session/profile/change-role/moderator',
          '/session/profile/change-role/admin'
        ],
        exact: true,
        component: () => <AddRole />,
        isBigInOther: true
      },
      // {
      //   icon: () => <CardIcon />,
      //   label: 'Financeiro',
      //   paths: ['/session/profile/financial'],
      //   component: () => <Financial />
      // },
      // {
      //   icon: () => <SecurityIcon />,
      //   label: 'Segurança',
      //   paths: ['/session/profile/security'],
      //   component: () => <Security />
      // },
      // {
      //   icon: () => <HistoryIcon />,
      //   label: 'Histórico',
      //   paths: ['/session/profile/historic'],
      //   component: () => <Historic />
      // },
      // {
      //   icon: () => <PalleteIcon />,
      //   label: 'Customização',
      //   paths: ['/session/profile/customization'],
      //   component: () => <Customization />
      // },
      {
        icon: () => <MapIcon />,
        label: 'Voltar ao mapa',
        paths: ['/session/main/map'],
        bottom: true
      }
    ],
    []
  )

  return (
    <Sidebar
      title='Perfil'
      routes={profileRoutes}
      selected={sidebar.selected}
      background={sidebar.background}
      letters={sidebar.letters}
    />
  )
}

export default Profile
