import styled from 'styled-components'

const Style = styled.div`
  #fileInput {
    display: flex;
    justify-content: center;
    align-items: center;

    label {
      padding: 8px 16px;
      border-radius: 8px;

      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};

      .Icon {
        height: 16px;
        margin-right: 8px;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  #container {
    display: flex;
    align-items: flex-end;
    flex-direction: column;

    border-radius: 8px;
    padding: 16px 24px;

    background-color: ${({ theme }) => theme.colors.tertiary};

    button {
      margin-top: 16px;
      padding: 8px 16px;
      border-radius: 8px;

      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
    }

    .Icon {
      margin-bottom: 16px;
      height: 16px;

      stroke: ${({ theme }) => theme.colors.secondary};
    }
  }

  .Cropper {
    width: 300px;
    height: 300px;

    .cropper-modal {
      border-radius: 5px;
    }

    .cropper-face {
      background-color: transparent;

      .cropper-move {
        border: none;
      }
    }

    .cropper-view-box {
      outline: 1px solid ${({ theme }) => theme.colors.white};
    }

    .cropper-point {
      width: 5px;
      height: 5px;
      opacity: 1;

      background-color: ${({ theme }) => theme.colors.white};
    }

    .cropper-center {
      opacity: 1;
    }

    .cropper-center::before {
      left: 0;
      transform: translateX(-50%);

      width: 8px;
      height: 1px;

      background-color: ${({ theme }) => theme.colors.white};
    }

    .cropper-center::after {
      top: 0;
      transform: translateY(-50%);

      width: 1px;
      height: 8px;

      background-color: ${({ theme }) => theme.colors.white};
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
