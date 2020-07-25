import { ValidationError } from 'yup'

interface Errors {
  [key: string]: string
}

export default function getValidationErrors(error: ValidationError): Errors {
  const ValidationErrors: Errors = {}

  error.inner.forEach(errorElement => {
    ValidationErrors[errorElement.path] = errorElement.message
  })

  return ValidationErrors
}
