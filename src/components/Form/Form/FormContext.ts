import { createContext, RefObject } from 'react'

export interface Ref {
  input: RefObject<HTMLInputElement>
  setError: (value: string) => void
}

export interface FormState {
  setRef: (input: Ref) => void
  loader: boolean
  theme: any
}

const FormContext = createContext<FormState | null>(null)

FormContext.displayName = 'Form Context'

export const FormProvider = FormContext.Provider

export default FormContext
