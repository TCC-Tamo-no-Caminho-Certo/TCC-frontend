import styled from "styled-components"
import FlexBox from "components/FlexBox"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled(FlexBox)`
  grid-area: signIn;
  width: 100%;
  height: 100%;
  background-color: ${fromTheme("background")};
  padding: 5vh 0 5vh 0;

  img {
    width: 34px;
    margin-right: 12px;
    cursor: pointer;
    &:hover {
      width: 36px;
      margin-right: 10px;
    }
  }

  .InputText,
  #Logo,
  #other {
    margin-bottom: 20px;
  }
  .Switch {
    padding-right: 45%;
    margin-left: 100%;
  }

  @media screen and (min-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`

export default Style
