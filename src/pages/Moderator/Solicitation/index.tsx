/* eslint-disable camelcase */
import React from 'react'
import Style from './styles'

import Table from './Table'

import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import { useSelector } from 'react-redux'

const Solicitation: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const headerData = [
    { name: 'statusCircle', label: '' },
    { name: 'name', label: 'Nome' },
    { name: 'role', label: 'Papel' },
    { name: 'status', label: 'Status' },
    { name: 'date', label: 'Data' },
  ]

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table route='request/role/get' headerData={headerData} dotsColor={theme.colors.secondary} />
    </Style>
  )
}

export default Solicitation
