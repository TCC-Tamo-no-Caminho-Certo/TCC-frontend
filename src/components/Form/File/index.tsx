import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CameraIcon from 'assets/Inputs/CameraIcon'

import Modal, { ModalMethods } from 'components/Modal'
import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import 'cropperjs/dist/cropper.css'
import { Cropper, ReactCropperProps } from 'react-cropper'

interface FileProps extends ReactCropperProps {
  label: string
  name: string
  flexColumn?: boolean
  bgHeight?: string
  tranlateY?: string
  top?: string
  bottom?: string
  noCropper?: boolean
  onClick?: () => void
  onChange?: () => void
}

const File = ({
  label,
  name,
  onClick,
  bgHeight,
  tranlateY,
  top,
  bottom,
  noCropper = false,
  flexColumn = false,
  onChange: receivedOnChange,
  accept,
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
    const reader = new FileReader()

    console.log(files)
    setError('')
    files[0] && reader.readAsDataURL(files[0])
    reader.onload = () => setFile(reader.result)
    receivedOnChange && receivedOnChange()
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
            {fileRef.current?.value.split('C:\\fakepath\\')}
          </div>
        )}

        <label onClick={() => onClick && onClick()}>
          <CameraIcon />

          {label}

          <input
            type='file'
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
