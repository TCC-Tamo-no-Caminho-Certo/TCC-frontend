import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Content, Header, SidebarNav } from './styles'

import List from './List'

import transition from 'utils/transition'

import { SidebarActions, SidebarState } from 'store/Sync/sidebar'
import { RootState } from 'store'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Hamburger from 'components/Hamburger'
import Presence from 'components/Presence'

import { GlobalContext } from 'App'
import { Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useLocation } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

export interface RouteProps {
  label: string
  paths: string[]
  exact?: boolean
  bottom?: boolean
  noContentMove?: boolean
  icon?: () => JSX.Element
  component?: () => JSX.Element
  ref?: RefObject<HTMLDivElement>
}

interface SidebarProps {
  title?: string
  width?: number
  samePage?: boolean
  closedWidth?: number
  routes: RouteProps[]
  scrollBarSize?: number
}

const motionTitle: Variants = {
  initial: { opacity: 0, x: -24 },
  open: { opacity: 1, x: 0, transition },
  closed: { opacity: 0, x: -24, transition: { type: 'tween', duration: 0.1 } }
}

const Sidebar = ({
  routes,
  title = '',
  width = 210,
  closedWidth = 72,
  samePage = false
}: SidebarProps) => {
  const { overflow } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)
  const { open } = useSelector<RootState, SidebarState>(
    ({ sidebar }) => sidebar
  )

  const burgerRef = useRef<any>(null)

  const { innerWidth } = useWindowDimensions()

  const [isLarge, setisLarge] = useState(innerWidth >= 545)
  const [contentWidth, setContentWidth] = useState('100%')

  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  useEffect(() => {
    let subtract = 0

    if (isLarge)
      if (open) subtract = width
      else subtract = closedWidth

    setContentWidth('calc(100% - ' + subtract + 'px)')
  }, [closedWidth, isLarge, open, width])

  useEffect(() => {
    const route = routes.find(({ paths }) =>
      paths.find(path => path === pathname)
    )

    route?.ref?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname, routes, overflow])

  useEffect(() => {
    setisLarge(innerWidth >= 545)
  }, [innerWidth])

  return (
    <Style draggable='false' id='sidebar'>
      <SidebarNav
        initial={{ width: open ? width : closedWidth }}
        animate={
          open
            ? {
                transition,
                height: '100vh',
                width: isLarge ? width : '100%'
              }
            : {
                transition,
                width: isLarge ? closedWidth : '100%',
                height: isLarge ? '100vh' : closedWidth
              }
        }
      >
        <Header isOpen={!!open}>
          <Hamburger
            state={!!open}
            ref={burgerRef}
            toggle={onToggle}
            color={theme.colors.sidebar.letters}
          />

          <Presence
            id='title'
            exit='closed'
            animate='open'
            initial='initial'
            condition={!!open}
            variants={motionTitle}
          >
            {title}
          </Presence>
        </Header>

        <List
          isLarge={isLarge}
          routes={routes.filter(route => !route.bottom)}
        />

        <List
          bottom
          isLarge={isLarge}
          routes={routes.filter(route => route.bottom)}
        />
      </SidebarNav>

      {routes.map(({ paths, component, exact }, index) => (
        <Content
          index={index}
          key={paths[0]}
          isLarge={isLarge}
          samePage={samePage}
          id={paths[0].replaceAll('/', '--')}
          animate={
            open
              ? {
                  width: contentWidth,
                  x: isLarge ? width : 0,
                  transition: { type: 'tween', duration: 0.31 }
                }
              : {
                  width: contentWidth,
                  x: isLarge ? closedWidth : 0,
                  transition: { type: 'tween', duration: 0.29 }
                }
          }
        >
          {samePage
            ? component && component()
            : paths.map(path => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                />
              ))}
        </Content>
      ))}
    </Style>
  )
}

export default Sidebar
