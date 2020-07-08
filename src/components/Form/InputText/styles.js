import styled from "styled-components"
const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled.div`
  input {
    font-size: 1.2rem;
    width: ${({width}) => width};
    height: ${({height}) => height};
    padding-left: 30px;
    border: none;
    background-color: transparent;
    color: ${fromTheme("tertiary")};
    &::placeholder {
      color: ${fromTheme("primary")};
      transition: color 2s ease-in-out;
    }
    &:focus::placeholder {
      color: ${fromTheme("tertiary")};
    }
  }
`

export default Style
