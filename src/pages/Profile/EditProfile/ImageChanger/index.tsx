import React, { useState } from 'react'
import Style from './styles'

import { RootState, ThemeState, useDispatch, useSelector } from 'store'
import { ModalsActions } from 'store/modals'

import Camera from 'assets/Camera'

import 'cropperjs/dist/cropper.css'
import { motion } from 'framer-motion'
import { Cropper } from 'react-cropper'

const ImageChanger: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [image, setImage] = useState()
  const [cropper, setCropper] = useState<any>()
  const [cropData, setCropData] = useState<string>()
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

  function onConfirmClick() {
    if (cropper.cropped) {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      setTimeout(() => dispatch(ModalsActions.setUser(false)), 1)
    } else {
      console.log('nenhuma imagem adicionada')
      setNoImage(true)
      setTimeout(() => setNoImage(false), 300)
    }
  }

  function onDiscardClick() {
    dispatch(ModalsActions.setUser(false))
  }

  return (
    <Style theme={theme}>
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

      <div id='sidebar'>
        <div id='preview'>
          <span>Antevisão</span>

          <div id='img-preview' />
          <div id='before-img-preview' />
        </div>

        {showUpload && (
          <>
            <label htmlFor='other' id='otherFileSelect'>
              <Camera />
              Enviar outra foto
            </label>
            <input id='other' type='file' onChange={onChange} />
          </>
        )}

        <button type='button' id='discardButton' onClick={onDiscardClick}>
          Descartar
        </button>

        <button type='button' id='confirmButton' onClick={onConfirmClick}>
          Salvar
        </button>
      </div>
    </Style>
  )
}

export default ImageChanger
