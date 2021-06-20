import React, { useState } from 'react'
import Style from './styles'

import DatesTable from './DatesTable'

import { University as UniversityType } from 'store/Async/universities'

import Presence from 'components/Presence'

import {
  AnimateSharedLayout,
  motion,
  Transition,
  Variants
} from 'framer-motion'

interface UniversityProps {
  university: UniversityType
}

const transition: Transition = {
  type: 'tween',
  duration: 0.6
}

const universityBg: Variants = {
  initial: { y: -30, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { ...transition, delay: 0.3 } },
  exit: { y: -30, opacity: 0, transition }
}

const University = ({ university }: UniversityProps) => {
  const [selectedUniversity, setSelectedUniversity] = useState('none')
  const [showUniversity, setShowUniversity] = useState(false)

  const seasons = [
    {
      title: 'season1',
      description: 'desc1',
      periods: {
        confirm: 30,
        dispatch: 30,
        evaluate: 30,
        in_progress: 30
      }
    }
  ]

  return (
    <Style>
      <AnimateSharedLayout>
        <motion.div layout='position' id='universityName'>
          <motion.button
            onClick={() => setShowUniversity(!showUniversity)}
            initial={{ borderRadius: '24px 24px 24px 24px' }}
            animate={{
              borderRadius: showUniversity
                ? '24px 24px 0px 0px'
                : '24px 24px 24px 24px',
              transition: {
                type: 'tween',
                duration: 0.3,
                delay: showUniversity ? 0 : 0.3
              }
            }}
          >
            {university.name}
          </motion.button>
        </motion.div>

        <Presence
          condition={showUniversity}
          exit='exit'
          animate='enter'
          initial='initial'
          variants={universityBg}
        >
          <motion.ul id='seasons' layout>
            {seasons.map((season, id) => (
              <motion.li layout='position' key={id}>
                <button
                  onClick={() =>
                    setSelectedUniversity(prev =>
                      prev === 'none' ? 'inverno' : 'none'
                    )
                  }
                >
                  {'university.seasons[current].title'}
                </button>

                <Presence
                  exit='exit'
                  animate='enter'
                  initial='initial'
                  variants={universityBg}
                  condition={selectedUniversity === 'inverno'}
                >
                  <p>{'university.seasons[current].description'}</p>

                  <DatesTable periods={season.periods} />
                </Presence>
              </motion.li>
            ))}
          </motion.ul>
        </Presence>
      </AnimateSharedLayout>
    </Style>
  )
}

export default University
