import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: signup;
  width: 100%;
  min-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0 10px 10px 0;
  position: relative;
  background-color: ${fromTheme('secondary')};

  hr {
    border: none;
    border-top: solid 1px ${fromTheme('tertiary')};
  }

  .InputText {
    svg {
      padding: 12px 0;
    }
    & + .InputText {
      margin-top: 20px;
    }
  }

  #name,
  #surname {
    svg {
      padding: 10px 0;
    }
  }

  #name {
    border-radius: 10px 10px 0 0;
    border-bottom: none;
  }

  #surname {
    border-top: none;
    border-radius: 0 0 10px 10px;
    margin-top: 0px;
  }

  #password {
    input + svg {
      padding: 10px 0;
    }
  }
`

export const Text = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 1.3rem;
  width: 400px;
  padding: 5px 0 10px 5px;
  color: ${fromTheme('tertiary')};
`

export const BackButton = styled.button`
  position: absolute;
  left: 30px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: ${fromTheme('primary')};

  span {
    line-height: 28px;
  }
`
