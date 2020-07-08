import React, {useEffect, useContext, useCallback} from "react"
import useTheme from "store/useTheme"
import anime from "animejs"
import {ThemeContext} from "styled-components"

export default function InputLine({name, width: widthWithText, blur, focus}) {
  const themes = useContext(ThemeContext)
  const {chosenTheme} = useTheme()
  const width = widthWithText.slice(0, widthWithText.lastIndexOf("p"))

  const OnInputBlur = useCallback(() => {
    anime({
      targets: `#${name}`,
      duration: 900,
      easing: "easeInOutSine",
      stroke: [themes.tertiary, themes.primary],
    })
  }, [name, themes.primary, themes.tertiary])

  const OnInputFocus = useCallback(() => {
    anime({
      targets: `#${name}`,
      duration: 900,
      easing: "easeInOutSine",
      d: [`M0,1 h${width}`, `M${width},1 h-${width}`],
      stroke: [themes.primary, themes.tertiary],
    })
  }, [name, themes.primary, themes.tertiary, width])

  useEffect(() => OnInputFocus(), [focus, chosenTheme, OnInputFocus])
  useEffect(() => OnInputBlur(), [blur, chosenTheme, OnInputBlur])

  return (
    <svg
      className="InputLine"
      id="inputLine"
      xmlns="http://www.w3.org/2000/svg"
      height="2"
      width={width}
    >
      <path id={name} stroke={themes.tertiary} d={`M0,1 h${width}`} />
    </svg>
  )
}

InputLine.defaultProps = {
  width: "258px",
}
