import styled from 'styled-components'

interface RightMenuProps {
  loader: boolean
}

export const RightMenu = styled.div<RightMenuProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
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
    z-index: 2000;

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
    padding: 8px;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 16px;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.3rem);

    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
    border: solid ${({ theme }) => theme.colors.secondary} 1px;

    &:hover,
    &:focus {
      filter: brightness(1.1);
    }

    .Icon {
      width: 20px;
      height: 20px;
      margin-left: 8px;
      transform: translateY(-10%);

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  #confirmButton {
    height: max(36px, 32px);

    #save {
      margin-right: ${({ loader }) => (loader ? '24px' : '0')};
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;

  width: auto;
  border-radius: 24px;
  padding: clamp(8px, 3vw, 48px);

  background-color: ${({ theme }) => theme.colors.tertiary};

  input[type='file'] {
    display: none;
  }

  #firstFileSelect {
    position: absolute;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 300px;
    height: 300px;
    border-radius: 8px;

    .Icon {
      width: 24px;
      padding: 16px 0;

      fill: ${({ theme }) => theme.colors.white};
    }

    #error {
      position: absolute;
      bottom: 0;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      text-align: center;
      border-radius: 8px;
      padding-bottom: 16px;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);

      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary};
    }

    cursor: pointer;

    color: ${({ theme }) => theme.colors.secondary};
    border: ${({ theme }) => theme.colors.secondary} dashed 1px;

    &:hover {
      border: solid 1px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .Cropper {
    width: 300px;
    height: 300px;
    border-radius: 8px;

    overflow: hidden;

    .cropper-modal {
      border-radius: 8px;

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

      width: 8px;
      height: 1px;
      transform: translateX(-50%);

      background-color: ${({ theme }) => theme.colors.secondary};
    }

    .cropper-center::after {
      top: 0;

      width: 1px;
      height: 8px;
      transform: translateY(-50%);

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
