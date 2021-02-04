import React from 'react'

export interface Ref {
  input: React.RefObject<any>
  setError: (message: string) => void
}

export interface FormState {
  loader: boolean
  theme?: any
  removeRef: (input: Ref) => void
  setRef: (input: Ref) => void
}

const FormContext = React.createContext<FormState | null>(null)

export default FormContext

FormContext.displayName = 'Form Context'
