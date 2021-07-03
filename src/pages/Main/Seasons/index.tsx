import React, { forwardRef, useState } from 'react'
import Style, { Content, NotLinked } from './styles'

import University from './University'

import api from 'services/api'

import { Role } from 'store/Async/roles'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import { useSelector } from 'react-redux'

const getAllUniversitiesOfUser = (): UniversityType[] => [
  {
    name: 'Universidade Anhembi Morumbi',
    id: 1,
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
    id: 3
  }
]

export interface PeriodsType {
  confirm: number
  dispatch: number
  evaluate: number
  in_progress: number
}

export interface SeasonType {
  title: string
  edict: string
  begin: string
  periods: PeriodsType
  description: string
  status: 'pre-release' | 'released' | 'canceled' | 'archived'
  current_period: 'confirm' | 'dispatch' | 'evaluate' | 'in_progress'
}

export interface IntegrantType {
  id: string
  role: Role
  name: string
  avatar_uuid: string
}

export interface UniversityType {
  id: number
  name: string
  seasons?: SeasonType[]
  intregants?: IntegrantType[]
}

type UniversitiesType = {
  id: number
  name: string
}[]

const Seasons = forwardRef((_props, ref) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const [selectedUniversities, setSelectedUniversities] = useState<number[]>()

  const universities = getAllUniversitiesOfUser()

  const getUniversitiesOfUser = async () => {
    const universities: UniversitiesType = await api.get('user/universities')

    return universities.map(async ({ name, id }) => ({
      id,
      name,
      seasons: await api.get(`university/${id}/seasons`),
      isAdmin: user.administrator?.university_id === id
    }))
  }

  return (
    <Style ref={ref as any}>
      <header>
        <h1>Temporadas</h1>
      </header>

      <Content>
        {universities ? (
          universities.map((university: UniversityType) => (
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
