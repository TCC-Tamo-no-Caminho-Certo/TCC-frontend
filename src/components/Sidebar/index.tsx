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
  routes: RouteProps[]
  closedWidth?: number
  scrollBarSize?: number
}

const motionTitle: Variants = {
  initial: { opacity: 0, x: -24 },
  open: { opacity: 1, x: 0, transition },
  closed: { opacity: 0, x: -24, transition: { type: 'tween', duration: 0.1 } }
}

const hasScrollBar = () => {
  const root = document.getElementById('root')
  if (root) return root?.scrollHeight > window?.innerHeight
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

  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const motionBackground: Variants = {
    open: {
      transition,
      opacity: 1,
      height: '100vh',
      width: isLarge ? width : '100%'
    },
    closed: {
      transition,
      opacity: isLarge ? 1 : 0.95,
      width: isLarge ? closedWidth : '100%',
      height: isLarge ? '100vh' : closedWidth
    }
  }

  const contentSize = (): string => {
    if (open) return isLarge ? `calc(100% - ${width}px ` : '100%'
    return isLarge ? `calc(100% - ${closedWidth}px ` : '100%'
  }

  const content: Variants = {
    open: {
      width: contentSize(),
      x: isLarge ? width : 0,
      transition: { type: 'tween', duration: 0.31 }
    },
    closed: {
      width: contentSize(),
      x: isLarge ? closedWidth : 0,
      transition: { type: 'tween', duration: 0.19 }
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
    <Style draggable='false' hasScroll={hasScrollBar()}>
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

      {routes.map(({ paths, component, noContentMove, exact }, index) => (
        <Content
          index={index}
          key={paths[0]}
          variants={content}
          samePage={samePage}
          innerWidth={innerWidth}
          id={paths[0].replaceAll('/', '--')}
          hasScrollBar={overflow?.overflow !== 'hidden'}
          animate={open && !noContentMove ? 'open' : 'closed'}
          initial={open && !noContentMove ? 'open' : 'closed'}
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
