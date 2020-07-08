import styled from "styled-components"
import FlexBox from "components/FlexBox"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled(FlexBox)`
  flex-direction: row;
  max-width: 300px;
  text-align: center;

  span,
  svg {
    font-size: 1.1rem;
  }

  #errorMessage {
    display: block;
    margin: 0 0 0px 10px;
    color: ${fromTheme("tertiary")};
  }
`

export default Style
