import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Season from './Season'
import { UniversityType } from '../index'

import transition from 'utils/transition'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

interface UniversityProps {
  university: UniversityType
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const buttonAnimation: Variants = {
  initial: { borderRadius: '24px 24px 24px 24px' },
  rounded: { borderRadius: '24px 24px 24px 24px', transition },
  unrounded: {
    borderRadius: '24px 24px 0px 0px',
    transition
  }
}

const bgAnimation: Variants = {
  initial: { y: -64, height: 0, opacity: 0 },
  enter: { y: 0, opacity: 1, height: 'auto', transition },
  exit: {
    y: -64,
    height: 0,
    opacity: 0,
    transition
  }
}

const University = ({
  selecteds,
  setSelecteds,
  university: { name, seasons, id, isAdmin }
}: UniversityProps) => {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>()
  const [disabled, setDisabled] = useState(false)

  const showUniversity = useRef(false)

  const isSelected =
    selecteds?.find(university_id => university_id === id) !== undefined

  const onNameClick = () => {
    setSelecteds &&
      setSelecteds(prev => {
        if (isSelected)
          return prev?.filter(selectedMonth => selectedMonth !== id)
        return prev ? [...prev, id] : [id]
      })
  }

  useEffect(() => {
    setDisabled(true)
    setSelectedSeasons && setSelectedSeasons(undefined)

    if (isSelected) {
      showUniversity.current = true
      setTimeout(() => {
        setDisabled(false)
      }, 400)
    } else {
      setTimeout(() => (showUniversity.current = false), 300)
      setTimeout(() => {
        setDisabled(false)
      }, 700)
    }
  }, [isSelected])

  return (
    <Style>
      <motion.button
        initial='initial'
        id='universityName'
        disabled={disabled}
        onClick={onNameClick}
        variants={buttonAnimation}
        animate={showUniversity.current ? 'unrounded' : 'rounded'}
      >
        {name}
      </motion.button>

      <Presence variants={bgAnimation} condition={showUniversity.current}>
        <ul id='seasons'>
          {seasons ? (
            seasons.map((season, index) => (
              <Season
                season={season}
                isAdmin={isAdmin}
                id={`${id}-${index}`}
                key={`${id}-${index}`}
                selecteds={selectedSeasons}
                setSelecteds={setSelectedSeasons}
              />
            ))
          ) : (
            <div id='noSeasons'>Esta universidade não pussui temporadas</div>
          )}
        </ul>
      </Presence>
    </Style>
  )
}

export default University
