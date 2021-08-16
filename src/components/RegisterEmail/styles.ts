import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 24px;
  border-radius: 24px;
  width: clamp(320px, 90vw, 500px);

  background-color: ${({ theme }) => theme.colors.secondary};

  span {
    text-align: center;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 2rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 2rem);

    color: ${({ theme }) => theme.colors.tertiary};
  }

  .Form {
    width: 100%;

    > * {
      width: 100%;

      & + * {
        margin-top: 16px;
      }
    }

    input {
      width: 100%;
      padding-right: 8px;
    }
  }

  #tokenForm p {
    margin: 0;
    text-align: center;
    padding-right: 24px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 2rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 2rem);

    color: ${({ theme }) => theme.colors.tertiary};
  }

  #CloseIcon {
    position: absolute;
    top: 16px;
    right: 16px;

    height: 18px;

    stroke: ${({ theme }) => theme.colors.tertiary};
  }
`

export default Style

Style.displayName = 'RegisterEmail-Style'
