import React, { useState, useCallback, useEffect } from 'react'
import Style from './styles'

import { useHomeSlider } from 'hooks/useHomeSlider'

const About: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [showAbout, setShowAbout] = useState(true)

  const loginSliderAnimation = useCallback(() => {
    if (homeSlider) {
      setTimeout(() => {
        setShowAbout(false)
      }, 1000)
    } else setShowAbout(true)
  }, [homeSlider])

  useEffect(() => loginSliderAnimation(), [loginSliderAnimation])

  return (
    <>
      {showAbout && (
        <Style>
          <h1>ABOUT</h1>
        </Style>
      )}
    </>
  )
}

export default About
