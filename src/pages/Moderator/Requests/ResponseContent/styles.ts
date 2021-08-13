import { darken } from 'polished'
import styled from 'styled-components'

interface GeneralInfoProps {
  status: string
}

export const Radios = styled.div`
  display: flex;

  .Radio {
    width: 50%;

    &#Radio-accept {
      border-radius: 8px 0 0 8px;

      &:hover {
        width: 100%;

        background-color: ${({ theme }) => darken(0.1, theme.colors.green)};
      }
    }

    &#Radio-reject {
      border-radius: 0px 8px 8px 0px;

      &:hover {
        width: 100%;

        background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
      }
    }
  }
`

export const Pretext = styled.div`
  padding: 16px;
  border-radius: 8px;
  word-break: break-all;

  background-color: ${({ theme }) => theme.colors.primary};

  p {
    padding: 8px 16px;
  }
`

export const Voucher = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 80vh;

  iframe {
    width: 100%;
    height: 100%;
  }
`

export const Header = styled.header`
  display: flex;
  position: relative;

  min-height: 32px;

  button {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    padding: 8px;
    height: 100%;
    font-size: 1.6rem;
    border-radius: 4px;
    margin-right: 24px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.red};

    .Icon {
      height: 16px;
    }

    #TrashIcon {
      min-width: 18px;
      min-height: 18px;
      margin-right: 8px;

      #verticalStrokes {
        fill: ${({ theme }) => theme.colors.primary};
      }

      #background {
        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  #CloseIcon {
    position: absolute;
    top: 50%;
    right: 0;

    width: 18px;
    height: 18px;
    transform: translateY(-50%);

    stroke: ${({ theme }) => theme.colors.secondary};
  }
`

export const GeneralInfo = styled.div<GeneralInfoProps>`
  #status #value {
    color: ${({ theme }) => {
      switch (status) {
        case 'accepted':
          return theme.colors.green
        case 'rejected':
          return theme.colors.red
        default:
          return theme.colors.yellow
      }
    }};
  }

  > * + * {
    margin-top: 16px;
  }
`

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 90%;
  height: 90vh;
  padding: 16px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 16px;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  &,
  .Form {
    > * {
      width: 100%;

      & + * {
        margin-top: 16px;
      }
    }
  }
`

export default Style

Radios.displayName = 'Radios-Style'
Pretext.displayName = 'Pretext-Style'
Voucher.displayName = 'Voucher-Style'
Header.displayName = 'Header-Style'
GeneralInfo.displayName = 'GeneralInfo-Style'
Style.displayName = 'ResponseContent-Style'
