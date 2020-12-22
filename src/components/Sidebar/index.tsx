import React, { useEffect } from 'react'
import Style, { ListItem } from './styles'

import { SidebarActions } from 'store/sidebar'
import { RootState, useDispatch, useSelector } from 'store'

import Hamburger from 'components/Hamburger'

import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export interface RouteProps {
  icon: () => JSX.Element
  label: string
  path: string
  bottom?: boolean
}

interface SidebarProps {
  routes: RouteProps[]
  samePage?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ routes, samePage = false }) => {
  const open = useSelector<RootState, boolean>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()

  const cycle = () => (open ? 'open' : 'closed')
  const onToggle = () => dispatch(SidebarActions.openSidebar(!open))

  const height = window.innerHeight

  const { pathname } = useLocation()

  const ul = {
    open: {
      width: 210,
      transition: {
        type: 'tween',
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },

    closed: {
      width: 72,
      transition: {
        type: 'tween',
        duration: 0.2,
        staggerChildren: 0,
      },
    },
  }

  const ulSpan = {
    open: {
      opacity: [0, 1],
      x: [-24, 0],
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },

    closed: {
      opacity: [1, 0],
      x: [0, -16],
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },

    initial: {
      opacity: 0,
    },
  }

  useEffect(() => {
    if (samePage) {
      const searchArray = routes.map(route => (route.path === pathname ? 1 : 0))
      window.scrollTo(0, height * searchArray.indexOf(1))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style>
      <Hamburger toggle={onToggle} state={open} />

      <motion.ul variants={ul} animate={cycle()}>
        {routes.map((route, index) => (
          <ListItem
            key={route.path}
            bottom={route.bottom}
            pathname={pathname.replaceAll('/', '-')}
            buttonId={route.path.replaceAll('/', '-')}
          >
            <Link to={route.path} onClick={() => samePage && window.scrollTo(0, height * index)}>
              <button type='button' id={route.path.replaceAll('/', '-')}>
                <route.icon />

                <AnimatePresence>
                  {open && (
                    <motion.span variants={ulSpan} initial='initial'>
                      {route.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Link>
          </ListItem>
        ))}
      </motion.ul>
    </Style>
  )
}

export default Sidebar
