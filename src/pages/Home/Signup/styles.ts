import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.section`
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

  form {
    max-width: 440px;
  }

  .InputText + .InputText,
  #birthday + .InputText {
    margin-top: 20px;
  }
`

export const DualInput = styled.div`
  div:first-child {
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }

  hr {
    border: none;
    border-top: solid 1px ${fromTheme('tertiary')};
  }

  hr + div {
    border-top: none;
    margin-top: 0px;
    border-radius: 0 0 10px 10px;
  }
`

export const InfoText = styled.div`
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

export default Style