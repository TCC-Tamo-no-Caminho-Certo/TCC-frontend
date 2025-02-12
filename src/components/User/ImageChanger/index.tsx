import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { RightMenu } from './styles'

import api from 'services/api'

import { getUser, UserActions, UserState } from 'store/Async/user'
import { RootState } from 'store'

import CameraIcon from 'assets/Inputs/CameraIcon'
import CloseIcon from 'assets/global/CloseIcon'

import { Submit } from 'components/Form'
import DotsLoader from 'components/DotsLoader'
import Modal, { ModalForwardeds } from 'components/Modal'
import { PopupForwardeds } from 'components/Popup'

import 'cropperjs/dist/cropper.css'
import { motion } from 'framer-motion'
import { Cropper } from 'react-cropper'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

export interface ImageChangerForwardeds {
  toggle: () => void
}

const ImageChanger = forwardRef((_props, ref) => {
  const theme = useContext(ThemeContext)
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const modalRef = useRef<ModalForwardeds>(null)
  const popupRef = useRef<PopupForwardeds>(null)

  const [image, setImage] = useState()
  const [loader, setLoading] = useState(false)
  const [noImage, setNoImage] = useState(false)
  const [type, setType] = useState('image/png')
  const [cropper, setCropper] = useState<any>()
  const [showUploadAnother, setShowUploadAnother] = useState(false)

  const dispatch = useDispatch()

  const { white, red } = theme.colors

  const read = (
    callback: (_readerUrl: string | null | ArrayBuffer) => void,
    file: any
  ) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      callback(reader.result)
    }
  }

  const onChange = (e: any) => {
    e.preventDefault()

    const file = e.target.files[0]

    if (file)
      if (file.size < 5242880) {
        setType(file.type)
        setShowUploadAnother(true)

        read((urlFile: any) => {
          setImage(urlFile)
        }, file)
      } else {
        setShowUploadAnother(false)
        onCloseClick()

        popupRef?.current?.configPopup({
          type: 'error',
          message: 'Esta imagem é muito grande! tente novamente com uma menor.'
        })
      }
  }

  const onConfirmClick = async () => {
    if (cropper.cropped) {
      setLoading(true)

      const { avatar_uuid } = await api.put('api/user/avatar', {
        picture: cropper.getCroppedCanvas().toDataURL(type)
      })

      dispatch(UserActions.update({ avatar_uuid }))
      setLoading(false)
      onCloseClick()
      user?.id && getUser({ id: user?.id })
    } else {
      setNoImage(true)
      setTimeout(() => setNoImage(false), 300)
    }
  }

  const onCloseClick = () => {
    modalRef.current?.toggle(false)
    setImage(undefined)
  }

  const forwardToggle = () => modalRef.current?.toggle()

  useImperativeHandle(ref, () => ({ toggle: forwardToggle }))

  return (
    <Modal ref={modalRef}>
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

          {showUploadAnother && (
            <label htmlFor='first' id='otherFileSelect'>
              Enviar outra foto
              <CameraIcon />
            </label>
          )}

          <Submit
            type='button'
            id='confirmButton'
            disabled={loader}
            onClick={onConfirmClick}
          >
            <span id='save'>Salvar</span>

            {loader && <DotsLoader color={theme.colors.secondary} />}
          </Submit>
        </RightMenu>
      </Style>
    </Modal>
  )
})

export default ImageChanger
