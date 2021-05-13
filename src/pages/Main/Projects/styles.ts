import styled from 'styled-components'

const Style = styled.section`
  header {
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    width: max(100%, 280px);

    padding-top: 24px;
  }

  #newProject {
    position: absolute;
    left: 50%;
    bottom: 24px;

    width: 90%;
    height: 48px;
    border-radius: 16px;
    transform: translateX(-50%);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`
export default Style

Style.displayName = 'Projects-Style'
