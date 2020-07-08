import styled from "styled-components"
import Select from "react-select"

const fromTheme = (attribute) => ({theme}) => theme[attribute]

const Style = styled(Select)`
  font-size: 1.2rem;
  width: 258px;
  & div {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
  &:hover {
    .select__dropdown-indicator,
    .select__placeholder,
    .select__single-value {
      color: ${fromTheme("tertiary")};
    }
    .select__control {
      border-color: ${fromTheme("tertiary")};
    }
  }
  .select__control,
  .select__value-container,
  .select__dropdown-indicator,
  .select__option,
  .select__single-value {
    background-color: transparent;
    box-shadow: none;
  }
  .select__control {
    border-radius: 0px;
    border: ${fromTheme("primary")} solid 1px;
  }
  .select__option {
    padding: 5px 5px 5px 15px;
    color: white;
    background-color: ${fromTheme("primary")};
    &:active,
    &:hover {
      background-color: ${fromTheme("tertiary")};
    }
  }
  .select__single-value {
    color: ${fromTheme("primary")};
  }
  .select__placeholder,
  .select__dropdown-indicator {
    color: ${fromTheme("primary")};
  }
  .select__placeholder,
  .select__single-value {
    margin-left: 15px;
  }
  .select-container {
    margin-top: 2px;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__menu {
    margin-top: 5px;
    border-radius: 0px;
    box-shadow: none;
    padding: 0;
  }
  .select__menu-list {
    background-color: ${fromTheme("primary")};
    box-shadow: none;
    margin: 0;
    padding: 5px;
  }
`

export default Style
