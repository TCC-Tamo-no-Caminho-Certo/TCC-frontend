import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 100%;
  font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.tertiary};
  border: solid 2px ${({ theme }) => theme.colors.tertiary};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;

    &.label {
      width: 25%;
    }

    &.input {
      flex: 1;

      .Text,
      .Datepicker {
        border: none;
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

    &.icon {
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
  }
`

export default Style

Style.displayName = 'Field-Style'
