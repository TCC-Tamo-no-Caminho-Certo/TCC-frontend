import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
}

const Style = styled.div<StyleProps>`
  width: 440px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: transparent;
  border: solid 1px ${fromTheme('tertiary')};

  svg {
    width: 10%;
  }

  .DatePicker {
    flex: 1;
    height: 100%;

    input {
      background-color: transparent;
      width: 111%;
      height: 100%;
      border: none;
      font-size: 1.6rem;
      color: ${fromTheme('primary')};
    }
  }

  .CalendarSize {
    font-size: 9px !important;
  }

  .Calendar.-noFocusOutline.-ltr {
    padding: 0;
    border-radius: 20px;
  }

  .DatePicker__calendarArrow {
    border-color:  transparent transparent ${fromTheme('tertiary')} transparent;
  }

  .Calendar__header {
    padding: 10px;
    border-radius: 20px 20px 0px 0px;
    background-color: ${fromTheme('tertiary')};
  }

  .Calendar__monthArrow {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='24' viewBox='0 0 14 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.49998 1L12.5 12L1.49998 23' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  .Calendar__monthArrowWrapper.-right {
    padding: 0px;
    transform: rotate(180deg);
  }

  .Calendar__monthText,
  .Calendar__yearText {
    color: ${fromTheme('secondary')};

    &:hover {
      background-color: ${fromTheme('primary')};
    }
  }

  .Calendar__monthArrowWrapper.-left {
    transform: rotate(360deg);
    padding: 0px;
  }

  .Calendar__weekDays {
    padding: 0 20px 10px 20px;
    color: ${fromTheme('secondary')};
    background-color: ${fromTheme('tertiary')};
  }

  .Calendar__weekDay {
    text-decoration: none;
  }

  .Calendar__day.-ltr {
    color: ${fromTheme('tertiary')};
  }

  .Calendar__day.-ltr.-selected {
    color: ${fromTheme('secondary')};
  }

  .Calendar__day.-ltr.-disabled {
    display: none;
  }

  .Calendar__yearSelectorText:disabled {
    color: #c53030 ;
    opacity: 1;
  }

  .Calendar__yearSelector {
  }

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

export default Style
