import React, {
  createContext,
  FormEvent,
  HTMLProps,
  RefObject,
  useMemo,
  useRef,
  useState
} from 'react'

import { ReCaptcha } from './recaptcha'
import Text from './Text'
import Datepicker from './Datepicker'
import Submit from './Submit'
import Select from './Select'
import File from './File'
import Checkbox from './Checkbox'
import Textarea from './Textarea'

import api from 'services/api'

import Popup, { PopupMethods } from 'components/Popup'

import Captcha from 'react-google-recaptcha'
import { useHistory } from 'react-router-dom'
import { ObjectSchema, ValidationError } from 'yup'

export interface Ref {
  inputRef: RefObject<any>
  type: string
  value?: any
  setError: (_message: string) => void
}

export interface FormState {
  loader: boolean
  removeInput: (_input: Ref) => void
  registerInput: (_input: Ref) => void
}

export interface FormProps extends HTMLProps<HTMLFormElement> {
  path?: string
  push?: string
  captcha?: boolean
  loading?: boolean
  addToPath?: string[]
  addDataToPath?: string[]
  schema?: ObjectSchema
  addData?: { [key: string]: any }
  method?: 'post' | 'get' | 'delete' | 'patch' | 'put'
  getData?: (_data: any) => void
  onError?: (_error: any) => void
  afterResData?: (_resData: any) => void
}

export const FormContext = createContext<FormState | null>(null)

const Form = ({
  path,
  push,
  loading,
  schema,
  getData,
  addData,
  captcha,
  onError,
  children,
  addToPath,
  afterResData,
  addDataToPath,
  method = 'post',
  ...rest
}: FormProps) => {
  const history = useHistory()
  const popupRef = useRef<PopupMethods>(null)
  const recaptchaRef = useRef<Captcha>(null)
  const [showLoader, setShowLoader] = useState(false)
  const data: {
    [name: string]: any
  } = useMemo(() => ({ ...addData }), [addData])

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
      if (!current)
        throw new Error('Form setData error! inputRef.current not found!')
      else
        switch (type) {
          case 'text':
            data[current.name] = current.value
            break

          case 'date':
            data[current.name] = value
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
            if (current.select.props.value === null)
              data[current.props.name] = ''
            else
              data[current.props.name] = current.select.props.value.map(
                (oneValue: { value: string; label: string }) => oneValue.value
              )
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
      haveErrors = false
    } catch (error) {
      haveErrors = true

      if (error instanceof ValidationError) {
        error.inner.forEach(errorElement => {
          const index = refs.findIndex(({ inputRef: { current } }) =>
            current.name
              ? current.name === errorElement.path
              : current.select.props.name === errorElement.path
          )

          refs[index] && refs[index].setError(errorElement.message)
        })

        onError && onError(error)
      } else
        throw new Error(
          'Unexpected error on validation! error isnt instanceof Yup.ValidationError'
        )
    }
  }

  const parsePath = () => {
    if (path) {
      const paths = path.split('*%')

      console.table({
        paths: paths.length,
        addToPath: addToPath?.length,
        addDataToPath: addDataToPath?.length
      })

      if (addToPath)
        path = paths.reduce((acc, curr, idx) => {
          if (paths.length === idx + 1) return acc + curr
          return acc + curr + data[addToPath[idx]]
        }, '')

      if (addDataToPath)
        path = paths.reduce((acc, curr, idx) => {
          if (paths.length === idx + 1) return acc + curr
          return acc + curr + addDataToPath[idx]
        }, '')
    }
  }

  const makeRequest = async (cbAfterResData?: (_data: any) => void) => {
    if (path) {
      const params: { [key: string]: { path: string; data?: any } } = {
        get: { path },
        delete: { path },
        put: { path, data },
        post: { path, data },
        patch: { path, data }
      }

      const firstParam = params[method].path
      const secondParam = params[method].data
      const resData = await api[method](firstParam, secondParam)

      if (resData.response)
        cbAfterResData && cbAfterResData(resData.response.data)
      else cbAfterResData && cbAfterResData(resData)
      return resData.success
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    loading && setShowLoader(true)
    setData()
    getData && getData(data)

    validate()

    addToPath && parsePath()
    addDataToPath && parsePath()

    if (captcha)
      data.captcha = (await recaptchaRef.current?.executeAsync()) ?? false

    const submitRes = !haveErrors && (await makeRequest(afterResData))
    loading && setShowLoader(false)
    push && submitRes && history.push(push)
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate {...rest}>
        {captcha && (
          <ReCaptcha
            size='invisible'
            sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
            ref={recaptchaRef}
          />
        )}

        <FormContext.Provider
          value={{ removeInput, registerInput, loader: showLoader }}
        >
          {children}
        </FormContext.Provider>
      </form>

      <Popup ref={popupRef} />
    </>
  )
}

export { Form, Text, Datepicker, Submit, Select, File, Checkbox, Textarea }
export default Form
