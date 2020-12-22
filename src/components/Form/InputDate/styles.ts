/* eslint-disable max-len */
// import fromTheme from 'utils/fromTheme'

import styled, { css } from 'styled-components'

interface StyleProps {
  arrow?: string
}

const Style = styled.div<StyleProps>`
  .DatePicker {
    width: 100%;
    height: 4.5vh;
    min-height: 35px;
    padding: 0;
  }

  .Calendar {
    --cl-color-primary: ${props => props.theme.calendar.primary} !important;
    --cl-color-disabled: ${props => props.theme.calendar.disabled} !important;
    --cl-color-primary-light: #fcfcfc !important;
    box-shadow: 8px 8px 7px 4px rgba(0, 0, 0, 0.49);
  }

  .Calendar__header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: ${props => props.theme.calendar.header};
    border-bottom: solid 2px ${props => props.theme.calendar.header};
    padding: 10px;
    border-radius: 20px 20px 0px 0px;

    .Calendar__monthText,
    .Calendar__yearText {
      width: 60%;
    }

    .Calendar__monthArrowWrapper {
      width: 25px;
    }

    .Calendar__monthArrowWrapper.-right {
      padding: 0;
      transform: rotate(180deg);
    }

    .Calendar__monthArrowWrapper.-left {
      padding: 0;
      transform: rotate(360deg);
    }
  }

  .Calendar__weekDays {
    margin: 0;
    padding: 0 20px 10px 20px;
    background-color: ${props => props.theme.calendar.header};
    .Calendar__weekDay {
      text-decoration: none;
    }
  }

  .Calendar__monthSelector.-open,
  .Calendar__yearSelector.-open {
    border-radius: 0px 0px 20px 20px;
  }

  .Calendar__yearSelectorWrapper,
  .Calendar__yearSelectorWrapper.-faded {
    &::before,
    &::after {
      display: none;
    }
  }

  .Calendar.-noFocusOutline.-ltr {
    padding: 0;
    border-radius: 30px 30px 20px 20px;
  }

  .Calendar__monthSelectorItem .Calendar__monthSelectorItemText {
    font-size: 1.4rem;
  }

  .CalendarSize {
    background-color: ${props => props.theme.calendar.background};
    font-size: 8px !important;
  }

  .Calendar__sectionWrapper {
    min-height: 30em;
  }

  .DatePicker__calendarArrow {
    ${({ arrow }) =>
      arrow === 'bottom'
        ? css`
            border-color: transparent transparent ${props => props.theme.calendar.header}
              transparent;
          `
        : css`
            border-color: transparent transparent ${props => props.theme.calendar.background}
              transparent;
          `}
  }

  .Calendar__section.-shown,
  .Calendar__monthSelector.-open,
  .Calendar__yearSelector.-open,
  .Calendar.-noFocusOutline.-ltr {
    background-image: none;
    background-color: ${props => props.theme.calendar.background};
  }

  .Calendar__monthText,
  .Calendar__yearText,
  .Calendar__weekDay {
    color: #fcfcfc;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }

  .Calendar__monthArrow {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='24' viewBox='0 0 14 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.49998 1L12.5 12L1.49998 23' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  .Calendar__yearSelectorText {
    color: ${props => props.theme.calendar.tertiary};
    &:disabled {
      color: ${props => props.theme.calendar.disabled} !important;
      opacity: 1;
    }

    &:hover {
      color: #fcfcfc;
      background-color: ${props => props.theme.calendar.primary}!important;
    }
  }

  .Calendar__day.-ltr {
    color: ${props => props.theme.calendar.tertiary};
    &:hover {
      background-color: #d65881 !important;
      color: ${props => props.theme.calendar.secondary} !important;
    }
  }

  .Calendar__day.-ltr.-selected {
    color: #fcfcfc;
  }

  .Calendar__day.-ltr.-disabled {
    display: none;
  }

  .Calendar__monthSelectorItem.-active .Calendar__monthSelectorItemText {
    color: #fcfcfc;
  }

  .Calendar__monthSelectorItemText:disabled,
  .Calendar__yearSelectorText:disabled {
    opacity: 1;
    color: ${props => props.theme.calendar.disabled}!important;
  }

  .Calendar__yearText.-activeBackground,
  .Calendar__monthText.-activeBackground {
    background-color: ${props => props.theme.calendar.primary} !important;
  }

  @media screen and (min-height: 900px) {
    .CalendarSize {
      font-size: 10px !important;
    }

    .Calendar__monthSelector.-open,
    .Calendar__yearSelector.-open {
      margin-top: 1%;
      padding-bottom: 10%;
    }
  }
`

export default Style

Style.displayName = 'InputDate-Style'
