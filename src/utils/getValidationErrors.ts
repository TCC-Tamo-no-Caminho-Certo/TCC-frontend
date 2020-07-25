import { ValidationError } from '@hapi/joi'

interface Errors {
  [key: string]: string
}

export default function getValidationErrors(error: ValidationError): Errors {
  const ValidationErrors: Errors = {}

  error.details.forEach(errorElement => {
    ValidationErrors[errorElement.path.join('.')] = errorElement.message
  })

  return ValidationErrors
}
