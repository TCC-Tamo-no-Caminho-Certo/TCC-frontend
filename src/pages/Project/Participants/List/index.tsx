import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Participant from './Participant'

import transition from 'utils/transition'

import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion, Transition, Variants } from 'framer-motion'
import { ParticipantsResType } from 'types/Responses/project/participants'

interface ListProps {
  title: string
  members: ParticipantsResType
}

interface ListContextProps {
  transition: Transition
  month: {
    selectedMonths?: string[]
    setSelectedMonths?: Dispatch<SetStateAction<string[] | undefined>>
  }
  member: {
    selectedMembers?: number[]
    setSelectedMembers?: Dispatch<SetStateAction<number[] | undefined>>
  }
}

export const ListContext = createContext<ListContextProps>({
  month: {},
  member: {},
  transition: {
    type: 'tween',
    duration: 0.3
  }
})

const memberAppear: Variants = {
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

const List = ({ members, title }: ListProps) => {
  const [selectedMembers, setSelectedMembers] = useState<number[] | undefined>()
  const [selectedMonths, setSelectedMonths] = useState<string[] | undefined>()
  const [disabledButton, setDisabledButton] = useState(false)
  const [showList, setShowList] = useState(false)
  const [memberSize, setMemberSize] = useState(0)

  const memberRef = useRef<any>(null)

  const onListClick = () => {
    setShowList(!showList)
    setDisabledButton(true)
    setSelectedMonths(undefined)
    setSelectedMembers(undefined)
    setTimeout(() => {
      setDisabledButton(false)
    }, 400)
  }

  useEffect(() => {
    if (showList) setMemberSize(memberRef?.current.clientHeight)
  }, [showList])

  return (
    <motion.li
      exit='exit'
      animate='enter'
      className='List'
      initial='initial'
      variants={memberAppear}
    >
      <ListContext.Provider
        value={{
          transition,
          month: {
            selectedMonths,
            setSelectedMonths
          },
          member: {
            selectedMembers,
            setSelectedMembers
          }
        }}
      >
        <Style>
          <motion.button
            type='button'
            layout='position'
            onClick={onListClick}
            transition={transition}
            disabled={disabledButton}
          >
            <ArrowIcon
              initial={{ rotate: 0 }}
              animate={{
                rotate: showList ? 0 : -90,
                transition
              }}
            />

            <span>{title}</span>
          </motion.button>

          <Presence
            condition={showList}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <ul>
              {members.map((member, index) => (
                <Participant
                  index={index}
                  ref={memberRef}
                  key={member.id}
                  size={memberSize}
                  currentMember={member}
                />
              ))}
            </ul>
          </Presence>
        </Style>
      </ListContext.Provider>
    </motion.li>
  )
}

export default List
