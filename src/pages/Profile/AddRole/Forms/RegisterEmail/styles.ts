import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  background-color: white;
  padding: 24px;
  border-radius: 24px;

  span {
    color: ${({ theme }) => theme.colors.tertiary};
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
  }

  form {
    > * {
      width: 100%;
      margin-top: 24px;
    }
  }
`

export default Style

Style.displayName = 'RegisterEmail-Style'
