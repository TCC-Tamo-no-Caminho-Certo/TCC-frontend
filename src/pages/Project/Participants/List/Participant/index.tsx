import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Header } from './styles'

import Month from './Month'
import { ulAnimation } from '../'

import transition from 'utils/transition'

import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'
import AvatarAndInfo from 'components/User/AvatarAndInfo'

import { Variants } from 'framer-motion'
import { ParticipantType } from 'types/Responses/project/participants'

interface ParticipantProps {
  size: number
  index: number
  participant: ParticipantType
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const Participant = forwardRef<any, ParticipantProps>(
  ({ participant, index, size, selecteds, setSelecteds }, ref) => {
    const [selectedMonths, setSelectedMonths] = useState<string[]>()
    const [disabledButton, setDisabledButton] = useState(false)
    const [monthSize, setMonthSize] = useState(0)

    const monthRef = useRef<any>(null)

    const { id, name, tasks, role } = participant
    const isSelected =
      selecteds?.find(selected => selected === id) !== undefined

    const participantAnimation: Variants = {
      initial: {
        opacity: 0,
        y: (size + 24) * -index
      },
      enter: {
        y: 0,
        opacity: 1,
        transition
      },
      exit: {
        opacity: 0,
        y: (size + 24) * -index,
        transition
      }
    }

    const onParticipantClick = () => {
      setDisabledButton(true)

      if (setSelecteds && setSelectedMonths) {
        setSelectedMonths(undefined)

        setSelecteds(prev => {
          if (isSelected) return prev?.filter(selected => selected !== id)
          return prev ? [...prev, id] : [id]
        })
      }

      setTimeout(() => {
        setDisabledButton(false)
      }, 400)
    }

    useEffect(() => {
      isSelected && setMonthSize(monthRef?.current.clientHeight)
    }, [isSelected])

    return (
      <Style
        exit='exit'
        animate='enter'
        initial='initial'
        className='Participant'
        role={role}
        ref={ref as any}
        variants={participantAnimation}
      >
        <Header
          type='button'
          onClick={onParticipantClick}
          disabled={disabledButton}
        >
          <AvatarAndInfo name={name} role={role} />

          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={{
              rotate: isSelected ? 0 : -90,
              transition
            }}
          />
        </Header>

        <Presence
          className='content'
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
        </Presence>
      </Style>
    )
  }
)

export default Participant
