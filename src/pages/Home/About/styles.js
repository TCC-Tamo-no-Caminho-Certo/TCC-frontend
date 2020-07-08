import styled from "styled-components"
import FlexBox from "components/FlexBox"
const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled(FlexBox)`
  grid-area: about;
  min-height: 100vh;
  font-size: 2rem;
  background-color: ${fromTheme("primary")};
  color: ${fromTheme("secondary")};
`

export default Style
