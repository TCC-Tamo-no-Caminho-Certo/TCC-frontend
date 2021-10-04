import React, { forwardRef, useContext, useEffect, useRef } from 'react'
import Style, { CreateProject, NewProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

// import api from 'services/api'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getRolesData, RolesDataState } from 'store/Async/rolesData'

import { File, Select, Submit, Text, Textarea } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'
import Table from 'components/Table'

// import { ProjectResType } from 'types/Responses/project'
// import { UniversityResType } from 'types/Responses/university'
// import { ProjectsType } from 'types/Responses/user/projects'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Projects = forwardRef((_props, ref) => {
  const { colors } = useContext(ThemeContext)

  const { user } = useSelector<RootState, UserState>(({ user }) => user)
  const { roles } = useSelector<RootState, RolesDataState>(
    ({ rolesData }) => rolesData
  )

  const modalRef = useRef<ModalForwardeds>(null)

  const dispatch = useDispatch()

  const getMyProjects = async () => {
    const myProjects = [
      {
        rowValue: {},
        rowLabel: {
          title: { label: 'titls', name: 'title' },
          status: { label: 'status', name: 'status' },
          university: { label: 'university.name', name: 'university.name' }
        }
      }
    ]

    // if (user?.id) {
    //   const myProjectsIds: ProjectsType = await api.get(
    //     `api/users/${user?.id}/projects`
    //   )

    //   for (let i = 0; i < myProjectsIds.length; i++) {
    //     const { project }: ProjectResType = await api.get(
    //       `api/projects/${myProjectsIds[i]}`
    //     )

    //     if (project) {
    //       const { university }: UniversityResType = await api.get(
    //         `api/universities/${project.university_id}`
    //       )

    //       if (university)
    //         myProjects.push({
    //           rowValue: { ...project, university },
    //           rowLabel: {
    //             title: { label: project.title, name: project.title },
    //             status: { label: project.status, name: project.status },
    //             university: { label: university.name, name: university.name }
    //           }
    //         })
    //     }
    //   }
    // }

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
      user.selectedRole === 'professor' &&
      dispatch(
        getRolesData({ userId: user?.id, role: 'professor', updated: true })
      )
  }, [dispatch, user?.id, user?.selectedRole])

  return (
    <>
      <Style ref={ref as any}>
        <header>
          <h1>Meus projetos</h1>
        </header>

        <Table
          getData={getMyProjects}
          headerRow={[
            { label: 'Título', name: 'title' },
            { label: 'Status', name: 'status' },
            { label: 'Universidade', name: 'university' }
          ]}
        >
          <Text
            type='text'
            name='title'
            autoComplete='off'
            placeholder='Título do projeto'
            textColors={{
              focused: colors.secondary,
              unfocused: colors.secondary
            }}
          />
        </Table>

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
