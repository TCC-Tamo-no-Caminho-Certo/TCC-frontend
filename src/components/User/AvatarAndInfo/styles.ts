import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    margin-right: 16px;

    span + span {
      font-size: clamp(1.3rem, 0.6rem + 2.6vw, 1.6rem);

      color: ${({ theme }) => theme.colors.roles.student};
    }
  }

  #DefaultAvatar {
    width: 72px;
    height: 72px;
    min-width: 72px;
    min-height: 72px;

    margin-right: 16px;
  }
`

export default Style

Style.displayName = 'AvatarAndInfo-Style'
