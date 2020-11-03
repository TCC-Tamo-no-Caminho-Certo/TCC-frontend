import React, { useContext, useState } from 'react'
import Style from './styles'

import { ModalContext } from '../'

import api from 'services/api'

import { UserActions } from 'store/user'
import { RootState, ThemeState, useDispatch, useSelector } from 'store'

import 'cropperjs/dist/cropper.css'
import { Cropper } from 'react-cropper'

const ImageChanger: React.FC = () => {
  const dispatch = useDispatch()
  const modal = useContext(ModalContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [image, setImage] = useState()
  const [cropper, setCropper] = useState<any>()

  const onChange = (e: any) => {
    e.preventDefault()

    let files

    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImage(reader.result as any)
    }

    reader.readAsDataURL(files[0])
  }

  const onConfirmButtonClick = async () => {
    if (cropper.cropped) {
      const token = localStorage.getItem('@SLab_ac_token')

      const result = await api.post(
        '/user/avatar/upload',
        { picture: cropper.getCroppedCanvas().toDataURL() },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )

      dispatch(UserActions.updateUserInfo({ avatar: result.object }))
      modal?.setShow(false)
    }
  }

  return (
    <Style theme={theme}>
      <div>
        <label htmlFor='fileSelect'>Selecionar um arquivo </label>
        <input id='fileSelect' type='file' onChange={onChange} className='beforeBox' />

        <Cropper
          className='Cropper'
          dragMode='crop'
          preview='.img-preview'
          src={image}
          initialAspectRatio={1}
          viewMode={3}
          guides={false}
          center
          minCropBoxHeight={80}
          minCropBoxWidth={80}
          background={false}
          aspectRatio={1 / 1}
          responsive
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance)
          }}
        />
      </div>

      <div className='sidebar'>
        <div className='preview'>
          <span>Antevisão</span>

          <div className='img-preview' />
          <div className='before-img-preview' />
        </div>

        <button type='button' onClick={() => modal?.setShow(false)}>
          Descartar alterações
        </button>

        <button type='button' className='confirmButton' onClick={onConfirmButtonClick}>
          Confirmar
        </button>
      </div>
    </Style>
  )
}

export default ImageChanger
