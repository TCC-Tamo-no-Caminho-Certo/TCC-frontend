import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 16px;
  font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);

  color: ${({ theme }) => theme.colors.secondary};
  border: solid 1px ${({ theme }) => theme.colors.secondary};

  #value {
    text-align: center;
    word-break: break-all;
    margin-top: 8px;
  }
`

export default Style

Style.displayName = 'Field-Style'
