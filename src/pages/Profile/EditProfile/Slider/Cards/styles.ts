import styled from 'styled-components'

export const Header = styled.div`
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

export const Card = styled.div`
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
`
