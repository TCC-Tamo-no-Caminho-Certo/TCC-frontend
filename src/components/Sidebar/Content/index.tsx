import React from 'react'
import Style from './styles'

import { RootState, useSelector } from 'store'

interface ContentProps {
  overflow?: boolean
}

const Content: React.FC<ContentProps> = ({ children, overflow = true }) => {
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)

  const content = {
    initial: {},
    animateOpen: {
      y: 0,
      x: '210px',
      width: 'calc(100vw - 210px)',
    },
    animateClosed: {
      y: 0,
      x: '72px',
      width: 'calc(100vw - 72px)',
    },
    exit: {},
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  }

  return (
    <Style
      overflow={overflow}
      variants={content}
      transition={content.transition}
      initial='initial'
      animate={open ? 'animateOpen' : 'animateClosed'}
      exit='exit'
    >
      {children}
    </Style>
  )
}

export default Content
