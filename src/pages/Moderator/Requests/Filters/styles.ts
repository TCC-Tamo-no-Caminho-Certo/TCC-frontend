import Form from 'components/Form'

import styled from 'styled-components'

const Style = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 0 16px 0 8px;
  margin-bottom: 16px;
  width: max(100%, 280px);

  .Presence {
    width: 100%;

    & > * {
      width: 100%;
      margin-bottom: 16px;
    }

    .Text {
      height: 40px;
    }

    .Select {
      height: 40px;
      border-radius: 8px;

      .Select__control {
        height: 40px;
      }
    }

    #row {
      display: flex;
      align-items: center;
      justify-content: center;

      box-shadow: none;

      & > * {
        width: 100%;

        & + * {
          margin-left: 24px;
        }
      }

      .Datepicker {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 40px;

        .Text {
          height: 40px;
          min-width: 100px;

          input {
            height: 40px;
          }
        }
      }
    }
  }

  #buttons {
    display: flex;
    flex-direction: row;

    width: 100%;

    .Submit {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 40px;

      border-radius: 16px 0 0 16px;

      color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      background-color: ${({ theme }) => theme.colors.primary};

      .Icon {
        margin-right: 12px;
        height: 16px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }

    .Submit + button {
      align-self: flex-end;

      padding: 4px 16px;
      width: 200px;
      height: 40px;

      transition: all 0.2s;
      border-radius: 0 16px 16px 0;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        transform: scale(1.01);
        filter: brightness(1.1);
      }
    }
  }
`

export default Style

Style.displayName = 'Filters-Style'