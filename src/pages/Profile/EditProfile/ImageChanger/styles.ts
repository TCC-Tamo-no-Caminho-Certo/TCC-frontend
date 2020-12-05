import styled from 'styled-components'

export const RightMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 48px;

  #CloseIcon {
    position: absolute;
    top: 24px;
    right: 24px;

    width: 18px;
    height: 18px;
    transition: fill 300ms ease-out;

    stroke: #fcfcfc;

    &:hover {
      stroke: #d65881;
    }
  }

  #preview,
  #otherFileSelect {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #preview {
    position: relative;

    > div {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    span {
      margin-bottom: 12px;
      color: #fcfcfc;
    }

    #before-img-preview {
      width: 80px;
      height: 80px;
      transform: translateY(-100%);

      border: solid 1px #d65881;
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

    border-radius: 4px;
    padding: 4px 8px;
    margin-top: 48px;

    font-size: 1.3rem;
    width: 120px;
    text-align: center;

    color: #fcfcfc;

    cursor: pointer;

    &:hover {
      color: #d65881;

      .Icon {
        fill: #d65881;
      }
    }

    .Icon {
      width: 24px;
      height: 24px;
      margin-right: 0px;
      fill: #fcfcfc;
    }
  }

  #discardButton {
    width: 120px;

    transition: color 200ms ease-in-out;
    color: #fcfcfc;

    &:hover {
      color: #d65881;
    }
  }

  #confirmButton {
    width: 120px;
    height: 36px;

    color: #fcfcfc;
    background-color: transparent;
    border: solid 1px #d65881;
    margin-top: 8px;

    transition: box-shadow 300ms ease-in-out;

    &:hover {
      box-shadow: inset -60px 0 0 0 #d65881, inset 60px 0 0 0 #d65881;
    }
  }
`

const Style = styled.div`
  display: flex;

  padding: 48px;
  border-radius: 24px;

  background-color: #6e4850;
  transform: scale(1.3);

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

    color: #fcfcfc;
    border: #fcfcfc dashed 1px;
    cursor: pointer;
  }

  .Cropper {
    width: 300px;
    height: 300px;

    .cropper-modal {
      border-radius: 5px;

      border: #fcfcfc dashed 1px;
    }

    .cropper-face {
      background-color: transparent;

      .cropper-move {
        border: none;
      }
    }

    .cropper-view-box {
      border-radius: 50%;

      outline: 1px solid #fcfcfc;
    }

    .cropper-point {
      width: 5px;
      height: 5px;
      opacity: 1;

      background-color: #fcfcfc;
    }

    .cropper-center {
      opacity: 1;
    }

    .cropper-center::before {
      left: 0;
      transform: translateX(-50%);

      width: 8px;
      height: 1px;

      background-color: #fcfcfc;
    }

    .cropper-center::after {
      top: 0;
      transform: translateY(-50%);

      width: 1px;
      height: 8px;

      background-color: #fcfcfc;
    }

    .cropper-line,
    .cropper-point.point-n,
    .cropper-point.point-s,
    .cropper-point.point-e,
    .cropper-point.point-w {
      background-color: transparent;
    }
  }
`

export default Style

Style.displayName = 'ImageChanger-Style'
RightMenu.displayName = 'RightMenu-Style'
