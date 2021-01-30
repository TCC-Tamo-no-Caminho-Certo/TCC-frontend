import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  header {
    display: flex;
    align-items: center;

    width: 90%;
    padding: 16px 0;
    text-align: left;
  }
`
export default Style

Style.displayName = 'Solicitation-Style'
