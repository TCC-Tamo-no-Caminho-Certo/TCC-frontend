import React, {
  cloneElement,
  FC,
  FormEvent,
  HTMLProps,
  ReactElement,
  useRef,
  useState
} from 'react'
import { captcha as Captcha, ReCaptcha } from './styles'

import InpuDate from './InputDate'
import Button from './Button'
import Input, { InputProps, Ref } from './Input'

import api from 'services/api'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import { ObjectSchema, ValidationError } from 'yup'

interface Props extends HTMLProps<HTMLFormElement> {
  children: (ReactElement<InputProps> | ReactElement | ReactElement[])[] | ReactElement<InputProps>
  path: string
  token?: string
  captcha?: boolean

  loading?: boolean
  valSchema?: ObjectSchema
  addData?: { [key: string]: string }
  changeData?: (data: any) => void
  callback?: (resData: any) => void
}

/**
 *
 * @param children -must have an input
 */

const Form: FC<Props> = ({
  children,
  path,
  token,
  loading,
  valSchema,
  changeData,
  addData,
  captcha,
  callback,
  ...rest
}) => {
  const data: any = { ...addData }
  const refs: Ref[] = []
  let haveErrors = false

  const [showLoader, setShowLoader] = useState(false)
  const recaptchaRef = useRef<Captcha>(null)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const setRef = (input: Ref) => {
    refs.push(input)
  }

  const setData = () => {
    refs.forEach(ref => {
      if (!ref.input.current) throw new Error('Form setData error!')

      data[ref.input.current.name] =
        ref.input.current?.type === 'checkbox'
          ? ref.input.current?.checked
          : ref.input.current?.value
    })
  }

  const validate = async () => {
    try {
      valSchema && (await valSchema.validate(data, { abortEarly: false }))
    } catch (error) {
      haveErrors = true

      if (error instanceof ValidationError) {
        error.inner.forEach(errorElement => {
          const index = refs.findIndex(value => value.input.current?.name === errorElement.path)
          refs[index].setError(errorElement.message)
        })
      } else {
        throw new Error('unexpected error on validation!')
      }
    }
  }

  const submit = async (cb?: (data: any) => void) => {
    const resData = await api.post(
      `http://dev.steamslab.com/api/${path}`,
      data,
      token ? { headers: { authorization: `Berear ${token}` } } : undefined
    )
    cb && cb(resData)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // console.log(refs)

    loading && setShowLoader(true)

    setData()
    changeData && changeData(data)
    await validate()
    if (captcha) data.captcha = (await recaptchaRef.current?.executeAsync()) ?? false
    // !haveErrors && (await submit(callback))

    loading && setShowLoader(false)
    console.log(data)
  }

  const checkChildren = (
    elements:
      | (ReactElement<InputProps> | ReactElement | ReactElement[])[]
      | ReactElement<InputProps>
      | ReactElement
  ) => {
    const childrenCheck: any = Array.isArray(elements) ? elements : [elements]

    return childrenCheck.map((child: ReactElement<InputProps> | ReactElement, i: number) => {
      if (child.type === Input || child.type === InpuDate)
        return cloneElement(child, {
          key: child.props.name,
          theme,
          _setref: setRef,
        })

      if (child.type === Button)
        return loading ? cloneElement(child, { key: 'loader', theme, _loader: showLoader }) : child

      if (child.props?.children) {
        const result = checkChildren(child.props.children)
        return cloneElement(child, {
          key: child.key || `${i} ${child.type} ${Math.random()}`,
          children: result,
        })
      }

      if (Array.isArray(child)) return checkChildren(child)

      return child
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate {...rest}>
      {captcha && (
        <ReCaptcha
          ref={recaptchaRef}
          size='invisible'
          sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
        />
      )}

      {checkChildren(children)}
    </form>
  )
}

export default Form
