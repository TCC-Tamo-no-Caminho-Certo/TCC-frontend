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

import { Role } from 'store/Async/roles'

import AvatarIcon from 'assets/Inputs/AvatarIcon'
import ArrowIcon from 'assets/global/ArrowIcon'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

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

const Member = forwardRef<any, MemberProps>(
  ({ currentMember, index, size }, ref) => {
    const { showCondition, member, month } = useContext(ListContext)

    const [disabledButton, setDisabledButton] = useState(false)
    const [monthSize, setMonthSize] = useState(0)
    const [delay, setDelay] = useState(0)

    const monthRef = useRef<any>(null)

    const { selectedMembers, setSelectedMembers } = member

    const { id, name, role, works } = currentMember
    const isSelected =
      selectedMembers?.find(memberId => memberId === id) !== undefined

    useEffect(() => {
      isSelected && setMonthSize(monthRef?.current.clientHeight)
    }, [isSelected])

    useEffect(() => {
      month.selectedMonths?.length === 0 ? setDelay(300) : setDelay(600)
    }, [month.selectedMonths?.length])

    useEffect(() => {
      console.log(delay)
    }, [delay])

    useEffect(() => {}, [showCondition, setSelectedMembers])

    return (
      <Style ref={ref as any}>
        <motion.div
          className='header'
          onClick={() => {
            setDisabledButton(true)
            setTimeout(() => setDisabledButton(false), 800)

            if (!disabledButton)
              setSelectedMembers &&
                setSelectedMembers(prev => {
                  if (prev?.find(curr => curr === id) !== undefined)
                    return prev?.filter(curr => curr !== id)
                  return prev ? [...prev, id] : [id]
                })
          }}
        >
          <AvatarIcon />

          <div className='info'>
            <span className='name'>{name}</span>
            <span className='role'>{role}</span>
          </div>

          <ArrowIcon
            initial={{ rotate: 0 }}
            animate={{
              rotate: isSelected ? 0 : -90,
              transition: {
                type: 'tween',
                duration: 0.3
              }
            }}
          />
        </motion.div>

        <Presence className='content' condition={isSelected}>
          <ul>
            {works.map((work, index) => (
              <Month
                id={id}
                work={work}
                index={index}
                key={index}
                ref={monthRef}
                size={monthSize}
              />
            ))}
          </ul>
        </Presence>
      </Style>
    )
  }
)

export default Member
