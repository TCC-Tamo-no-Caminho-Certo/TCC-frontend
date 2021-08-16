import React, { forwardRef, useEffect, useRef } from 'react'
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
import Modal, { ModalForwardeds } from 'components/Modal'

import { ProjectResType } from 'types/Responses/project'
import { UniversityResType } from 'types/Responses/university'
import { ProjectsType } from 'types/Responses/user/projects'
import { ProfessorType } from 'types/Responses/user/rolesData'

import { useDispatch, useSelector } from 'react-redux'

const Projects = forwardRef((_props, ref) => {
  const { universities } = useSelector<RootState, AsyncUniversitiesState>(
    ({ asyncUniversities }) => asyncUniversities
  )
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const modalRef = useRef<ModalForwardeds>(null)
  const dispatch = useDispatch()

  const getUniversitiesOptions = async () => {
    if (user?.id) return [{ label: '', value: '' }]

    const { universities: professorUniversities }: ProfessorType =
      await api.get(`api/users/${user?.id}/roles/professor`)

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
        `api/users/${user?.id}/projects`
      )

      for (let i = 0; i < myProjectsIds.length; i++) {
        const { project }: ProjectResType = await api.get(
          `api/projects/${myProjectsIds[i]}`
        )

        const { university }: UniversityResType = await api.get(
          `api/university/${project.university_id}`
        )

        myProjects.push({ ...project, university })
      }
    }

    return myProjects
  }

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

      <Modal ref={modalRef}>
        {user?.selectedRole === 'professor' ? (
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
              noCropper={true}
              bgHeight='200vh'
              label='Documento'
              accept='application/pdf'
            />

            <Submit>Criar projeto</Submit>
          </CreateProject>
        ) : (
          <></>
        )}
      </Modal>
    </>
  )
})

export default Projects
