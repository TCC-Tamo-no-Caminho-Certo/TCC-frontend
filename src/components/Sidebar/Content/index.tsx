import React from 'react'

import { useSelector, RootState } from 'store'

import { motion } from 'framer-motion'
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
  const open = useSelector<RootState>(({ sidebar }) => sidebar.open)

  const cycle = () => (open ? 'closed' : 'open')

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
    <motion.section variants={content} initial={false} animate={cycle()}>
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
    </motion.section>
  )
}

export default Content
