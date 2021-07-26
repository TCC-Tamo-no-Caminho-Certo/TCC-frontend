import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import Style, { Content, Header } from './styles'

import transition from 'utils/transition'

import AddCloseIcon from 'assets/AddCloseIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import { Variants } from 'framer-motion'

export interface AnimatedListProps {
  id: string
  title: string
  children: ReactElement | ReactElement[] | string
  addClose?: boolean
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const titleAnimation: Variants = {
  initial: { borderRadius: '16px 16px 16px 16px' },
  unrounded: { borderRadius: '16px 16px 0px 0px', transition },
  rounded: {
    borderRadius: '16px 16px 16px 16px',
    transition: { ...transition, delay: 0.3 }
  }
}

const contentAnimation: Variants = {
  initial: { height: 0, opacity: 0, overflow: 'hidden' },
  exit: { height: 0, opacity: 0, overflow: 'hidden', transition },
  enter: {
    overflow: 'visible',
    opacity: 1,
    height: 'auto',
    transition: { ...transition, delay: 0.1 }
  }
}

const AnimatedList = ({
  id,
  title,
  children,
  addClose,
  selecteds,
  setSelecteds
}: AnimatedListProps) => {
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
    <Style>
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

        <span>{title}</span>
      </Header>

      <Content
        className='Content'
        condition={isSelected}
        variants={contentAnimation}
      >
        {children}
      </Content>
    </Style>
  )
}

export default AnimatedList
