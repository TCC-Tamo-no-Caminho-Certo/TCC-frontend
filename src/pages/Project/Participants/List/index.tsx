import React, { useEffect, useRef, useState } from 'react'
import Style, { Body, Header } from './styles'

import Participant from './Participant'

import transition from 'utils/transition'

import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import { Variants } from 'framer-motion'
import { ParticipantsResType } from 'types/Responses/project/participants'

interface ListProps {
  title: string
  participants: ParticipantsResType
}

const participantAnimation: Variants = {
  enter: { y: 0, opacity: 1, transition },
  exit: { y: -24, opacity: 0, transition },
  initial: { y: -24, opacity: 0, borderRadius: 8 }
}

export const ulAnimation: Variants = {
  initial: { height: 0 },
  exit: { height: 0, transition },
  enter: { height: 'auto', transition }
}

const List = ({ participants, title }: ListProps) => {
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>()
  const [selectedMonths, setSelectedMonths] = useState<string[]>()
  const [disabledButton, setDisabledButton] = useState(false)
  const [participantSize, setParticipantSize] = useState(0)
  const [showList, setShowList] = useState(false)

  const participantRef = useRef<any>(null)

  const onListClick = () => {
    setDisabledButton(true)

    if (showList)
      if (selectedMonths !== undefined) {
        setSelectedMonths(undefined)
        setTimeout(() => setShowList(false), 600)
        setTimeout(() => setDisabledButton(false), 900)
        setTimeout(() => setSelectedParticipants(undefined), 300)
      } else {
        setSelectedParticipants(undefined)
        setTimeout(() => setShowList(false), 300)
        setTimeout(() => setDisabledButton(false), 600)
      }
    else {
      setShowList(true)
      setTimeout(() => setDisabledButton(false), 300)
    }
  }

  useEffect(() => {
    if (showList) setParticipantSize(participantRef?.current.clientHeight)
  }, [showList])

  return (
    <Style
      exit='exit'
      animate='enter'
      className='List'
      initial='initial'
      variants={participantAnimation}
    >
      <Header onClick={onListClick} disabled={disabledButton}>
        <ArrowIcon
          initial='initialRight'
          variants={arrowAnimation}
          animate={showList ? 'bottom' : 'right'}
        />

        <span>{title}</span>
      </Header>

      <Body condition={showList} variants={ulAnimation}>
        <ul>
          {participants.map((participant, index) => (
            <Participant
              index={index}
              ref={participantRef}
              key={participant.id}
              size={participantSize}
              participant={participant}
              selectedMonths={selectedMonths}
              selecteds={selectedParticipants}
              setSelectedMonths={setSelectedMonths}
              setSelecteds={setSelectedParticipants}
            />
          ))}
        </ul>
      </Body>
    </Style>
  )
}

export default List
