import React, { useContext, useState } from 'react'
import Style, { RightMenu } from './styles'

import api from 'services/api'

import { UserActions } from 'store/user'

import CameraIcon from 'assets/Inputs/CameraIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import 'cropperjs/dist/cropper.css'
import { motion } from 'framer-motion'
import { Cropper } from 'react-cropper'
import { useDispatch } from 'react-redux'
import { ThemeContext } from 'styled-components'

interface ImageChangerProps {
  onCloseClick: () => void
}
const ImageChanger = ({ onCloseClick: onCloseClicked }: ImageChangerProps) => {
  const theme = useContext(ThemeContext)

  const [showUpload, setShowUpload] = useState(false)
  const [cropper, setCropper] = useState<any>()
  const [noImage, setNoImage] = useState(false)
  const [image, setImage] = useState()
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const { white, red } = theme.colors

  const onChange = (e: any) => {
    e.preventDefault()
    let files
    const reader = new FileReader()

    if (e.dataTransfer) files = e.dataTransfer.files
    else if (e.target) files = e.target.files

    if (files[0].size < 5242880) {
      reader.onload = () => setImage(reader.result as any)
      files[0] && reader.readAsDataURL(files[0])
      setShowUpload(true)
    } else setError('Esta imagem é muito grande!')
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      const result = await api.put('/user/avatar', {
        picture: cropper.getCroppedCanvas().toDataURL()
      })

      console.log(result)

      dispatch(UserActions.update({ avatar_uuid: result.object }))
      onCloseClicked()
    } else {
      setNoImage(true)
      setTimeout(() => setNoImage(false), 300)
    }
  }

  const onCloseClick = () => onCloseClicked()

  return (
    <Style>
      <div>
        <motion.label
          htmlFor='first'
          id='firstFileSelect'
          transition={{ duration: 0.3 }}
          animate={{
            color: noImage ? [white, red, white] : white,
            borderColor: noImage ? [white, red, white] : white
          }}
        >
          Selecionar um arquivo
        </motion.label>

        <input id='first' type='file' accept='image/*' onChange={onChange} />

        <Cropper
          center
          dragMode='move'
          className='Cropper'
          preview='#img-preview'
          src={image}
          viewMode={3}
          guides={false}
          aspectRatio={1}
          background={false}
          minCropBoxWidth={80}
          minCropBoxHeight={80}
          checkOrientation={false}
          onInitialized={instance => setCropper(instance)}
        />
      </div>

      <ErrorTooltip error={!!error} content={error} />

      <RightMenu>
        <CloseIcon onClick={onCloseClick} />

        <div id='preview'>
          <span>Antevisão</span>

          <div id='img-preview' />
          <div id='before-img-preview' />
        </div>

        {showUpload && (
          <div>
            <label htmlFor='first' id='otherFileSelect'>
              <div>Enviar outra foto</div>

              <CameraIcon />
            </label>
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
