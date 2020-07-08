import styled from "styled-components"
import FlexBox from "components/FlexBox"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled(FlexBox)`
  grid-area: signUp;
  width: 100%;
  min-height: 100%;
  padding: 5vh 0 5vh 0;
  background-color: ${fromTheme("background")};

  button {
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .InputText,
  .Select,
  .CheckBox,
  #welcome {
    margin-bottom: 20px;
  }

  #welcome {
    font-size: 1.7rem;
    color: ${fromTheme("tertiary")};
  }
  #x {
    padding-left: 80%;

    span {
      display: none;
      color: ${fromTheme("tertiary")};
    }
  }

  @media screen and (min-height: 830px) {
    #x {
      padding-left: 60%;
      span {
        display: block;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    border-left: solid 2px ${fromTheme("primary")};
    #row {
      flex-direction: row;
    }
    #col1 {
      margin-right: 100px;
    }
    #x {
      padding-left: 80%;
    }
  }
`

export default Style
