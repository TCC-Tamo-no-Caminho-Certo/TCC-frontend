import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'
import { Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
  hasDate: boolean
}

export const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 44px;
  position: relative;
  border-radius: 10px;
  background-color: transparent;
  border: solid 1px ${fromTheme('tertiary')};

  svg {
    width: 10%;
    color: ${fromTheme('tertiary')};
  }

  input {
    height: 100%;
    padding: 0 4px;
    border: none;
    flex: 1;
    background-color: transparent;
    font-size: 1.6rem;
    color: ${fromTheme('primary')};

    &::placeholder {
      color: ${fromTheme('tertiary')};
    }
  }

  .date {
    flex: 1;
    height: 100%;

    .date-input {
      width: 112%;
      text-align: left;
      cursor: pointer;
    }
  }


  ${({ hasDate }) =>
    hasDate &&
    css`
      cursor: pointer;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${fromTheme('primary')};
      &,
      input::placeholder,
      svg {
        color: ${fromTheme('primary')};
      }
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      svg {
        color: ${fromTheme('primary')};
      }
    `}

  ${({ hasIcon, isErrored }) =>
    !hasIcon &&
    !isErrored &&
    css`
      input {
        padding-left: 20px;
      }
    `}

`

export const Tooltip = styled(Popup)`
  color: ${fromTheme('secondary')}!important;
  font-size: 1.3rem !important;
  border-radius: 10px !important;
  opacity: 0.94 !important;
  border: none !important;

  &,
  &:before {
    background-color: ${fromTheme('primary')} !important;
  }

  &:before {
    box-shadow: none !important;
    margin-left: 4px !important;
  }
`
