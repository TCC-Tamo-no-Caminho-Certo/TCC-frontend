import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { useSelector, RootState } from 'store'

import { Switch, Route } from 'react-router-dom'

export interface RouteProps {
  path: string
  icon?: string
  exact?: boolean
  label?: string
  content(): JSX.Element
}

interface ContentProps {
  routes: RouteProps[]
}

const Content: React.FC<ContentProps> = ({ routes }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)

  const cycle = () => (!open ? 'closed' : 'open')

  const content = {
    open: {
      width: 'calc(100vw - 72px)',
      x: 72,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    closed: {
      width: 'calc(100vw - 210px)',
      x: 210,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  return (
    <Style theme={theme} variants={content} initial={false} animate={cycle()}>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            children={<route.content />}
          />
        ))}
      </Switch>
    </Style>
  )
}

export default Content
