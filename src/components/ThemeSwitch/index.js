import React, { useContext } from "react"

import useTheme from "store/useTheme"
import { ThemeContext } from "styled-components"
import Switch from "react-switch"
import FlexBox from 'components/FlexBox'
function ThemSwitch() {
  const themes = useContext(ThemeContext)
  const { theme, setTheme } = useTheme()

  return (
    <FlexBox row className="Switch">
      <span style={{ color: themes.tertiary }}>Darkmode</span>
      <Switch
        offColor={themes.primary}
        onColor={themes.tertiary}
        offHandleColor={themes.secondary}
        onHandleColor={themes.primary}
        onChange={() => setTheme(!theme)}
        checked={theme}
        uncheckedIcon={false}
        checkedIcon={false}
        height={18}
        width={35}
      />
    </FlexBox>
  )
}

export default ThemSwitch
