import home from 'assets/ProfileNavbar/home.svg'
import security from 'assets/ProfileNavbar/security.svg'
import historic from 'assets/ProfileNavbar/historic.svg'
import financial from 'assets/ProfileNavbar/financial.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'
import customization from 'assets/ProfileNavbar/customization.svg'

export default [
  { to: 'main', label: 'Mapa', icon: historic },
  { to: '#', label: 'Meus Projetos', icon: home },
  { to: '##', label: 'Meu Currículo', icon: editProfile },
  { to: '###', label: 'Meus Cursos', icon: security },
  { to: '####', label: 'Minhas Habilidades', icon: customization },
  { to: '#####', label: 'Meus Pagamentos', icon: financial },
  { to: '######', label: 'Agenda de Visitas', icon: historic },
]
