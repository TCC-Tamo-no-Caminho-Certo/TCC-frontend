import home from 'assets/ProfileNavbar/home.svg'
import security from 'assets/ProfileNavbar/security.svg'
import historic from 'assets/ProfileNavbar/historic.svg'
import financial from 'assets/ProfileNavbar/financial.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'
import customization from 'assets/ProfileNavbar/customization.svg'

export default [
  { to: 'profile', label: 'Home', icon: home },
  { to: 'editProfile', label: 'Editar Perfil', icon: editProfile },
  { to: 'security', label: 'Segurança', icon: security },
  { to: 'customization', label: 'Customização', icon: customization },
  { to: 'financial', label: 'Financeiro', icon: financial },
  { to: 'historic', label: 'Histórico', icon: historic },
]
