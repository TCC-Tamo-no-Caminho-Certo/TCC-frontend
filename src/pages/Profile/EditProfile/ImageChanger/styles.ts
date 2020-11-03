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

  label {
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

    .cropper-face {
      background-color: transparent;
      border: solid 1px ${fromTheme('primary')};

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

  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-left: 48px;

    .preview {
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      height: 204px;

      > div {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }

      span {
        margin-bottom: 12px;
        color: ${fromTheme('white')};
      }

      .before-img-preview {
        width: 80px;
        height: 80px;
        transform: translateY(-100%);

        border: solid 1px ${fromTheme('primary')};
      }

      .img-preview {
        overflow: hidden;
      }
    }

    .confirmButton {
      border-radius: 8px;

      background-color: ${fromTheme('primary')};
    }

    button {
      width: 120px;
      height: 36px;

      color: ${fromTheme('white')};

      & + button {
        margin-top: 24px;
      }
    }
  }
`

export default Style

Style.displayName = 'ImageChanger-Style'
