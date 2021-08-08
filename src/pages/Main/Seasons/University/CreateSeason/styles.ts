import Form from 'components/Form'

import styled from 'styled-components'

export const Begin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  .Field {
    width: 80%;
    padding: 0 8px;
    margin-left: 8px;
    border-radius: 16px;
  }

  .CalendarSize {
    font-size: 9px !important;
  }
`

const Style = styled(Form)`
  > * + * {
    margin-top: 16px;
  }

  .Submit {
    width: 100%;
  }
`

export default Style

Begin.displayName = 'Begin-Style'
Style.displayName = 'CreateSeason-Style'
