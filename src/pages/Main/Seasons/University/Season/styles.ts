import Form from 'components/Form'

import styled from 'styled-components'

export const Edict = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 44px;
  border-radius: 0 0 8px 8px;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};

  .Icon {
    height: 18px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.secondary};
  }
`

export const Begin = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  font-size: clamp(1.3rem, 0.6rem + 2.6vw, 2rem);

  .Field {
    height: 42px;
    margin-left: 4px;
  }

  #label {
    margin-bottom: 8px;
  }

  @media screen and (min-width: 545px) {
    .Field {
      .CalendarSize {
        font-size: 9px !important;
      }

      > div {
        width: 180px;
      }
    }
  }

  @media screen and (min-width: 900px) {
    flex-direction: row;

    span {
      margin-bottom: 0px;
    }
  }
`

const Style = styled(Form)`
  position: relative;
  z-index: 1;

  > * + * {
    margin-top: 16px;
  }

  .Submit {
    width: 100%;
  }

  .Textarea {
    min-width: 100%;

    textarea {
      background-color: transparent;
    }
  }
`

export default Style

Edict.displayName = 'Edict-Style'
Begin.displayName = 'Begin-Style'
Style.displayName = 'Season-Style'
