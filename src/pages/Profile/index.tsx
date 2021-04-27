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
      //   label: 'Perfil',
      //   exact: true,
      //   icon: () => <UserIcon />,
      //   component: () => <ProfileHome />,
      //   paths: ['/session/profile/home'],
      // },
      {
        label: 'Editar Perfil',
        icon: () => <EditUserIcon />,
        component: () => <EditProfile />,
        paths: ['/session/profile/edit-profile']
      },
      {
        label: 'Adicionar Papel',
        exact: true,
        isBigInOther: true,
        icon: () => <ChangeIcon />,
        component: () => <AddRole />,
        paths: [
          '/session/profile/change-role',
          '/session/profile/change-role/student',
          '/session/profile/change-role/customer',
          '/session/profile/change-role/professor',
          '/session/profile/change-role/evaluator',
          '/session/profile/change-role/moderator',
          '/session/profile/change-role/admin'
        ]
      },
      // {
      //   label: 'Financeiro',
      //   icon: () => <CardIcon />,
      //   component: () => <Financial />
      //   paths: ['/session/profile/financial'],
      // },
      // {
      //   label: 'Segurança',
      //   icon: () => <SecurityIcon />,
      //   component: () => <Security />
      //   paths: ['/session/profile/security'],
      // },
      // {
      //   label: 'Histórico',
      //   icon: () => <HistoryIcon />,
      //   component: () => <Historic />
      //   paths: ['/session/profile/historic'],
      // },
      // {
      //   label: 'Customização',
      //   icon: () => <PalleteIcon />,
      //   component: () => <Customization />
      //   paths: ['/session/profile/customization'],
      // },
      {
        label: 'Voltar ao mapa',
        bottom: true,
        icon: () => <MapIcon />,
        paths: ['/session/main/map']
      }
    ],
    []
  )

  return (
    <Sidebar
      title='Perfil'
      routes={profileRoutes}
      letters={sidebar.letters}
      selected={sidebar.selected}
      background={sidebar.background}
    />
  )
}

export default Profile
