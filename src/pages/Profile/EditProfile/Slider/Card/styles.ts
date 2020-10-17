import styled from 'styled-components'

export const Header = styled.header`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: #ff6d8d;
  color: white;
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 60px 20px 20px 20px;
  border-radius: 16px;

  background-color: white;
  box-shadow: 0px 10px 25px -10px rgba(0, 0, 0, 0.2);
  user-select: none;
  
  > img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  > *, form .ChangeSetter {
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  form > button {
    width: 65%;
    height: 40px;
    color: #eee;
    background-color: #ff6d8d;
    border-radius: 15px;
  }
`

export default Style

Style.displayName = 'Style'
Header.displayName = 'Header'
