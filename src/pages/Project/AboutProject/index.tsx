import React, { forwardRef } from 'react'
import Style from './styles'

import { ProjectResType, StatusType } from 'types/Responses/project'
import { UniversityResType } from 'types/Responses/university'

interface AboutProjectProps {
  project?: ProjectResType
  university?: UniversityResType
}

const AboutProject = forwardRef<any, AboutProjectProps>(
  ({ project, university }, ref) => {
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
            <h1>{project?.title}</h1>

            <div id='status'>
              <div id='circle' />

              <span>{getStatusLabel(project?.status)}</span>
            </div>
          </div>

          <h2>{university?.name}</h2>
        </header>

        <p>{project?.resume}</p>
      </Style>
    )
  }
)

export default AboutProject
