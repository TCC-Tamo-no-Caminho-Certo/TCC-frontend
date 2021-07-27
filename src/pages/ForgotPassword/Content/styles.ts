import styled from 'styled-components'

export const ConfirmCode = styled.div`
  .Submit {
    display: flex;
    align-items: center;
    justify-content: center;

    .Icon {
      width: 32px;
      height: 32px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 16px;
  border-radius: 10px;
  width: min(90%, 500px);

  box-shadow: -8px 8px 10px -4px rgba(0, 0, 0, 0.49);
  background: ${({ theme }) => theme.colors.secondary};

  p {
    margin: 0;
    text-align: center;
  }

  form > * {
    margin-top: 16px;
  }

  .FullLogo {
    margin-bottom: 16px;
  }

  .Submit {
    width: 100%;
    height: 44px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export default Style

ConfirmCode.displayName = 'ConfirmCode-Style'
Style.displayName = 'Content-Style'
