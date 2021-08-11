import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import Style, { Content, NotLinked } from './styles'

import University from './University'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import DotsLoader from 'components/DotsLoader'

import { SeasonsResType, SeasonsType } from 'types/Responses/university/seasons'
import { UniversitiesResType } from 'types/Responses/university/universities'
import { AdministratorResType } from 'types/Responses/user/rolesData'

import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

export interface UniversityDataType {
  id: number
  name: string
  isAdmin: boolean
  seasons?: SeasonsType
}

interface SeasonsContextProps {
  getUniversitiesOfUser?: () => void
}

export const SeasonsContext = createContext<SeasonsContextProps>({})

const Seasons = forwardRef((_props, ref) => {
  const { colors } = useContext(ThemeContext)
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const [selectedUniversities, setSelectedUniversities] = useState<number[]>()
  const [universities, setUniversities] = useState<UniversityDataType[]>()

  const getUniversitiesOfUser = useCallback(async () => {
    const universitiesOfUser: UniversityDataType[] = []

    if (user?.id) {
      const { universities }: UniversitiesResType = await api.get(
        `users/${user.id}/roles/universities`
      )

      for (let i = 0; i < universities?.length; i++) {
        const { id, name } = universities[i]

        const { seasons }: SeasonsResType = await api.get(
          `universities/${id}/seasons`
        )

        const { administrator }: AdministratorResType = await api.get(
          `users/${user.id}/roles/administrator`
        )

        const universityId = administrator.university.id

        const isAdmin = !!(
          universityId === id && user?.selectedRole === 'administrator'
        )

        universitiesOfUser?.push({
          name,
          isAdmin,
          seasons,
          id: universities[i].id
        })
      }

      setUniversities(universitiesOfUser)
    }
  }, [user])

  useEffect(() => {
    getUniversitiesOfUser()
  }, [getUniversitiesOfUser])

  return (
    <Style ref={ref as any}>
      <header>
        <h1>Temporadas</h1>
      </header>

      <Content>
        {universities === undefined ? (
          <DotsLoader color={colors.secondary} />
        ) : universities?.length === 0 ? (
          <NotLinked>
            <h2>Você não está vinculado a nenhuma universidade.</h2>
            <p>Cadastre um papel e vincule-se a alguma!</p>
          </NotLinked>
        ) : (
          <SeasonsContext.Provider value={{ getUniversitiesOfUser }}>
            {universities?.map((university: UniversityDataType) => (
              <University
                key={university.id}
                university={university}
                selecteds={selectedUniversities}
                setSelecteds={setSelectedUniversities}
              />
            ))}
          </SeasonsContext.Provider>
        )}
      </Content>
    </Style>
  )
})

export default Seasons
