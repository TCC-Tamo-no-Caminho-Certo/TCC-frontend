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

import { motion, Variants } from 'framer-motion'

interface ListProps {
  title: string
  members: any[]
}

interface ListContextProps {
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
  member: {}
})

const memberAppear: Variants = {
  initial: {
    opacity: 0,
    borderRadius: 8,
    y: -24
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      type: 'tween',
      duration: 0.3
    }
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
      id='teste'
      exit='exit'
      animate='enter'
      initial='initial'
      layout='position'
      variants={memberAppear}
    >
      <ListContext.Provider
        value={{
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
            onClick={onListClick}
            disabled={disabledButton}
          >
            <motion.div>
              <ArrowIcon
                initial={{ rotate: 0 }}
                animate={{
                  rotate: showList ? 0 : -90,
                  transition: {
                    type: 'tween',
                    duration: 0.3
                  }
                }}
              />

              <span>{title}</span>
            </motion.div>
          </motion.button>

          <Presence
            condition={showList}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          >
            <motion.ul layout>
              {members.map((member, index) => (
                <Member
                  index={index}
                  ref={memberRef}
                  key={member.id}
                  size={memberSize}
                  currentMember={member}
                />
              ))}
            </motion.ul>
          </Presence>
        </Style>
      </ListContext.Provider>
    </motion.li>
  )
}

export default List
