import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

export const MonthStyle = styled(motion.li)`
  position: relative;
  z-index: 2;

  padding: 16px;
  border-radius: 4px;

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => theme.colors.tertiary};

  p {
    margin-top: 24px;
  }
`

export const MemberStyle = styled(motion.li)`
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 24px;

    .info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      margin-right: 16px;
    }

    #DefaultAvatar {
      height: 72px;
      margin-right: 16px;
    }

    #ArrowIcon {
      height: 18px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  .content {
    padding: 24px 24px 24px 24px;

    ul {
      height: 800px;
    }
  }
`

const Style = styled.section`
  padding: 24px;

  #newMember {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;
    margin-top: 24px;
    border-radius: 8px;

    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
    background-color: ${({ theme }) => theme.colors.primary};

    span {
      text-align: center;
    }

    .Icon {
      overflow: visible;
      margin-right: 8px;
    }
  }

  #lists {
    margin-top: 24px;

    li + li {
      margin-top: 24px;
    }

    li button {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 24px;

      color: ${({ theme }) => theme.colors.secondary};

      & + button {
        margin-top: 24px;
      }

      span {
        cursor: pointer;
      }

      #ArrowIcon {
        height: 12px;
        margin-right: 8px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`

export default Style

Style.displayName = 'Members-Style'
MonthStyle.displayName = 'Month-Style'
MemberStyle.displayName = 'Member-Style'
