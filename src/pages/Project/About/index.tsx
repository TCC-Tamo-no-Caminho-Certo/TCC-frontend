import React, { forwardRef } from 'react'
import Style from './styles'

import { ProjectType, StatusType } from 'types/Responses/project'
import { UniversityType } from 'types/Responses/university'

interface AboutProps {
  project?: ProjectType
  university?: UniversityType
}

const About = forwardRef<any, AboutProps>(({ project, university }, ref) => {
  const getStatusLabel = (status?: StatusType) => {
    switch (status) {
      case 'accepted':
        return 'Aceito'
      case 'completed':
        return 'Concluído'
      case 'in_progress':
        return 'Em progresso'
      case 'refused':
        return 'Recusado'
      default:
        return 'Rascunho'
    }
  }

  return (
    <Style ref={ref as any} status={project?.status}>
      <header>
        <div id='nameStatus'>
          <h1>Título de um projeto</h1>

          <div id='status'>
            <div id='circle' />

            <span>{getStatusLabel(project?.status)}</span>
          </div>
        </div>

        <h2>Universidade Anhembi Morumbi (UAM)</h2>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibu
      </p>
    </Style>
  )
})

export default About
