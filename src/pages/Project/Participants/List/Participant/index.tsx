import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Body, Header } from './styles'

import Month from './Month'
import { ulAnimation } from '../'

import transition from 'utils/transition'

import useWindowDimensions from 'hooks/useWindowDimensions'

import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import AvatarAndInfo from 'components/User/AvatarAndInfo'

import { Variants } from 'framer-motion'
import { ParticipantType } from 'types/Responses/project/participants'

interface ParticipantProps {
  size: number
  index: number
  participant: ParticipantType
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
  selectedMonths?: string[]
  setSelectedMonths?: Dispatch<SetStateAction<string[] | undefined>>
}

const Participant = forwardRef<any, ParticipantProps>(
  (
    {
      size,
      index,
      selecteds,
      participant,
      setSelecteds,
      selectedMonths,
      setSelectedMonths
    },
    ref
  ) => {
    const [disabledButton, setDisabledButton] = useState(false)
    const [monthSize, setMonthSize] = useState(0)
    const { innerWidth } = useWindowDimensions()
    const [isLarge, setisLarge] = useState(innerWidth >= 750)

    const monthRef = useRef<any>(null)

    const { id, name, tasks, role } = participant
    const isSelected =
      selecteds?.find(selected => selected === id) !== undefined

    const participantAnimation: Variants = {
      enter: { width: 250, y: 0, opacity: 1, transition },
      enterFull: { width: '100%', y: 0, opacity: 1, transition },
      initial: { opacity: 0, width: 250, y: (size + 24) * -index },
      initialFull: { opacity: 0, width: '100%', y: (size + 24) * -index },
      exit: { transition, opacity: 0, width: 250, y: (size + 24) * -index },
      exitFull: {
        transition,
        width: '100%',
        opacity: 0,
        y: (size + 24) * -index
      }
    }

    const onParticipantClick = () => {
      setDisabledButton(true)

      if (setSelecteds && setSelectedMonths) {
        if (isSelected)
          if (selectedMonths !== undefined) {
            setSelectedMonths(undefined)
            setTimeout(() => setDisabledButton(false), 600)
            setTimeout(() => {
              setSelecteds(prev => prev?.filter(selected => selected !== id))
            }, 300)
          } else {
            setSelecteds(prev => prev?.filter(selected => selected !== id))
            setTimeout(() => setDisabledButton(false), 300)
          }
        else {
          setSelecteds(prev => (prev ? [...prev, id] : [id]))
          setTimeout(() => setDisabledButton(false), 300)
        }

        setSelectedMonths(undefined)
      }
    }

    useEffect(() => {
      setisLarge(innerWidth >= 750)
    }, [innerWidth])

    useEffect(() => {
      isSelected && setMonthSize(monthRef?.current.clientHeight)
    }, [isSelected])

    return (
      <Style
        className='Participant'
        role={role}
        ref={ref as any}
        variants={participantAnimation}
        exit={isLarge ? 'exit' : 'exitFull'}
        initial={isLarge ? 'initial' : 'initialFull'}
        animate={isLarge && !isSelected ? 'enter' : 'enterFull'}
      >
        <Header disabled={disabledButton} onClick={onParticipantClick}>
          <AvatarAndInfo name={name} role={role} />

          <ArrowIcon
            initial='initialRight'
            variants={arrowAnimation}
            animate={isSelected ? 'bottom' : 'right'}
          />
        </Header>

        <Body
          variants={ulAnimation}
          condition={isSelected}
          transition={transition}
        >
          <ul>
            {tasks.map((task, index) => (
              <Month
                id={id}
                task={task}
                key={index}
                index={index}
                ref={monthRef}
                size={monthSize}
                selecteds={selectedMonths}
                setSelecteds={setSelectedMonths}
              />
            ))}
          </ul>
        </Body>
      </Style>
    )
  }
)

export default Participant
