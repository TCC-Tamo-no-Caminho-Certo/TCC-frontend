import React, { forwardRef, useContext, useEffect } from 'react'
import Style, { CreateProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'
// eslint-disable-next-line prettier/prettier
import {
  AsyncUniversitiesState,
  getUniversities
} from 'store/Async/universities'

import { File, Select, Submit, Text, Textarea } from 'components/Form'

import { ProjectResType } from 'types/Responses/project'
import { UniversityResType } from 'types/Responses/university'
import { ProjectsType } from 'types/Responses/user/projects'
import { ProfessorType } from 'types/Responses/user/rolesData'

import { GlobalContext } from 'App'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Projects = forwardRef((_props, ref) => {
  const { universities } = useSelector<RootState, AsyncUniversitiesState>(
    ({ asyncUniversities }) => asyncUniversities
  )
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const { modalRef } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)

  const dispatch = useDispatch()

  const getUniversitiesOptions = async () => {
    if (user?.id) return [{ label: '', value: '' }]

    const { universities: professorUniversities }: ProfessorType =
      await api.get(`/users/${user?.id}/roles/professor`)

    if (!professorUniversities) return [{ label: '', value: '' }]

    return universities
      .filter(university =>
        professorUniversities.find(({ id }) => id === university.id)
      )
      .map(university => ({ label: university.name, value: university.id }))
  }

  const getMyProjects = async () => {
    const myProjects = []

    if (user?.id) {
      const myProjectsIds: ProjectsType = await api.get(
        `/users/${user?.id}/projects`
      )

      for (let i = 0; i < myProjectsIds.length; i++) {
        const { project }: ProjectResType = await api.get(
          `/projects/${myProjectsIds[i]}`
        )

        const { university }: UniversityResType = await api.get(
          `/university/${project.university_id}`
        )

        myProjects.push({ ...project, university })
      }
    }

    return myProjects
  }

  modalRef?.current?.config({
    close: { top: 16, right: 16, color: theme.colors.tertiary },
    content: (
      <CreateProject schema={createProjectSchema}>
        <Select
          name='university'
          placeholder='Universidade'
          value={undefined}
          options={getUniversitiesOptions()}
        />

        <Text placeholder='Título' name='title' maxLength={36} />

        <Textarea placeholder='Resumo' name='description' maxLength={500} />

        <File
          guides
          bottom='50vh'
          tranlateY='50%'
          name='document'
          bgHeight='200vh'
          label='Documento'
          accept='application/pdf'
          noCropper={true}
        />

        <Submit>Criar projeto</Submit>
      </CreateProject>
    )
  })

  useEffect(() => {
    dispatch(getUniversities())
  }, [dispatch])

  return (
    <>
      <Style ref={ref as any}>
        <header>
          <h1>Meus projetos</h1>
        </header>

        {user?.selectedRole === 'professor' && (
          <button id='newProject' onClick={() => modalRef?.current?.toggle()}>
            Criar novo projeto
          </button>
        )}
      </Style>
    </>
  )
})

export default Projects
