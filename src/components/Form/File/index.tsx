import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import FormContext, { FormState } from '../Form/FormContext'

import CloseIcon from 'assets/Inputs/CloseIcon'

import Modal, { ModalMethods } from 'components/Modal'
import { ErrorTooltip } from 'components/Tooltips'

import 'cropperjs/dist/cropper.css'
import { Cropper } from 'react-cropper'

const File: React.FC = () => {
  const modalRef = useRef<ModalMethods>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState('')

  const [fileData, setFileData] = useState<any>()
  const [cropper, setCropper] = useState<any>()
  const form = useContext<FormState | null>(FormContext)
  const [error, setError] = useState<string>()

  const getCropData = () => {
    if (cropper) setFileData(cropper.getCroppedCanvas().toDataURL())
  }

  const onChange = (e: any) => {
    e.preventDefault()
    let files

    if (e.dataTransfer) files = e.dataTransfer.files
    else if (e.target) files = e.target.files

    const reader = new FileReader()
    reader.onload = () => setFile(reader.result as any)

    reader.readAsDataURL(files[0])
  }

  useEffect(() => {
    const fileForInput = {
      inputRef: fileRef,
      setError,
      value: fileData,
    }

    form?.setRef(fileForInput)

    return () => form?.removeRef(fileForInput)
  }, [fileRef, form, fileData])

  return (
    <Style>
      <ErrorTooltip error={!!error} content={error} />

      <label>
        Upload de comprovante
        <input
          name='receipt'
          ref={fileRef}
          type='file'
          style={{ display: 'none' }}
          onChange={onChange}
          onClick={() => modalRef.current?.toggleModal(true)}
        />
      </label>

      <Modal ref={modalRef}>
        <div id='container'>
          <CloseIcon onClick={() => modalRef.current?.toggleModal(false)} />

          <Cropper
            center
            guides
            src={file}
            className='Cropper'
            dragMode='move'
            background={false}
            viewMode={3}
            aspectRatio={1}
            minCropBoxHeight={80}
            minCropBoxWidth={80}
            checkOrientation={false}
            onInitialized={instance => setCropper(instance)}
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
    </Style>
  )
}

export default File

/* 
  <button type='button' onClick={getCropData}>
    Crop File
  </button>
  
  <img style={{ width: '100%' }} src={fileData} alt='cropped' />
*/
