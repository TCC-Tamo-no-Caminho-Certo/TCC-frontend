import React, { Dispatch, SetStateAction, useState } from 'react'
import Style, { UniversityName } from './styles'

import CreateSeason from './CreateSeason'
import Season from './Season'
import { UniversityDataType } from '../index'

import transition from 'utils/transition'

import AnimatedList from 'components/AnimatedList'

import { Variants } from 'framer-motion'

interface UniversityProps {
  selecteds?: number[]
  university: UniversityDataType
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const buttonAnimation: Variants = {
  initial: { borderRadius: '24px 24px 24px 24px' },
  unrounded: { borderRadius: '24px 24px 0px 0px', transition },
  rounded: {
    borderRadius: '24px 24px 24px 24px',
    transition: { ...transition, delay: 0.3 }
  }
}

const University = ({
  selecteds,
  setSelecteds,
  university: { name, seasons, id, isAdmin }
}: UniversityProps) => {
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>()
  const [disabled, setDisabled] = useState(false)

  const isSelected =
    selecteds?.find(university_id => university_id === id) !== undefined

  const onNameClick = () => {
    setDisabled(true)

    if (setSelecteds)
      selectedSeasons
        ? setTimeout(
            () =>
              setSelecteds(prev =>
                prev?.filter(selectedMonth => selectedMonth !== id)
              ),
            400
          )
        : setSelecteds(prev => {
            if (isSelected)
              return prev?.filter(selectedMonth => selectedMonth !== id)
            return prev ? [...prev, id] : [id]
          })

    setSelectedSeasons(undefined)
    setTimeout(() => setDisabled(false), 400)
  }

  const seasonsComponents = () => {
    const components = []

    if (seasons)
      components.push(
        ...seasons.map(season => (
          <Season
            id={season.id}
            key={season.id}
            season={season}
            isAdmin={isAdmin}
            universityId={id}
            selecteds={selectedSeasons}
            setSelecteds={setSelectedSeasons}
          />
        ))
      )

    if (isAdmin)
      components.push(
        <CreateSeason
          id={-1}
          universityId={id}
          key='create-season'
          selecteds={selectedSeasons}
          setSelecteds={setSelectedSeasons}
        />
      )

    return components
  }

  return (
    <Style>
      <UniversityName
        initial='initial'
        disabled={disabled}
        onClick={onNameClick}
        variants={buttonAnimation}
        animate={isSelected ? 'unrounded' : 'rounded'}
      >
        {name}
      </UniversityName>

      <AnimatedList condition={isSelected} keyItem='university'>
        {seasonsComponents()}
      </AnimatedList>
    </Style>
  )
}

export default University
