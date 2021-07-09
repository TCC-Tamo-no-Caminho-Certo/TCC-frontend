import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Content = styled(Presence)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 8px;
  border-radius: 0px 0px 16px 16px;

  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  .Textarea {
    min-width: 100%;

    textarea {
      border-radius: 0px;

      background-color: transparent;
    }
  }

  .File {
    margin-top: 16px;
  }

  #edict {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 44px;
    margin-top: 24px;
    border-radius: 0 0 8px 8px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      height: 18px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  #beginDate,
  #beginDatepicker {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    margin-top: 16px;
    font-size: clamp(1.4rem, 0.6rem + 2.6vw, 2.1rem);

    #label {
      margin-bottom: 8px;
    }
  }

  #beginDatepicker {
    display: flex;
    align-items: center;
    justify-content: center;

    .Datepicker {
      max-width: 200px;
      min-width: 200px;
      margin-left: 16px;

      .Text {
        min-width: 200px;
        max-width: 200px;

        border: none;

        input {
          text-align: center;
        }
      }
    }
  }

  @media screen and (min-width: 900px) {
    #beginDatepicker {
      flex-direction: row;

      #label {
        margin-bottom: 0px;
      }
    }
  }
`

const Style = styled(motion.li)`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;

  p {
    width: 100%;
    word-break: break-all;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.8rem);

    color: ${({ theme }) => theme.colors.tertiary};
  }

  .Submit {
    width: 100%;
    margin-top: 16px;
  }

  #seasonTitle {
    width: 100%;
    padding: 16px;
    cursor: pointer;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.tertiary};

    &:hover {
      filter: brightness(1.1);
    }

    .Icon {
      width: 18px;
      height: 18px;
      min-width: 18px;
      min-height: 18px;
      margin-right: 8px;
      transform: rotate(0deg);

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  #beginDatepicker {
    .Field {
      height: 42px;

      input {
        height: 42px;
      }
    }
  }

  @media screen and (min-width: 545px) {
    #beginDatepicker .Field > div {
      width: 180px;
    }
  }
`

export default Style

Style.displayName = 'AvatarAndInfo-Style'
