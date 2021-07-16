import Form from 'components/Form'

import styled from 'styled-components'

export const CreateProject = styled(Form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 500px;
  border-radius: 16px;
  padding: 48px 24px 24px 24px;

  background-color: ${({ theme }) => theme.colors.secondary};

  > * {
    width: 100%;

    & + * {
      margin-top: 24px;
    }
  }
`

const Style = styled.section`
  position: relative;

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
