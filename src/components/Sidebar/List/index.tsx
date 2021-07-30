import React from 'react'
import Style, { ListItem } from './styles'

import { RouteProps } from '../index'

import transition from 'utils/transition'

import { RootState } from 'store'
import { SidebarActions, SidebarState } from 'store/Sync/sidebar'

import Presence from 'components/Presence'

import { Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

interface ListProps {
  bottom?: boolean
  isLarge: boolean
  routes: RouteProps[]
}

const ul: Variants = {
  exit: { height: 0, transition },
  initial: { height: 0, transition },
  enter: { height: 'auto', transition }
}

const labelAnimation: Variants = {
  initial: { opacity: 0, x: -24 },
  exit: { x: -24, opacity: 0, transition: { type: 'tween', duration: 0.1 } }
}

const List = ({ routes, isLarge, bottom = false, ...props }: ListProps) => {
  const { open } = useSelector<RootState, SidebarState>(
    ({ sidebar }) => sidebar
  )

  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  return (
    <Style
      initial='initial'
      variants={ul}
      bottom={bottom}
      animate={open ? 'enter' : 'exit'}
      {...props}
    >
      {routes.map(({ paths, ref, icon: Icon, label }, index) => (
        <ListItem
          isOpen={!!open}
          key={paths[0]}
          itemPaths={paths}
          pathname={pathname}
          onClick={() => {
            history.push(paths[0])
            !isLarge && dispatch(SidebarActions.toggleSidebar(!open))
            ref?.current?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {Icon && (
            <div id='icon'>
              <Icon />
            </div>
          )}

          <Presence
            id='label'
            condition={open!!}
            variants={labelAnimation}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                type: 'tween',
                duration: 0.4,
                delay: 0.1 * index
              }
            }}
          >
            {label}
          </Presence>
        </ListItem>
      ))}
    </Style>
  )
}

export default List
