import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding-top: 64px;
  min-height: 100vh;
  width: 100%;

  background-color: ${fromTheme('tertiary')};
  color: white;

  h2 {
    width: 80%;
    font-size: 3.2rem;
  }

  p {
    width: 80%;
    font-size: 1.6rem;
  }

  #Roles {
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: space-around;

    width: 80%;
    padding: 0 24px 24px 24px;

    margin-bottom: 64px;

    .Role {
      padding: 24px;
    }
  }
`
export default Style

Style.displayName = 'ChangeRole-Style'
