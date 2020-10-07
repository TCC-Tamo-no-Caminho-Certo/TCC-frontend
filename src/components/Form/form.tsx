import React, {
  FC,
  HTMLProps,
  FormEvent,
  ReactElement,
  cloneElement,
  useRef,
  useState,
} from 'react'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

import Input, { InputProps, Ref } from './Input/input'

import { ObjectSchema, ValidationError } from 'yup'

import { ReCAPTCHA, captcha } from './Input/style'

import Button from './button'

import axios from 'axios'

interface Props extends HTMLProps<HTMLFormElement> {
  children: (ReactElement<InputProps> | ReactElement)[] | ReactElement<InputProps>

  path: string

  token?: string

  captcha?: boolean

  loaderFB?: boolean

  valSchema?: ObjectSchema

  addData?: { [key: string]: string }

  cb?: (resData: any) => void
}

/**

 *

 * @param children -must be an input

 */

const Form: FC<Props> = ({
  children,

  path,

  token,

  loaderFB,

  valSchema,

  addData,

  captcha,

  cb,

  ...rest
}) => {
  // const auxChildren: any = Array.isArray(children) ? children : [children]

  const data: any = { ...addData }

  const refs: Ref[] = []

  let haveErrors = false

  const [showLoader, setShowLoader] = useState(false)

  const recaptchaRef = useRef<captcha>(null)

  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const setRef = (input: Ref) => {
    refs.push(input)
  }

  const setData = () => {
    refs.forEach(ref => {
      data[ref.input.current!.name] =
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
    try {
      const { data: resData } = await axios.post(
        `http://dev.steamslab.com/api/${path}`,

        data,

        token ? { headers: { authorization: `Berear ${token}` } } : undefined
      )

      cb && cb(resData)
    } catch (error) {
      cb && cb(error.response.data)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // console.log(refs)

    loaderFB && setShowLoader(true)

    setData()

    await validate()

    data.captcha = captcha && (await recaptchaRef.current!.executeAsync())

    // !haveErrors && (await submit(cb))

    loaderFB && setShowLoader(false)

    console.log(data)
  }

  const checkChildren = (
    elements: (ReactElement<InputProps> | ReactElement)[] | ReactElement<InputProps> | ReactElement
  ) => {
    // if (!Array.isArray(elements)) {

    //   const child = elements.props?.children

    //   if (!child) return elements

    //   if (child.type === Input)

    //     return cloneElement(child, { key: child.props.name, theme, _setref: setRef })

    //   else if (child.type === Button)

    //     return loaderFB ? cloneElement(child, { key: 'loader', theme, _loader: showLoader }) : child

    //   else if (child.props.children)

    //     return checkChildren(child.props.children)

    //   return child

    // }

    const auxChildren: any = Array.isArray(elements) ? elements : [elements]

    return auxChildren.map((child: ReactElement<InputProps> | ReactElement) => {
      if (child.type === Input)
        return cloneElement(child, { key: child.props.name, theme, _setref: setRef })

      if (child.type === Button)
        return loaderFB ? cloneElement(child, { key: 'loader', theme, _loader: showLoader }) : child

      if (child.props?.children) {
        const result = checkChildren(child.props.children)

        return cloneElement(child, { key: Math.random(), children: result })
      }

      return child
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate {...rest}>
      {captcha && (
        <ReCAPTCHA
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
