import styled from "styled-components"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled.div`
  #teste {
    border: solid red 2px;
  }
  input {
    display: none;
  }
  strong {
    font-weight: normal;
    cursor: pointer;
    color: ${fromTheme("checkboxBorder")};
  }
  span {
    color: ${fromTheme("checkbox")};
    & + span {
      color: ${fromTheme("checkboxBorder")};
    }
  }

  .checkboxIcon {
    margin-right: 20px;
  }
`

export default Style
