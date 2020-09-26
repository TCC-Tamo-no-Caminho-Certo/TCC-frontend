import React, { useState, useCallback, useEffect } from 'react'
import Style from './styles'

import { useHomeSlider } from 'hooks/useHomeSlider'
import { useSelector, RootState, ThemeState } from 'store'

const About: React.FC = () => {
  const { homeSlider } = useHomeSlider()
  const [showAbout, setShowAbout] = useState(true)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  
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
        <Style theme={theme}>
          <h1>ABOUT</h1>
        </Style>
      )}
    </>
  )
}

export default About
