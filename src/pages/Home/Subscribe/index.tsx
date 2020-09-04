import React, { useState, useEffect, useCallback } from 'react'
import Style from './styles'

import { useHomeSlider } from 'hooks/useHomeSlider'

const Subscribe: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [showSubscribe, setShowSubscribe] = useState(false)

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
        <Style>
          <h1>SUBSCRIBE</h1>
        </Style>
      )}
    </>
  )
}

export default Subscribe
