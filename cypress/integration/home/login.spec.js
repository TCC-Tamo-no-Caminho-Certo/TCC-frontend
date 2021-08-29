/// <reference types='cypress'/>

describe.skip('Validar login', () => {
  it('#mostrar erros', () => {
    cy.visit('/home')
    cy.get('[data-cy=Login-submit]').click()
    cy.get('[data-cy=Tooltip-error]').should('exist')
  })
})

describe('Fazer login e logout', () => {
  it('login', () => {
    cy.login()
  })

  it('logout', () => {
    cy.logout()
  })
})
