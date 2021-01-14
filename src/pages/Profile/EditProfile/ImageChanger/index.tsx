import React, { useContext, useState } from 'react'
import Style, { RightMenu } from './styles'

import { ModalContext } from '../'

import api from 'services/api'

import { UserActions } from 'store/user'

import CameraIcon from 'assets/Inputs/CameraIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import 'cropperjs/dist/cropper.css'
import { motion } from 'framer-motion'
import { Cropper } from 'react-cropper'
import { useDispatch } from 'react-redux'

const ImageChanger: React.FC = () => {
  const dispatch = useDispatch()
  const modal = useContext(ModalContext)

  const [image, setImage] = useState()
  const [cropper, setCropper] = useState<any>()
  const [noImage, setNoImage] = useState(false)

  const [showUpload, setShowUpload] = useState(false)

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

    setShowUpload(true)
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      const result = await api.post('/user/avatar/upload', {
        picture: cropper.getCroppedCanvas().toDataURL(),
      })

      dispatch(UserActions.updateUserInfo({ avatar: result.object }))
      modal?.setShow(false)
    } else {
      setNoImage(true)
      setTimeout(() => setNoImage(false), 300)
    }
  }

  function onCloseClick() {
    modal?.setShow(false)
  }

  return (
    <Style>
      <div>
        <motion.label
          htmlFor='first'
          id='firstFileSelect'
          animate={{
            color: noImage ? ['#fcfcfc', '#f00', '#fcfcfc'] : '#fcfcfc',
            borderColor: noImage ? ['#fcfcfc', '#f00', '#fcfcfc'] : '#fcfcfc',
          }}
          transition={{ duration: 0.3 }}
        >
          Selecionar um arquivo
        </motion.label>

        <input id='first' type='file' onChange={onChange} />

        <Cropper
          src={image}
          className='Cropper'
          preview='#img-preview'
          dragMode='move'
          background={false}
          viewMode={3}
          aspectRatio={1}
          guides={false}
          minCropBoxHeight={80}
          minCropBoxWidth={80}
          center
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance)
          }}
        />
      </div>

      <RightMenu>
        <CloseIcon onClick={onCloseClick} />

        <div id='preview'>
          <span>Antevisão</span>

          <div id='img-preview' />
          <div id='before-img-preview' />
        </div>

        {showUpload && (
          <div>
            <label htmlFor='other' id='otherFileSelect'>
              <div>Enviar outra foto</div>

              <CameraIcon />
            </label>

            <input id='other' type='file' onChange={onChange} />
          </div>
        )}

        <button type='button' id='confirmButton' onClick={onConfirmClick}>
          Salvar
        </button>
      </RightMenu>
    </Style>
  )
}

export default ImageChanger
