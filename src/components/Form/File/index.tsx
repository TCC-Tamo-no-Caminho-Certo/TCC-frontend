import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CameraIcon from 'assets/Inputs/CameraIcon'
import DownloadIcon from 'assets/global/Download'

import Modal, { ModalMethods } from 'components/Modal'
import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import 'cropperjs/dist/cropper.css'
import { Cropper, ReactCropperProps } from 'react-cropper'

interface FileProps extends ReactCropperProps {
  top?: string
  name: string
  label: string
  bottom?: string
  maxSize?: string
  bgHeight?: string
  download?: boolean
  tranlateY?: string
  noCropper?: boolean
  flexColumn?: boolean
  onClick?: () => void
  onChange?: () => void
}

const File = ({
  top,
  name,
  label,
  bottom,
  accept,
  onClick,
  bgHeight,
  tranlateY,
  download = true,
  maxSize = '2048',
  noCropper = false,
  flexColumn = false,
  onChange: receivedOnChange,

  ...props
}: FileProps) => {
  const form = useContext<FormState | null>(FormContext)

  const modalRef = useRef<ModalMethods>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const [fileData, setFileData] = useState<string>()
  const [cropper, setCropper] = useState<any>()
  const [error, setError] = useState<string>()
  const [file, setFile] = useState<any>()

  const getCropData = () => {
    const url = cropper.getCroppedCanvas().toDataURL()
    cropper && setFileData(url)
  }

  const onChange = (e: any) => {
    e.preventDefault()

    const { files } = e.target

    setError('O arquivo é muito grande!')

    if (files[0].size < 100000) {
      const reader = new FileReader()
      setError('')
      files[0] && reader.readAsDataURL(files[0])
      reader.onload = () => setFile(reader.result)
      receivedOnChange && receivedOnChange()
    }
  }

  useEffect(() => {
    const fileForInput = {
      type: 'file',
      inputRef: fileRef,
      value: noCropper ? file : fileData,
      setError
    }

    form?.registerInput(fileForInput)

    return () => form?.removeInput(fileForInput)
  }, [fileRef, form, fileData, noCropper, file])

  return (
    <Style
      className='File'
      haveValue={fileRef.current?.value}
      flexColumn={flexColumn}
    >
      <div id='fileInput'>
        <ErrorTooltip error={!!error} content={error} />

        {noCropper && (
          <div id='fileName'>
            {!error && fileRef.current?.value.split('C:\\fakepath\\')}
          </div>
        )}

        {noCropper && fileRef.current?.value && download && (
          <a
            href={file}
            download={fileRef.current?.value.split('C:\\fakepath\\')[1]}
          >
            <DownloadIcon />
          </a>
        )}

        <label onClick={() => onClick && onClick()}>
          <CameraIcon />

          {label}

          <input
            type='file'
            data-max-size={maxSize}
            name={name}
            ref={fileRef}
            accept={accept}
            onChange={onChange}
            style={{ display: 'none' }}
            onClick={() => modalRef.current?.toggleModal(true)}
          />
        </label>
      </div>

      {!noCropper && (
        <Modal
          bgHeight={bgHeight}
          translateY={tranlateY}
          top={top}
          bottom={bottom}
          ref={modalRef}
        >
          <div id='container'>
            <CloseIcon onClick={() => modalRef.current?.toggleModal(false)} />

            <Cropper
              center
              className='Cropper'
              dragMode='move'
              src={file}
              guides={false}
              background={false}
              viewMode={3}
              aspectRatio={1}
              minCropBoxHeight={80}
              minCropBoxWidth={80}
              checkOrientation={false}
              onInitialized={instance => setCropper(instance)}
              {...props}
            />

            <button
              type='button'
              onClick={() => {
                getCropData()
                modalRef.current?.toggleModal(false)
              }}
            >
              Selecionar
            </button>
          </div>
        </Modal>
      )}
    </Style>
  )
}

export default File
