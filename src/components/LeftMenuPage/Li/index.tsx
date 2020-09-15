import React from 'react'
import Style from './styles'

import { Link } from 'react-router-dom'
import { useNavbarOpen } from 'hooks/useNavbarOpen'

export interface LiProps {
  icon?: string
  label: string
  to: string
}

const Li: React.FC<LiProps> = ({ icon, label, to }) => {
  const { navbarOpen } = useNavbarOpen()

  return (
    <Style id={to}>
      <Link to={to}>
        <img src={icon} alt='icon' />

        <div>{navbarOpen && <span>{label}</span>}</div>
      </Link>
    </Style>
  )
}

export default Li
