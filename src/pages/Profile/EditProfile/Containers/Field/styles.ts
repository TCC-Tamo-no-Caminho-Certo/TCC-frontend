import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 10px;

  width: 100%;
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.tertiary};
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  .label,
  .input,
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
  }

  .label {
    margin-bottom: 8px;
  }

  .input {
    flex: 1;

    .Text,
    .Datepicker {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;

      input {
        text-align: center;
      }
    }

    .Text {
      width: 100%;
      height: 100%;
      border-radius: 0;

      input {
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  .icon {
    position: absolute;
    top: -12px;
    right: 4px;

    margin: 0 4px;
    width: 24px;
    text-align: right;

    .Icon {
      width: 18px;
      height: 18px;

      fill: ${({ theme }) => theme.colors.primary};
      stroke: ${({ theme }) => theme.colors.primary};
    }

    #CloseIcon {
      width: 16px;
      height: 16px;

      path {
        stroke-width: 50;
      }
    }
  }

  .Datepicker {
    .CalendarSize {
      font-size: 12px;
    }

    .Calendar__day.-ltr {
      font-size: 1.7rem;
    }

    .Calendar__section.-shown {
      padding: 8px 20px;
    }

    .Calendar__sectionWrapper {
      min-height: 324px;
      height: 316px;
    }

    .Calendar__monthArrow {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 16px;
      height: 16px;
      font-size: 1rem;
    }

    .Calendar__monthSelectorItemText {
      width: 230px;
    }

    .Calendar__yearSelector,
    .Calendar__monthSelector {
      padding: 0px;
    }
  }

  @media screen and (min-width: 545px) {
    height: 40px;
    flex-direction: row;

    .icon {
      position: static;
    }
  }
`

export default Style

Style.displayName = 'Container-Style'
