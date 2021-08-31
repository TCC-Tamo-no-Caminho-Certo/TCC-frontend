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

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import {
  getUserUniversities,
  UserUniversitiesState
} from 'store/Async/userUniversities'

import DotsLoader from 'components/DotsLoader'

import { SeasonsType } from 'types/Responses/university/seasons'

import { useDispatch, useSelector } from 'react-redux'
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
  const { user } = useSelector<RootState, UserState>(({ user }) => user)
  const { universities: userUniversities } = useSelector<
    RootState,
    UserUniversitiesState
  >(({ userUniversities }) => userUniversities)

  const [universities, setUniversities] = useState<UniversityDataType[]>()
  const [selectedUniversities, setSelectedUniversities] = useState<number[]>()

  const dispatch = useDispatch()

  useEffect(() => {
    setUniversities(
      userUniversities?.map(university => {
        const isSelectedAdmin = university.isAdmin
          ? user?.selectedRole === 'administrator'
          : university.isAdmin

        return { ...university, isAdmin: isSelectedAdmin }
      })
    )
  }, [user?.selectedRole, userUniversities])

  const getUniversitiesOfUser = useCallback(() => {
    if (user?.id && user?.roles)
      dispatch(
        getUserUniversities({
          userId: user.id,
          userRoles: user?.roles,
          updated: true
        })
      )
  }, [dispatch, user?.id, user?.roles])

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
