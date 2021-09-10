import styled from 'styled-components'

export const ConfirmCode = styled.div`
  width: 100%;

  p {
    margin: 8px 0;
  }

  .Submit .Icon {
    width: 32px;
    height: 32px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.secondary};
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

  box-shadow: ${({ theme }) => theme.shadow.normal};
  background: ${({ theme }) => theme.colors.secondary};

  p {
    text-align: center;
  }

  .FullLogo {
    height: clamp(94px, 25vw, 130px);
  }

  .Form {
    margin-top: 8px;

    > * + * {
      margin-bottom: 8px;
    }

    .Submit {
      margin-bottom: 0;
    }
  }

  .Submit {
    width: 100%;
    height: 44px;
    margin-bottom: 0px;

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
