import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import Style, { Header } from './styles'

import transition from 'utils/transition'

import AddCloseIcon from 'assets/AddCloseIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import AnimatedList from 'components/AnimatedList'

import { Variants } from 'framer-motion'

export interface ListProps {
  id: number
  listKey: string
  addClose?: boolean
  children: ReactNode
  selecteds?: number[]
  title: ReactNode | string
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const titleAnimation: Variants = {
  initial: { borderRadius: '16px 16px 16px 16px' },
  unrounded: { borderRadius: '16px 16px 0px 0px', transition },
  rounded: { borderRadius: '16px 16px 16px 16px', transition: { duration: 1 } }
}

const List = ({
  id,
  title,
  listKey,
  addClose,
  children,
  selecteds,
  setSelecteds
}: ListProps) => {
  const [disabled, setDisabled] = useState(false)

  const isSelected =
    selecteds?.find(season_id => season_id === id) !== undefined

  const onTitleClick = () => {
    setSelecteds &&
      setSelecteds(prev => {
        if (isSelected) return prev?.filter(currPrev => currPrev !== id)
        return prev ? [...prev, id] : [id]
      })
  }

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => setDisabled(false), 400)
  }, [isSelected])

  return (
    <Style className='List'>
      <Header
        type='button'
        initial='initial'
        className='Header'
        disabled={disabled}
        onClick={onTitleClick}
        variants={titleAnimation}
        animate={isSelected ? 'unrounded' : 'rounded'}
      >
        {addClose ? (
          <AddCloseIcon condition={isSelected} />
        ) : (
          <ArrowIcon
            initial='initialRight'
            variants={arrowAnimation}
            animate={isSelected ? 'bottom' : 'right'}
          />
        )}

        <div id='title'>{title}</div>
      </Header>

      <AnimatedList
        keyItem={listKey}
        className='Content'
        condition={isSelected}
      >
        {children as any[]}
      </AnimatedList>
    </Style>
  )
}

export default List
