/// <reference types="cypress" />

describe('Fazer sign-in e sign-out', () => {
  it('sign-in', () => {
    cy.typeSignIn()
  })

  it('sign-out', () => {
    cy.signOut()
  })
})
