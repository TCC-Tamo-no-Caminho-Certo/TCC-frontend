import React, { useState, useEffect, useCallback } from 'react'
import Style from './styles'

import { useHomeSlider } from 'hooks/useHomeSlider'
import { useSelector, RootState, ThemeState } from 'store'

const Subscribe: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [showSubscribe, setShowSubscribe] = useState(false)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const SubscribeSliderAnimation = useCallback(() => {
    if (homeSlider) setShowSubscribe(true)
    else {
      setTimeout(() => {
        setShowSubscribe(false)
      }, 1000)
    }
  }, [homeSlider])

  useEffect(() => SubscribeSliderAnimation(), [SubscribeSliderAnimation])

  return (
    <>
      {showSubscribe && (
        <Style theme={theme}>
          <h1>SUBSCRIBE</h1>
        </Style>
      )}
    </>
  )
}

export default Subscribe
