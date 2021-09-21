import React, { forwardRef, useEffect, useRef } from 'react'
import Style, { CreateProject, NewProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getRolesData, RolesDataState } from 'store/Async/rolesData'

import { File, Select, Submit, Text, Textarea } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'

import { ProjectResType } from 'types/Responses/project'
import { UniversityResType } from 'types/Responses/university'
import { ProjectsType } from 'types/Responses/user/projects'

import { useDispatch, useSelector } from 'react-redux'

const Projects = forwardRef((_props, ref) => {
  const { roles } = useSelector<RootState, RolesDataState>(
    ({ rolesData }) => rolesData
  )
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const modalRef = useRef<ModalForwardeds>(null)

  const dispatch = useDispatch()

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

  const getUniversitiesOptions = () => {
    const professorUniversities = roles.professor?.universities

    return professorUniversities?.map(({ name, id }) => ({
      label: name,
      value: id
    }))
  }

  useEffect(() => {
    user?.id &&
      dispatch(
        getRolesData({ userId: user?.id, role: 'professor', updated: true })
      )
  }, [dispatch, user?.id])

  return (
    <>
      <Style ref={ref as any}>
        <header>
          <h1>Meus projetos</h1>
        </header>

        {user?.selectedRole === 'professor' && (
          <NewProject onClick={() => modalRef?.current?.toggle()}>
            Criar novo projeto
          </NewProject>
        )}
      </Style>

      <Modal ref={modalRef}>
        {user?.selectedRole === 'professor' ? (
          <CreateProject schema={createProjectSchema}>
            <Select
              noPortal
              name='university'
              placeholder='Universidade'
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
