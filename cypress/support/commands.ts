import SigninReqType from '../../src/types/Requests/sign-in'

import 'cypress-file-upload'

/// <reference types='cypress'/>

Cypress.Commands.add('typeSignIn', (fixture = 'user') => {
  cy.fixture(fixture).then((signIn: SigninReqType) => {
    cy.intercept({ method: 'POST', url: 'api/sign-in' }, request => {
      expect(request.body.email).to.equal(signIn.email)
      expect(request.body.password).to.equal(signIn.password)

      request.reply(response => {
        expect(response.body.success).to.equal(true)
      })
    }).as('sign-in')

    cy.visit('/home')

    cy.get('[data-cy=Login-email]').type(signIn.email)
    cy.get('[data-cy=Login-password]').type(signIn.password)

    cy.get('[data-cy=Login-submit]').click()
    cy.url().should('contains', '/session/main')
  })
})

Cypress.Commands.add('logout', () => {
  cy.url().should('exist', '/session/main')
  cy.get('[data-cy=RightMenu-gear]').click()
  cy.get('[data-cy=RightMenu-logout]').click()
  cy.url().should('not.contains', '/session')
})

Cypress.Commands.add('datepicker', (date: string) => {
  const usableDate = date.split('/')
  const day = usableDate[0]
  const year = usableDate[2]
  const month = usableDate[1]

  cy.get('[data-testid=year-selector]')
    .find('> li > button')
    .contains(year)
    .click()

  cy.get('.-shown > .Calendar__monthText').click()
  cy.get(`:nth-child(${month}) > .Calendar__monthSelectorItemText`).click()

  cy.get('[role=gridcell]').contains(day).click()
})
