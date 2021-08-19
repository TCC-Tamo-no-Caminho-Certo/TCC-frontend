import { RoleType } from 'types/Responses/user/roles'

import styled from 'styled-components'

interface HeaderProps {
  role?: RoleType
}

export const Header = styled.div<HeaderProps>`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 48px;
  border-radius: 16px 16px 0 0;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme, role }: any) =>
    role ? theme.roles[role] : theme.colors.primary}; ;
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  border-radius: 16px;
  padding: 64px 16px 16px 16px;

  box-shadow: 8px 8px 4px 0px rgba(0, 0, 0, 0.49);
  background-color: ${({ theme }) => theme.colors.secondary};

  .Avatar {
    margin-bottom: 24px;
  }
`

export default Style

Header.displayName = 'Header-Style'
Style.displayName = 'Card-Style'
