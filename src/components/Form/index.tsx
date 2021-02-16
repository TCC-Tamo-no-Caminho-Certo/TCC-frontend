import React, { useMemo, useRef, useState } from 'react'

import { ReCaptcha } from './recaptcha'
import Text from './Text'
import Datepicker from './Datepicker'
import Submit from './Submit'
import Select from './Select'
import File from './File'
import Checkbox from './Checkbox'
import Textarea from './Textarea'

import api from 'services/api'

import Captcha from 'react-google-recaptcha'
import { useHistory } from 'react-router-dom'
import { ObjectSchema, ValidationError } from 'yup'

export interface Ref {
  inputRef: React.RefObject<any>
  type: string
  value?: any
  setError: (message: string) => void
}

export interface FormState {
  loader: boolean
  removeInput: (input: Ref) => void
  registerInput: (input: Ref) => void
}

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
  path: string
  push?: string
  captcha?: boolean
  loading?: boolean
  schema?: ObjectSchema
  addData?: { [key: string]: string }
  getData?: (data: any) => void
  afterResData?: (resData: any) => void
}

export const FormContext = React.createContext<FormState | null>(null)

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
  const data: { [name: string]: any } = useMemo(() => ({ ...addData }), [addData])

  let refs: Ref[] = []
  let haveErrors = false

  const registerInput = (input: Ref) => refs.push(input)

  const removeInput = (input: Ref) => {
    const index = refs.findIndex(ref => ref === input)
    const newArray = refs.filter((_, i) => i !== index)
    refs = newArray
  }

  const setData = () => {
    refs.forEach(({ inputRef: { current }, value, type }) => {
      if (!current) throw new Error('Form setData error! inputRef.current not found!')
      else
        switch (type) {
          case 'text':
            data[current.name] = current.value
            break

          case 'password':
            data[current.name] = current.value
            break

          case 'checkbox':
            data[current.name] = current.checked
            break

          case 'textarea':
            data[current.name] = current.value
            break

          case 'select':
            current.select.props.value === null
              ? (data[current.props.name] = '')
              : (data[current.props.name] = current.select.props.value.value)
            break

          case 'multiSelect':
            if (current.select.props.value === null) data[current.props.name] = ''
            else {
              data[current.props.name] = current.select.props.value.map(
                (oneValue: { value: string; label: string }) => oneValue.value
              )
            }
            break

          case 'file':
            value ? (data[current.name] = value) : (data[current.name] = '')
            break

          default:
            throw new Error('Type of input wasnt specified')
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
          const index = refs.findIndex(({ inputRef: { current } }) =>
            current.name
              ? current.name === errorElement.path
              : current.select.props.name === errorElement.path
          )

          refs[index] && refs[index].setError(errorElement.message)
        })
      else
        throw new Error('Unexpected error on validation! error isnt instanceof Yup.ValidationError')
    }
  }

  const makeRequest = async (cbAfterResData?: (data: any) => void) => {
    const resData = await api.post(path, data)
    cbAfterResData && cbAfterResData(resData)

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

      <FormContext.Provider value={{ removeInput, registerInput, loader: showLoader }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

export { Form, Text, Datepicker, Submit, Select, File, Checkbox, Textarea }
export default Form
