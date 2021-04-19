/* eslint-disable space-before-function-paren */
// cropper.crossOriginUrl
// cropper.getCanvasData().toDataUrl('image/jpeg' ,)

import React, { useContext, useState } from 'react'
import Style, { RightMenu } from './styles'

import api from 'services/api'

import { UserActions } from 'store/user'

import CameraIcon from 'assets/Inputs/CameraIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'
import AlertIcon from 'assets/Inputs/AlertIcon'

import { Submit } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

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
  const [type, setType] = useState('image/png')
  const [error, setError] = useState('')
  const [loader, setLoading] = useState(false)

  const dispatch = useDispatch()

  const { white, red } = theme.colors

  const read = (callback: any, file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      callback(reader.result)
    }
  }

  const onChange = (e: any) => {
    e.preventDefault()
    const file = e.target.files[0]
    setType(file.type)

    read((file: any) => {
      setImage(file)
    }, file)

    file.size < 5242880
      ? setShowUpload(true)
      : setError('Esta imagem é muito grande! tente novamente com uma menor.')
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      setLoading(true)

      console.log(type)
      console.log(cropper.getCroppedCanvas().toDataURL(type))

      const response = await api.put('/user/avatar', {
        picture: cropper.getCroppedCanvas().toDataURL(type)
      })

      dispatch(UserActions.update({ avatar_uuid: response.avatar_uuid }))
      onCloseClicked()
      setLoading(false)
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
          {!!error && (
            <div id='error'>
              <AlertIcon />
              {error}
            </div>
          )}
        </motion.label>

        <input
          id='first'
          type='file'
          accept='image/png,image/jpeg'
          onChange={onChange}
        />

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

      <RightMenu loader={loader}>
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

        <Submit
          type='button'
          id='confirmButton'
          onClick={onConfirmClick}
          disabled={loader}
        >
          <span id='save'>Salvar</span>

          {loader && <DotsLoader color={theme.colors.secondary} />}
        </Submit>
      </RightMenu>
    </Style>
  )
}

export default ImageChanger
