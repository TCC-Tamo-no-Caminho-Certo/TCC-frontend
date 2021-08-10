import React, { Dispatch, SetStateAction, useState } from 'react'
import Style, { Seasons, UniversityName } from './styles'

import CreateSeason from './CreateSeason'
import Season from './Season'
import { UniversityDataType } from '../index'

import transition from 'utils/transition'

import Presence from 'components/Presence'

import { Variants } from 'framer-motion'

interface UniversityProps {
  university: UniversityDataType
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const buttonAnimation: Variants = {
  initial: { borderRadius: '24px 24px 24px 24px' },
  rounded: { borderRadius: '24px 24px 24px 24px', transition },
  unrounded: { borderRadius: '24px 24px 0px 0px', transition }
}

const bgAnimation: Variants = {
  initial: { y: -64, height: 0, opacity: 0 },
  exit: { y: -64, height: 0, opacity: 0, transition },
  enter: { y: 0, opacity: 1, height: 'auto', transition }
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

      <Presence variants={bgAnimation} condition={isSelected}>
        <Seasons>
          {seasons?.length !== 0 ? (
            seasons?.map(season => (
              <Season
                season={season}
                id={season.id}
                key={season.id}
                isAdmin={isAdmin}
                universityId={id}
                selecteds={selectedSeasons}
                setSelecteds={setSelectedSeasons}
              />
            ))
          ) : (
            <div id='noSeasons'>Esta universidade não pussui temporadas</div>
          )}

          {isAdmin && (
            <CreateSeason
              id={-1}
              universityId={id}
              selecteds={selectedSeasons}
              setSelecteds={setSelectedSeasons}
            />
          )}
        </Seasons>
      </Presence>
    </Style>
  )
}

export default University
