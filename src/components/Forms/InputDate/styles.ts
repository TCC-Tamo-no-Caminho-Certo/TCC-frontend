import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
}

const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;

  height: 40px;
  border-radius: 10px;

  background-color: transparent;
  border: solid 1px ${fromTheme('quaternary')};

  .icon {
    width: 15%;
    height: 40%;

    color: ${fromTheme('quaternary')};
  }

  .DatePicker {
    width: 70%;
    height: 100%;
    padding: 0;

    input {
      width: calc(121.5% - 10px);
      height: calc(100% - 1px);

      border-color: transparent;
      background-color: transparent;

      &::placeholder {
        color: ${fromTheme('quaternary')};
      }
    }
  }

  .Calendar__header {
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

    .Calendar__weekDay {
      text-decoration: none;
    }
  }

  .Calendar__monthSelector.-open,
  .Calendar__yearSelector.-open {
    transform: translateY(1em);
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
    font-size: 8px !important;
  }

  .Calendar__section {
    padding-top: 5%;
  }

  .Calendar__sectionWrapper {
    min-height: 30em;
  }

  .DatePicker__calendarArrow {
    border-color: transparent transparent ${fromTheme('calendarHeader')} transparent;
  }

  .Calendar__section.-shown,
  .Calendar__monthSelector.-open,
  .Calendar__yearSelector.-open,
  .Calendar.-noFocusOutline.-ltr {
    background-image: none;
    background-color: ${fromTheme('calendarBackground')};
  }

  .Calendar__monthText,
  .Calendar__yearText,
  .Calendar__weekDay {
    color: ${fromTheme('calendarSecondary')};

    &:hover {
      background-color: transparent;
    }
  }

  .Calendar__monthArrow {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='24' viewBox='0 0 14 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.49998 1L12.5 12L1.49998 23' stroke='white' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  .Calendar__weekDays {
    background-color: ${fromTheme('calendarHeader')};
  }

  .Calendar__yearSelectorText {
    color: ${fromTheme('calendarTertiary')};

    &:disabled {
      color: ${fromTheme('calendarDisabled')}!important;
      opacity: 1;
    }

    &:hover {
      background-color: ${fromTheme('calendarPrimary')}!important;
    }
  }

  .Calendar__day.-ltr {
    color: ${fromTheme('calendarTertiary')};

    &:hover {
      background-color: ${fromTheme('primary')} !important;
      color: ${fromTheme('calendarSecondary')} !important;
    }
  }

  .Calendar__day.-ltr.-selected {
    color: ${fromTheme('calendarSecondary')};
  }

  .Calendar__day.-ltr.-disabled {
    display: none;
  }

  .Calendar__monthSelectorItem .Calendar__monthSelectorItemText {
    color: ${fromTheme('calendarTertiary')};
  }

  .Calendar__monthSelectorItem.-active .Calendar__monthSelectorItemText {
    color: ${fromTheme('calendarSecondary')};
  }

  .Calendar__header {
    background-color: ${fromTheme('calendarHeader')};
    border-bottom: solid 2px ${fromTheme('calendarHeader')};
  }

  .Calendar__monthSelectorItemText:disabled,
  .Calendar__yearSelectorText:disabled {
    opacity: 1;
    color: ${fromTheme('calendarDisabled')}!important;
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

  ${({ isFocused }) =>
    isFocused &&
    css`
      .icon {
        color: ${fromTheme('primary')};
      }

      border-color: ${fromTheme('calendarPrimary')};
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      .icon {
        color: ${fromTheme('primary')};
      }

      svg,
      input {
        color: ${fromTheme('calendarPrimary')};
      }
    `}
`

export default Style
