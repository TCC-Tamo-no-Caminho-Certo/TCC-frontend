import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 10px;

  width: 100%;
  font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.5rem);
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.tertiary};
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;

    &.label {
      margin-bottom: 8px;
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

Style.displayName = 'Field-Style'
