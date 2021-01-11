import React, { useCallback, useEffect } from 'react'
import { ListItem, SidebarNav } from './styles'

import getAllIndexes from 'utils/getAllIndexes'

import { SidebarActions } from 'store/sidebar'
import { RootState } from 'store'

import Hamburger from 'components/Hamburger'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router-dom'

export interface RouteProps {
  icon?: () => JSX.Element
  component?: () => JSX.Element
  label: string
  path: string
  isBigInOther?: boolean
  bottom?: boolean
  exact?: boolean
  path2?: string
  noContentMove?: boolean
}

interface SidebarProps {
  routes: RouteProps[]
  selected: string
  letters: string
  background: string
  title?: string
  samePage?: boolean
  closedWidth?: number
  width?: number
  scrollBarSize?: number
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  title = '',
  samePage = false,
  selected,
  letters,
  background,
  closedWidth = 72,
  width = 210,
  scrollBarSize = 15,
}) => {
  const open = useSelector<RootState, boolean>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  const contentSize = (): string => {
    const isBig = routes.map(route => route.isBigInOther === true)
    const indexesOfBigs = getAllIndexes<boolean>(isBig, true)
    const pathOfBigs = []

    for (let i = 0; i < indexesOfBigs.length; i += 1) {
      pathOfBigs.push(routes[indexesOfBigs[i]].path)
    }

    if (samePage || pathOfBigs.find(el => el === pathname))
      return open
        ? `calc(100vw - ${width + scrollBarSize}px)`
        : `calc(100vw - ${closedWidth + scrollBarSize}px)`
    return open ? `calc(100vw - ${width}px)` : `calc(100vw - ${closedWidth}px)`
  }

  const moveCorrectly = useCallback(
    (index: number): void => {
      const heightOfRoutes = routes.map(({ path }) => {
        const id = path.replaceAll('/', '--')
        return document.getElementById(id)?.offsetHeight
      })

      const move =
        heightOfRoutes !== undefined &&
        heightOfRoutes.reduce((prev, curr, i) => {
          return i < index && prev !== undefined && curr !== undefined ? prev + curr : prev
        }, 0)

      window.scrollTo(0, move as number)
    },
    [routes]
  )

  useEffect(() => {
    const pathArray = routes.map(({ path }) => (path === pathname ? 1 : 0))
    const selectedIndex = pathArray.indexOf(1)
    moveCorrectly(selectedIndex)
  }, [moveCorrectly, pathname, routes])

  const motionContent: Variants = {
    open: {
      x: width,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.31,
      },
    },
    closed: {
      x: closedWidth,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.19,
      },
    },
  }

  const motionBackground: Variants = {
    open: {
      width,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    closed: {
      width: closedWidth,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  const motionTitle: Variants = {
    initial: {
      opacity: 0,
      x: -24,
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    closed: {
      opacity: 0,
      x: -24,
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },
  }

  return (
    <>
      <SidebarNav
        variants={motionBackground}
        animate={open ? 'open' : 'closed'}
        initial={open ? 'open' : 'closed'}
        letters={letters}
        background={background}
      >
        <div id='header'>
          <Hamburger toggle={onToggle} state={open} color={letters} />

          <AnimatePresence>
            {open && (
              <motion.div variants={motionTitle} initial='initial' id='title'>
                {title}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul>
          {routes.map((route, index) => (
            <ListItem
              selected={selected}
              key={route.path}
              bottom={route.bottom}
              pathname={pathname.replaceAll('/', '-')}
              buttonId={route.path.replaceAll('/', '-')}
              buttonId2={route.path2 ? route.path2.replaceAll('/', '-') : 'none'}
            >
              <button
                type='button'
                id={route.path.replaceAll('/', '-')}
                onClick={() => {
                  samePage && moveCorrectly(index)
                  history.push(route.path)
                }}
              >
                {route.icon !== undefined && (
                  <div className='icon'>
                    <route.icon />
                  </div>
                )}

                <AnimatePresence>
                  {open && (
                    <motion.div
                      className='label'
                      initial={{
                        opacity: 0,
                        x: -24,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: 'tween',
                          duration: 0.4,
                          delay: 0.1 * index,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        x: -24,
                        transition: {
                          type: 'tween',
                          duration: 0.1,
                        },
                      }}
                    >
                      {route.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </ListItem>
          ))}
        </ul>
      </SidebarNav>

      {routes.map(route => (
        <motion.section
          key={route.path}
          variants={motionContent}
          animate={open && !route.noContentMove ? 'open' : 'closed'}
          initial={open && !route.noContentMove ? 'open' : 'closed'}
          id={route.path.replaceAll('/', '--')}
        >
          {samePage ? (
            route.component && route.component()
          ) : (
            <>
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />

              {route.path2 && (
                <Route
                  key={route.path2}
                  path={route.path2}
                  exact={route.exact}
                  component={route.component}
                />
              )}
            </>
          )}
        </motion.section>
      ))}
    </>
  )
}

export default Sidebar
