import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { CreateProject } from './styles'

import createProjectSchema from 'utils/validations/createProjectSchema'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getUniversities, UniversitiesState } from 'store/Async/universities'

import Table from 'components/Table'
import Modal, { ModalMethods } from 'components/Modal'
import { File, Select, Submit, Text, Textarea } from 'components/Form'
import Presence from 'components/Presence'

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

  const modalRef = useRef<ModalMethods>(null)

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
    setUniversitiesOptions(
      universities.universities.map(({ university_id, name }) => ({
        value: university_id,
        label: name
      }))
    )
  }, [universities])

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
          <button
            id='newProject'
            onClick={() => modalRef.current?.toggleModal()}
          >
            Criar novo projeto
          </button>
        )}
      </Style>

      <Modal
        closeTop={16}
        ref={modalRef}
        closeRight={16}
        closeColor={theme.colors.tertiary}
      >
        <CreateProject
          schema={createProjectSchema}
          getData={e => console.log(e)}
        >
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
      </Modal>
    </>
  )
})

export default Projects
