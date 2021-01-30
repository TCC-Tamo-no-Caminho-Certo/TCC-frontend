import React from 'react'
import Style from './styles'

import Table from './Table'

const Solicitation: React.FC = () => {
  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table />
    </Style>
  )
}

export default Solicitation
