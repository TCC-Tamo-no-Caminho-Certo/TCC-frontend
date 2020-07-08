import styled from "styled-components"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

export const ButtonPrimary = styled.button.attrs(({type}) => ({
  type: type,
}))`
  border-width: 0px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 1.2rem;
  width: ${({width}) => width};
  height: ${({height}) => height};
  background-image: ${fromTheme("buttonPrimary")};
  background-color: ${fromTheme("buttonPrimary")};
  color: ${fromTheme("secondary")};
`

export const ButtonSecondary = styled(ButtonPrimary)`
  background-image: none;
  background-color: ${fromTheme("buttonSecondary")};
`

ButtonPrimary.defaultProps = {
  width: "258px",
  height: "40px",
  type: "button",
}

ButtonSecondary.defaultProps = {
  width: "120px",
  height: "36px",
  type: "button",
}
