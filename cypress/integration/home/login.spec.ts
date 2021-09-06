/// <reference types="cypress" />

describe('Sign-in and sign-out', () => {
  before(() => {
    cy.visit('/home')
  })

  it('Sign-in', () => {
    cy.typeSignIn()
  })

  it('Sign-out', () => {
    cy.signOut()
  })
})
