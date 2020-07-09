import styled from "styled-components"

const fromTheme = (attribute) => ({ theme }) => theme[attribute]

const Style = styled.div`
  overflow-x: hidden; 
  display: grid;
  background-color: ${fromTheme("background")};

  span {
    font-size: 1.2rem;
    margin-right: 20px;
  }

  grid:
    "signIn signUp" ${({ register }) =>
    register === true ? "minmax(100vh, auto)" : "100vh"}
    "about ." 100vh/ 100vw 100vw;

  @media screen and (min-width: 1200px) {
    grid: "about signIn signUp" ${({ register }) =>
    register === true ? "minmax(100vh, auto)" : "100vh"} / 70vw 30vw 70vw;
  }
`

export default Style
