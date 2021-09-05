/// <reference types="cypress" />

describe('Fazer sign-in e sign-out', () => {
  before(() => {
    cy.visit('/home')
  })

  it('sign-in', () => {
    cy.typeSignIn()
  })

  it('sign-out', () => {
    cy.signOut()
  })
})
