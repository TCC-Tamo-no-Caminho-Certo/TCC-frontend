import React, { useRef, useState } from 'react'
import { captcha as Captcha, ReCaptcha } from './styles'

import FormContext, { Ref } from './FormContext'

import api from 'services/api'

import { useHistory } from 'react-router-dom'
import { ObjectSchema, ValidationError } from 'yup'

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  path: string
  push?: string
  captcha?: boolean
  loading?: boolean
  schema?: ObjectSchema
  addData?: { [key: string]: string }
  getData?: (data: any) => void
  afterResData?: (resData: any) => void
}

const Form: React.FC<FormProps> = ({
  children,
  path,
  push,
  loading,
  schema,
  getData,
  addData,
  captcha,
  afterResData,
  ...rest
}) => {
  const recaptchaRef = useRef<Captcha>(null)
  const [showLoader, setShowLoader] = useState(false)
  const history = useHistory()

  const data: { [name: string]: any } = { ...addData }
  let refs: Ref[] = []
  let haveErrors = false

  const setRef = (input: Ref) => {
    refs.push(input)
  }

  const removeRef = (input: Ref) => {
    const index = refs.findIndex(value => value === input)
    const newArray = refs.filter((_, i) => i !== index)
    refs = newArray
  }

  const setData = () => {
    refs.forEach(({ inputRef: { current }, value }) => {
      if (!current) throw new Error('Form setData error! inputRef.current not found!')

      if (value) data[current.name] = value
      else if (current.name) {
        current?.type === 'checkbox'
          ? (data[current.name] = current?.checked)
          : (data[current.name] = current?.value)
      } else {
        const { name } = current?.select.props

        current?.select.props.value === null
          ? (data[name] = '')
          : (data[name] = current?.select.props.value.value)
      }
    })
  }

  const validate = () => {
    try {
      schema && schema.validateSync(data, { abortEarly: false })
    } catch (error) {
      haveErrors = true

      if (error instanceof ValidationError)
        error.inner.forEach(errorElement => {
          const index = refs.findIndex(ref => {
            if (ref.inputRef.current?.name) return ref.inputRef.current?.name === errorElement.path
            return ref.inputRef.current?.select.props.name === errorElement.path
          })

          if (refs[index]) refs[index].setError(errorElement.message)
        })
      else throw new Error('unexpected error on validation!')
    }
  }

  const makeRequest = async (cb?: (data: any) => void) => {
    const resData = await api.post(path, data)
    cb && cb(resData)
    return resData.success
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    loading && setShowLoader(true)
    setData()
    getData && getData(data)
    validate()

    if (captcha) data.captcha = (await recaptchaRef.current?.executeAsync()) ?? false

    const submitRes = !haveErrors && (await makeRequest(afterResData))
    loading && setShowLoader(false)
    push && submitRes && history.push(push)
  }

  return (
    <form onSubmit={onSubmit} noValidate {...rest}>
      {captcha && (
        <ReCaptcha
          ref={recaptchaRef}
          size='invisible'
          sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
        />
      )}

      <FormContext.Provider value={{ removeRef, setRef, loader: showLoader }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form
