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
  const [error, setError] = useState('')
  const [loader, setLoading] = useState(false)

  const dispatch = useDispatch()

  const { white, red } = theme.colors

  const onChange = (e: any) => {
    e.preventDefault()
    let files
    const reader = new FileReader()

    if (e.dataTransfer) files = e.dataTransfer.files
    else if (e.target) files = e.target.files

    if (files[0])
      if (files[0].size < 5242880) {
        reader.onload = () => setImage(reader.result as any)
        files[0] && reader.readAsDataURL(files[0])
        setShowUpload(true)
      } else
        setError('Esta imagem é muito grande! tente novamente com uma menor.')
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      setLoading(true)

      const result = await api.put('/user/avatar', {
        picture: cropper.getCroppedCanvas().toDataURL()
      })

      dispatch(UserActions.update({ avatar_uuid: result.object }))
      setLoading(false)
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
