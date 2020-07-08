import styled from "styled-components"

const Style = styled.div.attrs(({id}) => ({
  id: id,
}))`
  /* border: red 2px solid; */
  display: flex;
  width: ${({main}) => (main ? "100%" : "auto")};
  height: ${({main}) => (main ? "100%" : "auto")};
  width: ${({width}) => width};
  height: ${({height}) => height};
  margin: ${({margin}) => margin};
  padding: ${({padding}) => padding};
  flex-direction: ${({row}) => (row ? "row" : "column")};
  flex-wrap: ${({nowrap}) => (nowrap ? "wrap" : "nowrap")};
  justify-content: ${({content}) => content};
  align-items: ${({items}) => items};
`

Style.defaultProps = {
  main: false,
  nowrap: false,
  row: false,
  width: "content",
  height: "content",
  content: "center",
  items: "center",
  padding: "0",
  margin: "0",
}

export default Style
