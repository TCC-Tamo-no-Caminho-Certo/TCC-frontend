import React, { useCallback, useEffect, useRef, useState } from 'react'
import Style, { ListItem, SidebarNav } from './styles'

import { SidebarActions } from 'store/Sync/sidebar'
import { RootState } from 'store'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Hamburger from 'components/Hamburger'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router-dom'

export interface RouteProps {
  label: string
  paths: string[]
  exact?: boolean
  bottom?: boolean
  noContentMove?: boolean
  icon?: () => JSX.Element
  component?: () => JSX.Element
}

interface SidebarProps {
  letters: string
  selected: string
  background: string
  routes: RouteProps[]
  title?: string
  width?: number
  samePage?: boolean
  closedWidth?: number
  scrollBarSize?: number
}

const Sidebar = ({
  routes,
  letters,
  selected,
  background,
  title = '',
  width = 210,
  closedWidth = 72,
  samePage = false
}: SidebarProps) => {
  const open = useSelector<RootState, boolean>(({ sidebar }) => sidebar.open)

  const burgerRef = useRef<any>(null)

  const { innerWidth } = useWindowDimensions()
  const [isLarge, setisLarge] = useState(innerWidth >= 545)

  const history = useHistory()
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const scrollMoveCorrectly = useCallback(
    (index: number): void => {
      const heightOfRoutes = routes.map(({ paths }) => {
        const id = paths[0].replaceAll('/', '--')
        return document.getElementById(id)?.offsetHeight
      })

      const move =
        heightOfRoutes !== undefined &&
        heightOfRoutes.reduce(
          (prev, curr, i) =>
            i < index && prev !== undefined && curr !== undefined
              ? prev + curr
              : prev,
          0
        )

      window.scrollTo(0, move as number)
    },
    [routes]
  )

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  const contentSize = (): string => {
    if (open) return isLarge ? `calc(100vw - ${width}px)` : '100vw'
    return isLarge ? `calc(100vw - ${closedWidth}px)` : '100vw'
  }

  useEffect(() => {
    setisLarge(innerWidth >= 545)
  }, [innerWidth])

  useEffect(() => {
    ;(async () => {
      await dispatch(SidebarActions.toggleSidebar(!open))
      dispatch(SidebarActions.toggleSidebar(open))
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLarge])

  useEffect(() => {
    const pathArray = routes.map(({ paths }) => (paths[0] === pathname ? 1 : 0))
    const selectedIndex = pathArray.indexOf(1)
    scrollMoveCorrectly(selectedIndex)
  }, [scrollMoveCorrectly, pathname, routes])

  const motionContent: Variants = {
    open: {
      x: isLarge ? width : 0,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.31
      }
    },
    closed: {
      x: isLarge ? closedWidth : 0,
      width: contentSize(),
      transition: {
        type: 'tween',
        duration: 0.19
      }
    }
  }

  const motionBackground: Variants = {
    open: {
      height: '100vh',
      width: isLarge ? width : '100vw',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3
      }
    },
    closed: {
      height: isLarge ? '100vh' : closedWidth,
      width: isLarge ? closedWidth : '100vw',
      opacity: isLarge ? 1 : 0.95,
      transition: {
        type: 'tween',
        duration: 0.2
      }
    }
  }

  const motionTitle: Variants = {
    initial: {
      opacity: 0,
      x: -24
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.4
      }
    },
    closed: {
      opacity: 0,
      x: -24,
      transition: {
        type: 'tween',
        duration: 0.1
      }
    }
  }

  return (
    <Style draggable='false'>
      <SidebarNav
        isOpen={open}
        letters={letters}
        background={background}
        variants={motionBackground}
        animate={open ? 'open' : 'closed'}
        initial={!isLarge ? 'open' : 'closed'}
      >
        <div id='header'>
          <Hamburger
            state={open}
            ref={burgerRef}
            color={letters}
            toggle={onToggle}
          />

          <AnimatePresence>
            {open && (
              <motion.div id='title' initial='initial' variants={motionTitle}>
                {title}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul>
          {routes.map(({ paths, bottom, icon: Icon, label }, index) => (
            <ListItem
              isOpen={open}
              key={paths[0]}
              bottom={bottom}
              selected={selected}
              pathname={pathname.replaceAll('/', '-')}
              paths={paths?.map(path => path.replaceAll('/', '-'))}
              onClick={() => {
                !isLarge && onToggle()
              }}
            >
              <button
                type='button'
                id={paths[0].replaceAll('/', '-')}
                onClick={() => {
                  samePage && scrollMoveCorrectly(index)
                  history.push(paths[0])
                }}
              >
                {Icon !== undefined && (
                  <div className='icon'>
                    <Icon />
                  </div>
                )}

                <AnimatePresence>
                  {open && (
                    <motion.div
                      className='label'
                      initial={{
                        opacity: 0,
                        x: -24
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: 'tween',
                          duration: 0.4,
                          delay: 0.1 * index
                        }
                      }}
                      exit={{
                        opacity: 0,
                        x: -24,
                        transition: {
                          type: 'tween',
                          duration: 0.1
                        }
                      }}
                    >
                      {label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </ListItem>
          ))}
        </ul>
      </SidebarNav>

      {routes.map(({ paths, component, noContentMove, exact }, index) => (
        <motion.div
          key={paths[0]}
          variants={motionContent}
          id={paths[0].replaceAll('/', '--')}
          animate={open && !noContentMove ? 'open' : 'closed'}
          initial={open && !noContentMove ? 'open' : 'closed'}
          style={{
            marginTop: index === 0 && innerWidth < 545 ? 72 : 0,
            minWidth: 320
          }}
        >
          {samePage ? (
            component && component()
          ) : (
            <>
              {paths.map(path => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  component={component}
                />
              ))}
            </>
          )}
        </motion.div>
      ))}
    </Style>
  )
}

export default Sidebar
