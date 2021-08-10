import Form from 'components/Form'

import styled from 'styled-components'

export const Begin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  .CalendarSize {
    font-size: 9px !important;
  }
`

const Style = styled(Form)`
  .AnimatedList .Content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    padding: 8px;
    border-radius: 0px 0px 16px 16px;

    border: solid 1px ${({ theme }) => theme.colors.tertiary};

    > * + * {
      margin-top: 16px;
    }

    .Submit {
      width: 100%;
    }
  }
`

export default Style

Begin.displayName = 'Begin-Style'
Style.displayName = 'CreateSeason-Style'
