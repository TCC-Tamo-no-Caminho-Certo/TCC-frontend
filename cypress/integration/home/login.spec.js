/// <reference types='cypress'/>

describe.skip('Validar login', () => {
  it('#mostrar erros', () => {
    cy.visit('/home')
    cy.get('[data-cy=Login-submit]').click()
    cy.get('[data-cy=Tooltip-error]').should('exist')
  })
})

describe('Fazer sign-in e sign-out', () => {
  it.only('sign-in', () => {
    cy.typeSignIn()
  })

  it('sign-out', () => {
    cy.logout()
  })
})
