import Form from 'components/Form'

import styled from 'styled-components'

const Style = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: max(100%, 280px);
  padding: 0 16px 0 8px;

  & > * {
    margin-bottom: 16px;

    box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
  }

  .Text {
    width: max(100%, 100px);
    min-width: 100px;
    min-height: 44px;

    input {
      width: 100%;
      min-height: 44px;
    }
  }

  .SelectRole {
    width: 100%;
    border-radius: 8px;

    .Select__control {
      height: 44px;
    }
  }

  .SelectFilter {
    min-width: 100%;
    border-radius: 8px;

    .Select__control {
      height: 44px;
    }
  }

  .Submit {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    border-radius: 8px;
    padding: 8px;
    min-height: 44px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      margin-right: 12px;
      height: 20px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  #dates {
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 10;

    width: 100%;

    transform: translateY(-2px);

    box-shadow: none;

    .Datepicker {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 50%;

      & + .Datepicker {
        margin-left: 24px;
      }

      .Text {
        min-width: 100px;

        box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      }
    }
  }

  @media screen and (min-width: 545px) {
    padding: 0 16px;
  }

  @media screen and (min-width: 660px) {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-bottom: 16px;
    height: 44px;

    & > * {
      height: 100%;
      margin-bottom: 0;
    }

    .Text,
    .SelectRole {
      margin-right: 24px;
    }

    .SelectFilter {
      margin-top: 0px;
      min-width: 120px;
    }

    .Submit {
      width: clamp(160px, 20%, 280px);
      margin-left: 24px;
    }

    #dates {
      margin-right: 24px;
    }
  }

  @media screen and (min-width: 745px) {
    padding: 0 32px;
  }
`

export default Style

Style.displayName = 'Filters-Style'
