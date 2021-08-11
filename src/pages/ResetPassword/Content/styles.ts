import styled from 'styled-components'

const Style = styled.section`
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

  .Form {
    width: 100%;

    > * + * {
      width: 100%;
      margin-top: 8px;
    }

    .Submit {
      width: 100%;
      height: 44px;
      transition: all 0.2s;
    }
  }

  .FullLogo {
    height: clamp(94px, 25vw, 130px);
  }
`

export default Style

Style.displayName = 'Content-Style'
