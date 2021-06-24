import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Member from './Member'

import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion } from 'framer-motion'

interface ListProps {
  title: string
  members: any[]
}

interface ListContextProps {
  showCondition: boolean
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
  showCondition: false
})

const List = ({ members, title }: ListProps) => {
  const [selectedMembers, setSelectedMembers] = useState<number[] | undefined>()
  const [selectedMonths, setSelectedMonths] = useState<string[] | undefined>()
  const [disabledButton, setDisabledButton] = useState(false)
  const [showCondition, setShowCondition] = useState(false)
  const [memberSize, setMemberSize] = useState(0)

  const memberRef = useRef<any>(null)

  useEffect(() => {
    if (showCondition) setMemberSize(memberRef?.current.clientHeight)
  }, [showCondition])

  return (
    <ListContext.Provider
      value={{
        showCondition,
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
          disabled={disabledButton}
          onClick={() => {
            setDisabledButton(true)
            setTimeout(() => setDisabledButton(false), 800)
            setShowCondition(!showCondition)
          }}
        >
          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={{
              rotate: showCondition ? 0 : -90,
              transition: {
                type: 'tween',
                duration: 0.3
              }
            }}
          />

          <span>{title}</span>
        </motion.button>

        <Presence condition={showCondition}>
          <ul>
            {members.map((member, index) => (
              <Member
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
  )
}

export default List
