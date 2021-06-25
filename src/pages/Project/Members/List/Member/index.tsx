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

import { motion, Transition, Variants } from 'framer-motion'

interface MemberType {
  id: number
  role: Role
  name: string
  works: string[]
}

interface MemberProps {
  size: number
  index: number
  currentMember: MemberType
}

const transition: Transition = {
  type: 'tween',
  duration: 0.3
}

const Member = forwardRef<any, MemberProps>(
  ({ currentMember, index, size }, ref) => {
    const { member, month } = useContext(ListContext)

    const [disabledButton, setDisabledButton] = useState(false)
    const [monthSize, setMonthSize] = useState(0)

    const monthRef = useRef<any>(null)

    const { selectedMembers, setSelectedMembers } = member
    const { selectedMonths, setSelectedMonths } = month
    const { id, name, role, works } = currentMember
    const showMember =
      selectedMembers?.find(selectedMember => selectedMember === id) !==
      undefined

    const memberAppear: Variants = {
      initial: {
        opacity: 0,
        borderRadius: 8,
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

      if (setSelectedMembers && setSelectedMonths)
        if (showMember)
          if (selectedMonths) {
            setSelectedMonths(undefined)

            setTimeout(() => {
              setSelectedMembers(prev =>
                prev?.filter(selectedMember => selectedMember !== id)
              )
            }, 725)

            setTimeout(() => {
              setDisabledButton(false)
            }, 1725)
          } else {
            setSelectedMonths(undefined)

            setTimeout(() => {
              setSelectedMembers(prev =>
                prev?.filter(selectedMember => selectedMember !== id)
              )
            }, 300)

            setTimeout(() => {
              setDisabledButton(false)
            }, 1200)
          }
        else {
          setSelectedMembers(prev => (prev ? [...prev, id] : [id]))

          setTimeout(() => {
            setDisabledButton(false)
          }, 300)
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
        layout='position'
        variants={memberAppear}
      >
        <motion.div
          initial={{ width: 250 }}
          animate={{ width: showMember ? '100%' : 250 }}
          transition={{
            type: 'tween',
            duration: 0.3,
            delay: (() => {
              if (!showMember)
                return selectedMonths?.length !== 0 &&
                  selectedMonths !== undefined
                  ? 0.6
                  : 0.3
              return 0
            })()
          }}
        >
          <Style
            role={role}
            ref={ref as any}
            transition={{ duration: 0.3, type: 'tween' }}
          >
            <motion.button
              type='button'
              layout='position'
              className='header'
              onClick={onMemberClick}
              disabled={disabledButton}
            >
              <div className='avatar'>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>{name}</span>
                  <span className='role'>{getRoleLabel(role)}</span>
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

            <Presence className='content' condition={showMember}>
              <motion.ul>
                {works.map((work, index) => (
                  <Month
                    id={id}
                    work={work}
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
