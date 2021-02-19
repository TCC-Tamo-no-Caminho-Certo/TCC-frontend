import React, { useCallback, useEffect, useRef, useState } from 'react'
import Style, { ListItem, SidebarNav } from './styles'

import { SidebarActions } from 'store/sidebar'
import { RootState } from 'store'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Hamburger from 'components/Hamburger'

import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router-dom'

export interface RouteProps {
  icon?: () => JSX.Element
  component?: () => JSX.Element
  label: string
  bottom?: boolean
  exact?: boolean
  noContentMove?: boolean
  paths: string[]
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

const Sidebar = ({
  routes,
  selected,
  letters,
  background,
  title = '',
  samePage = false,
  closedWidth = 72,
  width = 210
}: SidebarProps) => {
  const { innerWidth } = useWindowDimensions()
  const [isLarge, setisLarge] = useState(innerWidth >= 545)
  const open = useSelector<RootState, boolean>(({ sidebar }) => sidebar.open)
  const dispatch = useDispatch()
  const history = useHistory()
  const { pathname } = useLocation()
  const burgerRef = useRef<any>(null)

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

  const onToggle = () => dispatch(SidebarActions.toggleSidebar(!open))

  const contentSize = (): string => {
    if (open) return isLarge ? `calc(100vw - ${width}px)` : '100vw'
    return isLarge ? `calc(100vw - ${closedWidth}px)` : '100vw'
  }

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
        variants={motionBackground}
        animate={open ? 'open' : 'closed'}
        initial={!isLarge ? 'open' : 'closed'}
        letters={letters}
        background={background}
      >
        <div id='header'>
          <Hamburger
            ref={burgerRef}
            toggle={onToggle}
            state={open}
            color={letters}
          />

          <AnimatePresence>
            {open && (
              <motion.div variants={motionTitle} initial='initial' id='title'>
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
              paths={paths?.map(path => path.replaceAll('/', '-'))}
              pathname={pathname.replaceAll('/', '-')}
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

      {routes.map(({ paths, component, noContentMove, exact }) => (
        <motion.div
          key={paths[0]}
          id={paths[0].replaceAll('/', '--')}
          variants={motionContent}
          animate={open && !noContentMove ? 'open' : 'closed'}
          initial={open && !noContentMove ? 'open' : 'closed'}
          style={{
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
