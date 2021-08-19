import Form from 'components/Form'

import styled from 'styled-components'

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 44px;

  #cancel {
    margin-right: 16px;

    color: ${({ theme }) => theme.colors.tertiary};

    &:hover {
      transform: scale(1.01);
      filter: brightness(1.1);

      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .Submit {
    height: 40px;
    width: 200px;

    .DotsLoader {
      right: 16px;
    }
  }
`

export const ConfirmForm = styled(Form)`
  position: relative;
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  width: clamp(320px, 90vw, 500px);

  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary};

  span {
    display: block;

    text-align: center;
  }

  .Text {
    width: 100%;
    margin: 16px 0;
  }

  #CloseIcon {
    position: absolute;
    top: 16px;
    right: 16px;

    height: 18px;

    stroke: ${({ theme }) => theme.colors.tertiary};
  }
`

const Style = styled.div``

export default Style

Buttons.displayName = 'Buttons-Style'
Style.displayName = 'Component-Style'
