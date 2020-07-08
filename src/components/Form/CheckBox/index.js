import React, {useState, useEffect, useRef, useContext} from "react"
import Style from "./styles"
import FlexBox from "components/FlexBox"
import ErrorMessage from "components/Form/ErrorMessage"
import {useField} from "@unform/core"
import {ThemeContext} from "styled-components"
import anime from "animejs"

export default function CheckBox({name, children, ...rest}) {
  const checkBoxRef = useRef(null)
  const theme = useContext(ThemeContext)
  const [checked, setChecked] = useState(false)
  const {fieldName, registerField, error} = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkBoxRef.current,
      path: "checked",
    })
  }, [fieldName, registerField])

  function onCheckBoxClick() {
    const checkedAnimation = anime.timeline({
      targets: `#${name}Path`,
      duration: 300,
      easing: "easeInOutSine",
    })
    if (checked) {
      checkedAnimation.add({
        d: "M3 6",
      })
    } else {
      checkedAnimation.add({
        d: ["M3 6", "M3 6 l3 4", "M3 6 l3 4 l7 -6"],
      })
    }
    setChecked(!checked)
  }

  function onCheckBoxChange() {
    setChecked(!checked)
  }

  return (
    <Style className="CheckBox">
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <input
        ref={checkBoxRef}
        type="checkbox"
        checked={checked}
        onChange={onCheckBoxChange}
        {...rest}
      />
      <FlexBox row as="label" htmlFor={name} onClick={onCheckBoxClick}>
        <svg
          className="checkboxIcon"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="gradient" cx="0%" cy="0%" r="100%">
              <stop offset="40%" stopColor={theme.checkbox} />
              <stop offset="100%" stopColor={theme.checkboxBorder} />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="15" height="15" stroke="url(#gradient)" />
          <path id={`${name}Path`} d="M3 6" stroke="url(#gradient)" />
        </svg>
        <span>{children}</span>
      </FlexBox>
    </Style>
  )
}
