import React, { useContext, useEffect, useMemo, useRef } from 'react'

import AboutProject from './AboutProject'
import Members from './Members'

import api from 'services/api'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useParams } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { ProjectResType } from 'types/Responses/project'
import { ParticipantsResType } from 'types/Responses/project/participants'
import { UniversityResType } from 'types/Responses/university'

const Profile = () => {
  const { sidebar } = useContext(ThemeContext)

  const participants = useRef<ParticipantsResType>()
  const university = useRef<UniversityResType>()
  const project = useRef<ProjectResType>()
  const aboutProject = useRef(null)
  const members = useRef(null)

  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      project.current = await api.get(`project/${id}`)
      university.current = await api.get(
        `university/${project.current?.university_id}`
      )
      participants.current = await api.get(`university/${id}/participants`)
    })()
  }, [id])

  const profileRoutes: RouteProps[] = useMemo(
    () => [
      {
        label: 'Projeto',
        icon: () => <ProjectIcon />,
        component: () => (
          <AboutProject ref={aboutProject} project={project.current} />
        ),
        ref: aboutProject,
        paths: ['/session/project']
      },
      {
        label: 'Participantes',
        icon: () => <ProjectIcon />,
        component: () => (
          <Members ref={members} participants={participants.current} />
        ),
        ref: members,
        paths: ['/session/project/members']
      },
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
      samePage={true}
      routes={profileRoutes}
      letters={sidebar.letters}
      selected={sidebar.selected}
      background={sidebar.background}
    />
  )
}

export default Profile
