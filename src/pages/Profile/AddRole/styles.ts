import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding-top: 24px;
  width: 100%;

  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.white};

  h2 {
    width: 90%;
    margin-bottom: 16px;
    font-size: clamp(2rem, 0.6rem + 2.6vw, 3rem);
  }

  p {
    width: 90%;
  }

  #roles {
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: space-around;

    width: 80%;
    padding: 0 24px 24px 24px;

    margin-bottom: 64px;

    .RoleInfo {
      padding: 24px;
    }
  }
`
export default Style

Style.displayName = 'AddRole-Style'
