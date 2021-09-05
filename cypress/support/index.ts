/* eslint-disable no-unused-vars */
/// <reference types="cypress" />
import { popup } from './commands/popup'
import { setSelect } from './commands/setSelect'
import { setDatepicker } from './commands/datepicker'
import { signOut, typeSignIn } from './commands/auth'

import 'cypress-file-upload'

declare global {
  namespace Cypress {
    interface Chainable {
      popup: typeof popup
      signOut: typeof signOut
      setSelect: typeof setSelect
      typeSignIn: typeof typeSignIn
      setDatepicker: typeof setDatepicker
    }
  }
}

Cypress.Commands.add('popup', { prevSubject: false }, popup)
Cypress.Commands.add('signOut', { prevSubject: false }, signOut)
Cypress.Commands.add('select', { prevSubject: false }, setSelect)
Cypress.Commands.add('setSelect', { prevSubject: false }, setSelect)
Cypress.Commands.add('typeSignIn', { prevSubject: false }, typeSignIn)
Cypress.Commands.add('setDatepicker', { prevSubject: false }, setDatepicker)
