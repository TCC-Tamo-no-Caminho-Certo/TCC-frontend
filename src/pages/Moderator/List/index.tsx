import React from 'react'
import Style from './styles'

import Table, { HeaderData } from 'components/Table'

const headerData: HeaderData[] = [
  {
    label: 'Nome',
    name: 'name'
  }
]

const List = () => (
  <Style>
    <header>
      <h1>Lista de alunos</h1>
    </header>

    <Table
      path='#'
      isLoading={false}
      headerData={headerData}
      filters={{ name: true }}
    />
  </Style>
)

export default List
