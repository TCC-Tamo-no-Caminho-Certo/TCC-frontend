import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style from './styles'

import Month from './Month'
import { ListContext } from '../../List'

import { getRoleLabel } from 'utils/roles'

import { Role } from 'store/Async/roles'

import AvatarIcon from 'assets/Inputs/AvatarIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

interface MemberType {
  id: number
  role: Role
  name: string
  tasks: { title: string; content: string }[]
}

interface MemberProps {
  size: number
  index: number
  currentMember: MemberType
}

const Member = forwardRef<any, MemberProps>(
  ({ currentMember, index, size }, ref) => {
    const { member, month, transition } = useContext(ListContext)

    const [disabledButton, setDisabledButton] = useState(false)
    const [monthSize, setMonthSize] = useState(0)

    const monthRef = useRef<any>(null)

    const { selectedMembers, setSelectedMembers } = member
    const { setSelectedMonths } = month
    const { id, name, tasks, role } = currentMember

    const showMember =
      selectedMembers?.find(selectedMember => selectedMember === id) !==
      undefined

    const memberAppear: Variants = {
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

    const onMemberClick = () => {
      setDisabledButton(true)

      if (setSelectedMembers && setSelectedMonths) {
        setSelectedMonths(undefined)

        setTimeout(() => {
          setDisabledButton(false)
        }, 300)

        if (showMember)
          setSelectedMembers(prev =>
            prev?.filter(selectedMember => selectedMember !== id)
          )
        else setSelectedMembers(prev => (prev ? [...prev, id] : [id]))
      }
    }

    useEffect(() => {
      showMember && setMonthSize(monthRef?.current.clientHeight)
    }, [showMember])

    return (
      <motion.li
        id='teste'
        exit='exit'
        animate='enter'
        initial='initial'
        className='Member'
        variants={memberAppear}
      >
        <motion.div
          initial={{ width: 250 }}
          animate={{ width: showMember ? '100%' : 250 }}
          transition={{ ...transition, delay: showMember ? 0 : 0.3 }}
        >
          <Style layout role={role} ref={ref as any} transition={transition}>
            <motion.button
              type='button'
              layout='position'
              className='header'
              transition={transition}
              onClick={onMemberClick}
              disabled={disabledButton}
            >
              <div className='avatar'>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>{name}</span>
                  <span className='role'>{role && getRoleLabel(role)}</span>
                </div>
              </div>

              <ArrowIcon
                initial={{ rotate: 0 }}
                animate={{
                  rotate: showMember ? 0 : -90,
                  transition
                }}
              />
            </motion.button>

            <Presence
              layout='position'
              className='content'
              condition={showMember}
              transition={transition}
            >
              <motion.ul>
                {tasks.map((task, index) => (
                  <Month
                    id={id}
                    task={task}
                    key={index}
                    index={index}
                    ref={monthRef}
                    size={monthSize}
                  />
                ))}
              </motion.ul>
            </Presence>
          </Style>
        </motion.div>
      </motion.li>
    )
  }
)

export default Member
