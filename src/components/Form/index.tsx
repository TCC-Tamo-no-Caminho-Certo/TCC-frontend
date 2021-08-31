import React, {
  createContext,
  FormEvent,
  HTMLProps,
  RefObject,
  useEffect,
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
import Field from './Field'
import FieldTable from './FieldTable'

import api from 'services/api'

import Captcha from 'react-google-recaptcha'
import { useHistory } from 'react-router-dom'
import { ObjectSchema, ValidationError } from 'yup'

export interface Ref {
  value?: any
  type: string
  inputRef: RefObject<any>
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
  className?: string
  addToPath?: string[]
  schema?: ObjectSchema
  getData?: (_data: any) => void
  onError?: (_error: any) => void
  addData?: { [key: string]: any }
  manipulateData?: (_data: any) => any
  afterResData?: (_resData: any) => void
  method?: 'post' | 'get' | 'delete' | 'patch' | 'put'
}

export const FormContext = createContext<FormState | null>(null)

const Form = React.forwardRef<any, FormProps>(
  (
    {
      path,
      push,
      schema,
      loading,
      getData,
      addData,
      captcha,
      onError,
      children,
      addToPath,
      afterResData,
      manipulateData,
      method = 'post',
      className = 'Form',
      ...rest
    },
    ref
  ) => {
    const recaptchaRef = useRef<Captcha>(null)

    const [showLoader, setShowLoader] = useState(false)

    const history = useHistory()

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
              current.value === ''
                ? (data[current.name] = undefined)
                : (data[current.name] = current.value)
              break

            case 'number':
              current.value === ''
                ? (data[current.name] = undefined)
                : (data[current.name] = current.value)
              break

            case 'date':
              value === ''
                ? (data[current.name] = undefined)
                : (data[current.name] = value)

              break

            case 'password':
              current.value === ''
                ? (data[current.name] = undefined)
                : (data[current.name] = current.value)

              break

            case 'checkbox':
              data[current.name] = current.checked

              break

            case 'textarea':
              data[current.name] =
                current.value === ''
                  ? (data[current.name] = undefined)
                  : (data[current.name] = current.value)
              break

            case 'select':
              current.select.props.value === null
                ? (data[current.props.name] = undefined)
                : (data[current.props.name] = current.select.props.value.value)
              break

            case 'multiSelect':
              if (current.select.props.value === null)
                data[current.props.name] = undefined
              else
                data[current.props.name] = current.select.props.value.map(
                  (oneValue: { value: string; label: string }) => oneValue.value
                )
              break

            case 'file':
              value
                ? (data[current.name] = value)
                : (data[current.name] = undefined)
              break

            default:
              throw new Error('Type of input wasnt specified')
          }
      })
    }

    const validate = () => {
      try {
        haveErrors = false

        schema && schema.validateSync(data, { abortEarly: false })
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

    const makeRequest = async (cbAfterResData?: (_data: any) => void) => {
      const manipulatedData = manipulateData ? manipulateData(data) : data
      getData && getData(manipulatedData)

      if (path) {
        const params: { [key: string]: { path: string; data?: any } } = {
          get: { path },
          delete: { path },
          put: { path, data: manipulatedData },
          post: { path, data: manipulatedData },
          patch: { path, data: manipulatedData }
        }

        const firstParam = params[method].path
        const secondParam = params[method].data
        const resData = await api[method](firstParam, { ...secondParam })

        loading && setShowLoader(false)

        if (resData.response?.data)
          cbAfterResData && cbAfterResData(resData.response.data)
        else cbAfterResData && cbAfterResData(resData)

        return resData.success
      }
    }

    const parsePath = () => {
      if (!path) throw new Error('path is undefined')

      const paths = path.split('*%')

      if (paths.length - 1 !== addToPath!.length)
        throw new Error('paths.length - 1 !== addToPath?.length')

      path = paths.reduce((acc, curr, idx) => {
        if (paths.length === idx + 1) return acc + curr
        return acc + curr + data[addToPath![idx]]
      }, '')
    }

    const onSubmit = async (event: FormEvent) => {
      event.preventDefault()
      loading && setShowLoader(true)
      setData()

      validate()

      !haveErrors && addToPath && parsePath()
      haveErrors && loading && setShowLoader(false)

      if (captcha)
        data.captcha = (await recaptchaRef.current?.executeAsync()) ?? false

      const submitRes = !haveErrors && (await makeRequest(afterResData))
      push && submitRes && history.push(push)
    }

    useEffect(() => setShowLoader(false), [])

    return (
      <form
        ref={ref}
        noValidate
        data-cy='Form'
        onSubmit={onSubmit}
        className={className}
        {...rest}
      >
        {captcha && (
          <ReCaptcha
            size='invisible'
            ref={recaptchaRef}
            sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
          />
        )}

        <FormContext.Provider
          value={{ removeInput, registerInput, loader: showLoader }}
        >
          {children}
        </FormContext.Provider>
      </form>
    )
  }
)

export {
  Form,
  Text,
  File,
  Field,
  Select,
  Submit,
  Checkbox,
  Textarea,
  Datepicker,
  FieldTable
}

export default Form
