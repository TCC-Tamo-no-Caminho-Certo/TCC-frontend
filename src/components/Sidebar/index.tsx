import React, {
  RefObject,
  useCallback,
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
  const [hasScroll, setHasScroll] = useState(false)
  const [isLarge, setisLarge] = useState(innerWidth >= 545)

  const getMarginLeft = useCallback(() => {
    if (isLarge) {
      if (open === undefined) return open ? width : closedWidth
      return !open ? width : closedWidth
    }

    return 0
  }, [closedWidth, isLarge, open, width])

  const [marginLeft, setMarginLeft] = useState(getMarginLeft())

  const getSubtract = useCallback(() => {
    if (isLarge)
      if (open === undefined) return hasScroll ? closedWidth : closedWidth
      else if (!open) return hasScroll ? width : width
      else return hasScroll ? closedWidth : closedWidth
    else return 0
  }, [closedWidth, hasScroll, isLarge, open, width])

  const [contentWidth, setContentWidth] = useState(
    `calc(100% - ${getSubtract()}px)`
  )

  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const root = document.getElementById('root')

  useEffect(() => {
    if (root) setHasScroll(root?.scrollHeight > window?.innerHeight)
  }, [root?.scrollHeight, root])

  useEffect(() => {
    setContentWidth(`calc(100% - ${getSubtract()}px)`)
  }, [closedWidth, getSubtract, hasScroll, isLarge, open, width])

  useEffect(() => {
    setMarginLeft(getMarginLeft())
  }, [hasScroll, isLarge, closedWidth, open, width, pathname, getMarginLeft])

  const motionBackground: Variants = {
    open: { transition, height: '100vh', width: isLarge ? width : '100%' },
    closed: {
      transition,
      width: isLarge ? closedWidth : '100%',
      height: isLarge ? '100vh' : closedWidth
    }
  }

  const content: Variants = {
    open: {
      marginLeft,
      width: contentWidth,
      transition: { type: 'tween', duration: 0.31 }
    },
    closed: {
      marginLeft,
      width: contentWidth,
      transition: { type: 'tween', duration: 0.29 }
    }
  }

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  useEffect(() => {
    const route = routes.find(({ paths }) =>
      paths.find(path => path === pathname)
    )

    setTimeout(
      () => route?.ref?.current?.scrollIntoView({ behavior: 'smooth' }),
      1
    )
  }, [pathname, routes, overflow])

  useEffect(() => {
    if (open !== undefined) {
      dispatch(SidebarActions.toggleSidebar(!open))

      setTimeout(() => {
        dispatch(SidebarActions.toggleSidebar(!!open))
      }, 0.1)
    } else dispatch(SidebarActions.toggleSidebar(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLarge])

  useEffect(() => {
    setisLarge(innerWidth >= 545)
  }, [innerWidth])

  return (
    <Style draggable='false'>
      <SidebarNav
        variants={motionBackground}
        animate={open ? 'open' : 'closed'}
        initial={!isLarge ? 'open' : 'closed'}
      >
        <Header isOpen={!!open}>
          <Hamburger
            state={!!open}
            ref={burgerRef}
            toggle={onToggle}
            color={theme.sidebar.letters}
          />

          <Presence
            id='title'
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
          isOpen={open}
          index={index}
          key={paths[0]}
          isLarge={isLarge}
          openWidth={width}
          variants={content}
          samePage={samePage}
          closedWidth={closedWidth}
          hasScrollBar={hasScroll}
          id={paths[0].replaceAll('/', '--')}
          animate={open ? 'open' : 'closed'}
          initial={open ? 'open' : 'closed'}
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
