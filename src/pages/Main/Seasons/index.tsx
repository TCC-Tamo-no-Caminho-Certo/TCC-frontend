import React, { forwardRef, useState } from 'react'
import Style, { Content, NotLinked } from './styles'

import University from './University'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import { useSelector } from 'react-redux'
import { SeasonsResType } from 'types/Responses/university/seasons'
import { AdministratorType } from 'types/Responses/user/rolesData'
import { UniversitiesType } from 'types/Responses/user/universities'

export interface UniversityDataType {
  id: number
  name: string
  isAdmin: boolean
  seasons?: SeasonsResType
}

const getAllUniversitiesOfUser = (): UniversityDataType[] => [
  {
    name: 'Universidade Anhembi Morumbi',
    id: 1,
    isAdmin: true,
    seasons: [
      {
        title: 'Primeira temporada',
        status: 'pre-release',
        begin: '19-08-2001',
        edict: 'edital.pdf',
        current_period: 'dispatch',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
        periods: {
          confirm: 20,
          dispatch: 25,
          evaluate: 30,
          in_progress: 320
        }
      },
      {
        title: 'Primeira temporada',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
        status: 'pre-release',
        edict: 'edital.pdf',
        begin: '19-08-2001',
        current_period: 'dispatch',
        periods: {
          confirm: 30,
          dispatch: 30,
          evaluate: 30,
          in_progress: 30
        }
      }
    ]
  },
  {
    name: 'Universidade Anhembi Morumbi 2',
    id: 2,
    isAdmin: false,
    seasons: [
      {
        title: 'Segunda temporada',
        begin: '19-08-2001',
        current_period: 'dispatch',
        description:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu',
        status: 'pre-release',
        edict: 'edital.pdf',
        periods: {
          confirm: 30,
          dispatch: 30,
          evaluate: 30,
          in_progress: 30
        }
      }
    ]
  },
  {
    name: 'Universidade Anhembi Morumbi 3',
    id: 3,
    isAdmin: false
  }
]

const Seasons = forwardRef((_props, ref) => {
  const { selectedRole } = useSelector<RootState, UserState>(({ user }) => user)

  const [selectedUniversities, setSelectedUniversities] = useState<number[]>()

  const universities = getAllUniversitiesOfUser()

  const getUniversitiesOfUser = async (): Promise<UniversityDataType[]> => {
    const universitiesOfUser: UniversityDataType[] = []
    const universities: UniversitiesType = await api.get('user/universities')

    for (let i = 0; i < universities.length; i++) {
      const { id, name } = universities[i]

      const seasons: SeasonsResType = await api.get(`university/${id}/seasons`)

      const { university_id }: AdministratorType = await api.get(
        'roles/administrator'
      )

      universitiesOfUser.push({
        seasons,
        name: name,
        id: universities[i].id,
        isAdmin: university_id === id && selectedRole === 'admin'
      })
    }

    return universitiesOfUser
  }

  return (
    <Style ref={ref as any}>
      <header>
        <h1>Temporadas</h1>
      </header>

      <Content>
        {universities ? (
          universities.map((university: UniversityDataType) => (
            <University
              key={university.id}
              university={university}
              selecteds={selectedUniversities}
              setSelecteds={setSelectedUniversities}
            />
          ))
        ) : (
          <NotLinked>
            <h2>Você não está vinculado a nenhuma universidade.</h2>
            <p>Cadastre um papel que vincule a alguma!</p>
          </NotLinked>
        )}
      </Content>
    </Style>
  )
})

export default Seasons
