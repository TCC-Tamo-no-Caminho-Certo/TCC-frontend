import { Role } from 'store/Async/roles'

import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

interface StyleProps {
  role?: Role
}

const Style = styled(motion.div)<StyleProps>`
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

  .Month + .Month {
    margin-top: 16px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 24px;

    &,
    * {
      cursor: pointer;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;

      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        margin-right: 16px;

        .role {
          font-size: clamp(1.3rem, 0.6rem + 2.6vw, 1.6rem);

          color: ${({ theme, role }) =>
            role ? theme.roles[role] : theme.colors.secondary};
        }
      }

      #DefaultAvatar {
        width: 72px;
        height: 72px;
        min-width: 72px;
        min-height: 72px;

        margin-right: 16px;
      }
    }

    #ArrowIcon {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  .content {
    padding: 0 24px 24px 24px;
  }
`

export default Style

Style.displayName = 'Member-Style'
