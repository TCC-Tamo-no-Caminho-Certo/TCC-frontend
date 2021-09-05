/// <reference types='cypress'/>

import SigninReqType from '../../../src/types/Requests/sign-in'

export const typeSignIn = (fixture: string = 'user') => {
  cy.fixture(fixture).then((signIn: SigninReqType) => {
    cy.intercept({ method: 'POST', url: 'api/sign-in' }, request => {
      expect(request.body.email).to.equal(signIn.email)
      expect(request.body.password).to.equal(signIn.password)

      request.reply(response => {
        expect(response.body.success).to.equal(true)
      })
    }).as('sign-in')

    cy.get('[data-cy=Login-email]').type(signIn.email)
    cy.get('[data-cy=Login-password]').type(signIn.password)

    cy.get('[data-cy=Login-submit]').click()

    cy.wait('@sign-in')
    cy.url().should('contains', '/session/main')
  })
}

export const signOut = () => {
  cy.intercept({ method: 'GET', url: 'api/logout' }).as('logout')
  cy.url().should('exist', '/session/main')
  cy.get('[data-cy=Gear]').click()
  cy.get('[data-cy=RightMenu-logout]').click()

  cy.wait('@logout')
  cy.url().should('not.contains', '/session')
}
