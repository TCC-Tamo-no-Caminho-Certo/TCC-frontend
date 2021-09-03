/// <reference types="cypress" />
import { setDatepicker } from './commands/datepicker'
import { signOut, typeSignIn } from './commands/auth'

declare global {
  namespace Cypress {
    interface Chainable {
      signOut: typeof signOut
      typeSignIn: typeof typeSignIn
      setDatepicker: typeof setDatepicker
    }
  }
}

Cypress.Commands.add('signOut', { prevSubject: false }, signOut)
Cypress.Commands.add('typeSignIn', { prevSubject: false }, typeSignIn)
Cypress.Commands.add('setDatepicker', { prevSubject: false }, setDatepicker)
