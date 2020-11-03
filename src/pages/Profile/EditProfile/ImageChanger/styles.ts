import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;

  padding: 48px;
  border-radius: 24px;

  background-color: ${fromTheme('tertiary')};

  input[type='file'] {
    display: none;
  }

  #firstFileSelect {
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 300px;
    height: 300px;
    border-radius: 5px;

    color: ${fromTheme('white')};
    border: ${fromTheme('white')} dashed 1px;
    cursor: pointer;
  }

  .Cropper {
    width: 300px;
    height: 300px;

    .cropper-modal {
      border-radius: 5px;

      border: ${fromTheme('white')} dashed 1px;
    }

    .cropper-face {
      background-color: transparent;

      .cropper-move {
        border: none;
      }
    }

    .cropper-view-box {
      border-radius: 50%;

      outline: 1px solid ${fromTheme('white')};
    }

    .cropper-point {
      opacity: 1;

      background-color: ${fromTheme('white')};
    }

    .cropper-center {
      opacity: 1;
    }

    .cropper-center::before {
      left: 0;
      transform: translateX(-50%);

      width: 8px;
      height: 1px;

      background-color: ${fromTheme('white')};
    }

    .cropper-center::after {
      top: 0;
      transform: translateY(-50%);

      width: 1px;
      height: 8px;

      background-color: ${fromTheme('white')};
    }

    .cropper-line,
    .cropper-point.point-n,
    .cropper-point.point-s,
    .cropper-point.point-e,
    .cropper-point.point-w {
      background-color: transparent;
    }
  }

  #sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 48px;

    .Close {
      position: absolute;
      top: 24px;
      right: 24px;
      transform: scale(1.2);

      path {
        fill: ${fromTheme('white')};
      }
    }

    #preview {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      > div {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      span {
        margin-bottom: 12px;
        color: ${fromTheme('white')};
      }

      #before-img-preview {
        width: 80px;
        height: 80px;
        transform: translateY(-100%);

        border: solid 1px ${fromTheme('primary')};
      }

      #img-preview {
        width: 80px;
        height: 80px;
        overflow: hidden;
      }
    }

    #otherFileSelect {
      position: absolute;
      right: 48px;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 4px;
      padding: 4px 8px;
      margin-top: 48px;

      font-size: 1.3rem;
      width: 120px;
      text-align: center;

      color: ${fromTheme('white')};

      cursor: pointer;

      .Camera {
        width: 24px;
        margin-right: 8px;
      }

      &:hover {
        color: ${fromTheme('primary')};

        .Camera path {
          stroke: ${fromTheme('primary')};
        }
      }
    }

    #discardButton {
      width: 120px;

      transition: color 200ms ease-in-out;
      color: ${fromTheme('white')};

      &:hover {
        color: ${fromTheme('primary')};
      }
    }

    #confirmButton {
      width: 120px;
      height: 36px;

      color: ${fromTheme('white')};
      background-color: ${fromTheme('tertiary')};
      border: solid 1px ${fromTheme('primary')};
      margin-top: 8px;

      transition: box-shadow 300ms ease-in-out;

      &:hover {
        box-shadow: inset -60px 0 0 0 ${fromTheme('primary')},
          inset 60px 0 0 0 ${fromTheme('primary')};
      }
    }
  }
`

export default Style

Style.displayName = 'ImageChanger-Style'
