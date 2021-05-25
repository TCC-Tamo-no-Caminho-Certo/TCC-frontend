import React, { forwardRef, useContext, useEffect, useState } from 'react'
import Style, { CreateProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getUniversities, UniversitiesState } from 'store/Async/universities'

import Table from 'components/Table'
import { File, Select, Submit, Text, Textarea } from 'components/Form'
import Presence from 'components/Presence'

import { GlobalContext } from 'App'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const fakeMembers = [
  {
    label: 'Miguel Andrade',
    value: 1
  },
  {
    label: 'Gabriel Augusto',
    value: 2
  }
]

const Projects = forwardRef((_props, ref) => {
  const universities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const theme = useContext(ThemeContext)
  const [universitiesOptions, setUniversitiesOptions] = useState<any[]>([])

  const [{ showMembers }, setShow] = useState({
    showMembers: false
  })

  const dispatch = useDispatch()

  const canCreateProject =
    user.selectedRole !== 'student' && user.selectedRole !== 'guest'

  useEffect(() => {
    dispatch(getUniversities(universities))
    setShow({ showMembers: false })
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

  modalRef?.current?.config({
    close: {
      top: 16,
      right: 16,
      color: theme.colors.tertiary
    },
    content: (
      <CreateProject schema={createProjectSchema} getData={e => console.log(e)}>
        <Select
          name='university'
          placeholder='Universidade'
          value={undefined}
          options={universitiesOptions}
          onChange={() => setShow({ showMembers: true })}
        />

        <Presence condition={showMembers}>
          <Select
            isMulti
            placeholder='Integrantes'
            name='members'
            options={fakeMembers}
          />
        </Presence>

        <Text placeholder='Título' name='title' />

        <Textarea placeholder='Descrição' name='description' />

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
