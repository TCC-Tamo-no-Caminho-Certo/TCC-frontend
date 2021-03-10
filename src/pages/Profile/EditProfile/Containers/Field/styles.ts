import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 0 4px;
  width: 100%;
  border-radius: 5px;
  height: 80px;

  color: ${({ theme }) => theme.colors.tertiary};
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
    height: 40px;

    &.label {
      min-width: 64px;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
    }

    &.input {
      flex: 1;

      .value,
      .Datepicker input,
      .Text {
        font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
      }

      .Datepicker,
      .Text {
        width: 100%;
        border: none;

        input {
          width: 100%;
          text-align: center;
        }
      }

      .value {
        padding-left: 16px;
      }
    }

    &.icon {
      position: absolute;
      top: 0px;
      right: 8px;

      width: 24px;
      text-align: right;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

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
  }

  @media screen and (min-width: 545px) {
    height: 40px;
    flex-direction: row;

    button.icon {
      position: static;
    }
  }
`

export default Style

Style.displayName = 'Container-Style'
