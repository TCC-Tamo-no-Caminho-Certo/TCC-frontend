import React, { useEffect, useRef, useState } from 'react'
import Style from './styles'

import Participant from './Participant'

import transition from 'utils/transition'

import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'
import { ParticipantsResType } from 'types/Responses/project/participants'

interface ListProps {
  title: string
  participants: ParticipantsResType
}

const participantAnimation: Variants = {
  initial: {
    y: -24,
    opacity: 0,
    borderRadius: 8
  },
  enter: {
    y: 0,
    opacity: 1,
    transition
  },
  exit: {
    y: -24,
    opacity: 0,
    transition
  }
}

export const ulAnimation: Variants = {
  initial: { height: 0 },
  exit: { height: 0, transition },
  enter: { height: 'auto', transition }
}

const List = ({ participants, title }: ListProps) => {
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>()
  const [disabledButton, setDisabledButton] = useState(false)
  const [participantSize, setParticipantSize] = useState(0)
  const [showList, setShowList] = useState(false)

  const memberRef = useRef<any>(null)

  const onListClick = () => {
    setShowList(!showList)
    setDisabledButton(true)

    setTimeout(() => {
      setDisabledButton(false)
    }, 400)
  }

  useEffect(() => {
    if (showList) setParticipantSize(memberRef?.current.clientHeight)
  }, [showList])

  return (
    <motion.li
      exit='exit'
      animate='enter'
      className='List'
      initial='initial'
      variants={participantAnimation}
    >
      <Style>
        <button type='button' onClick={onListClick} disabled={disabledButton}>
          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={{
              rotate: showList ? 0 : -90,
              transition
            }}
          />

          <span>{title}</span>
        </button>

        <Presence condition={showList} variants={ulAnimation}>
          <ul>
            {participants.map((participant, index) => (
              <Participant
                index={index}
                ref={memberRef}
                key={participant.id}
                size={participantSize}
                participant={participant}
                selecteds={selectedParticipants}
                setSelecteds={setSelectedParticipants}
              />
            ))}
          </ul>
        </Presence>
      </Style>
    </motion.li>
  )
}

export default List
