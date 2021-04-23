import styled from 'styled-components'

export const ConfirmCode = styled.div`
  .Submit {
    display: flex;
    justify-content: center;
    align-items: center;

    .Icon {
      height: 32px;
      width: 32px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: min(90%, 500px);
  padding: 16px;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: -8px 8px 10px -4px rgba(0, 0, 0, 0.49);

  p {
    text-align: center;
    margin: 0;
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
  }
`

export default Style

ConfirmCode.displayName = 'ConfirmCode-Style'
Style.displayName = 'Content-Style'
