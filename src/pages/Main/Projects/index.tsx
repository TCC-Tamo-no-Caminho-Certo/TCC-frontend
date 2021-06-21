import React, { forwardRef, useContext, useEffect, useState } from 'react'
import Style, { CreateProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getUniversities, UniversitiesState } from 'store/Async/universities'

import Table from 'components/Table'
import { File, Select, Submit, Text, Textarea } from 'components/Form'

import { GlobalContext } from 'App'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Projects = forwardRef((_props, ref) => {
  const universities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const theme = useContext(ThemeContext)

  const [universitiesOptions, setUniversitiesOptions] = useState<any[]>([])
  const dispatch = useDispatch()

  const canCreateProject = user.selectedRole === 'professor'

  useEffect(() => {
    dispatch(getUniversities(universities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    universities.universities &&
      setUniversitiesOptions(
        universities.universities.map(({ university_id, name }) => ({
          value: university_id,
          label: name
        }))
      )
  }, [universities])

  const { modalRef } = useContext(GlobalContext)

  console.log(universities)

  modalRef?.current?.config({
    close: {
      top: 16,
      right: 16,
      color: theme.colors.tertiary
    },
    content: (
      <CreateProject schema={createProjectSchema}>
        <Select
          name='university'
          placeholder='Universidade'
          value={undefined}
          options={universitiesOptions}
        />

        <Text placeholder='Título' name='title' />

        <Textarea placeholder='Resumo' name='description' />

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

  return (
    <>
      <Style ref={ref as any}>
        <header>
          <h1>Meus projetos</h1>
        </header>

        <Table
          path=''
          isLoading={false}
          filters={{ name: true, from: true, to: true }}
          headerData={[
            { label: 'Nome', name: 'name' },
            { label: 'Data', name: 'date' }
          ]}
        />

        {canCreateProject && (
          <button id='newProject' onClick={() => modalRef?.current?.toggle()}>
            Criar novo projeto
          </button>
        )}
      </Style>
    </>
  )
})

export default Projects
