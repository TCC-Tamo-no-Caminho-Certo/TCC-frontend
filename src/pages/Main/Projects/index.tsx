import React, { forwardRef } from 'react'
import Style from './styles'

import Table from 'components/Table'

const Projects = forwardRef((_props, ref) => (
  <Style ref={ref as any}>
    <header>
      <h1>Meus projetos</h1>
    </header>

    <Table
      path=''
      filters={{ name: true, from: true, to: true }}
      headerData={[
        { label: 'Nome', name: 'name' },
        { label: 'Data', name: 'date' }
      ]}
    />

    <button id='newProject'>Criar novo projeto</button>
  </Style>
))

export default Projects
