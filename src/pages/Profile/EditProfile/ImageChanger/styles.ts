import styled from 'styled-components'

export const RightMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 148px;
  height: 300px;
  margin-left: 48px;

  > * {
    width: 100%;
  }

  #CloseIcon {
    position: absolute;
    top: 24px;
    right: 24px;

    width: 16px;
    height: 16px;
    margin-right: 0px;
    stroke: ${({ theme }) => theme.colors.secondary};

    &:hover {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  #preview,
  #otherFileSelect {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #preview {
    position: relative;

    flex-direction: column;

    > div {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    span {
      margin-bottom: 12px;
      color: ${({ theme }) => theme.colors.secondary};
    }

    #before-img-preview {
      width: 80px;
      height: 80px;
      transform: translateY(-100%);

      border: solid 1px ${({ theme }) => theme.colors.primary};
    }

    #img-preview {
      width: 80px;
      height: 80px;
      overflow: hidden;
    }
  }

  #otherFileSelect {
    border-radius: 4px;

    padding: 0 8px;
    height: 32px;
    margin-bottom: 16px;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.3rem);
    text-align: center;

    color: ${({ theme }) => theme.colors.secondary};

    cursor: pointer;

    border: solid ${({ theme }) => theme.colors.secondary} 1px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      border: solid ${({ theme }) => theme.colors.primary} 1px;
      .Icon {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }

    .Icon {
      width: 20px;
      height: 20px;
      margin-left: 8px;
      fill: ${({ theme }) => theme.colors.secondary};

      transform: translateY(-10%);
    }
  }

  #discardButton {
    transition: color 200ms ease-in-out;
    color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  #confirmButton {
    height: 36px;

    color: ${({ theme }) => theme.colors.secondary};
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.colors.primary};
    margin-top: 8px;

    transition: box-shadow 300ms ease-in-out;

    &:hover {
      box-shadow: inset -74px 0 0 0 ${({ theme }) => theme.colors.primary},
        inset 74px 0 0 0 ${({ theme }) => theme.colors.primary};
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;

  padding: 48px;
  border-radius: 24px;

  background-color: ${({ theme }) => theme.colors.tertiary};

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

    color: ${({ theme }) => theme.colors.secondary};
    border: ${({ theme }) => theme.colors.secondary} dashed 1px;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      border: solid 1px;
    }
  }

  .Cropper {
    width: 300px;
    height: 300px;

    .cropper-modal {
      border-radius: 5px;

      border: ${({ theme }) => theme.colors.secondary} dashed 1px;
    }

    .cropper-face {
      background-color: transparent;

      .cropper-move {
        border: none;
      }
    }

    .cropper-view-box {
      border-radius: 50%;

      outline: 1px solid ${({ theme }) => theme.colors.secondary};
    }

    .cropper-point {
      width: 5px;
      height: 5px;
      opacity: 1;

      background-color: ${({ theme }) => theme.colors.secondary};
    }

    .cropper-center {
      opacity: 1;
    }

    .cropper-center::before {
      left: 0;
      transform: translateX(-50%);

      width: 8px;
      height: 1px;

      background-color: ${({ theme }) => theme.colors.secondary};
    }

    .cropper-center::after {
      top: 0;
      transform: translateY(-50%);

      width: 1px;
      height: 8px;

      background-color: ${({ theme }) => theme.colors.secondary};
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

RightMenu.displayName = 'RightMenu-Style'
Style.displayName = 'ImageChanger-Style'
