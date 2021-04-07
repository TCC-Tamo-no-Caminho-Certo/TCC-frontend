describe('Fazer login e logout', () => {
  it('login e logout', () => {
    cy.login()
    cy.logout()
  })
})

describe('Signup', () => {
  it('validar schema de senha', () => {
    cy.get('[data-cy=button-login-register]').click()
    cy.url().should('contains', '/home/signup')
    cy.wait(1001)

    cy.verifyPasswordSchema()

    cy.visit('/home')
    cy.wait(1001)
  })

  it('fazer cadastro', () => {
    cy.get('[data-cy=button-login-register]').click()
    cy.url().should('contains', '/home/signup')

    cy.wait(1001)

    cy.get('[data-cy=input-signup-name]').click().type('Miguel Andrade')

    cy.get('[data-cy=input-signup-surname]').click().type('Barreto')

    cy.get('[data-cy=input-signup-birthday]').click()
    cy.get('[data-testid=year-selector]').scrollTo('bottom')
    cy.get(':nth-child(102) > .Calendar__yearSelectorText').click()
    cy.get('.-shown > .Calendar__monthText').click()
    cy.get(':nth-child(8) > .Calendar__monthSelectorItemText').click()
    cy.get('[aria-label="Segunda, 19 Agosto 2002"]').click()
    cy.get('[data-cy=input-signup-birthday]')
      .invoke('val')
      .should('contains', '19/08/2002')

    cy.get('[data-cy=input-signup-email]')
      .click()
      .type('miguelandradebarreto2@gmail.com')

    cy.get('[data-cy=input-signup-password').click().type('Miguel@1234')

    cy.get('[data-cy=input-signup-confirmPassword]').click().type('Miguel@1234')

    cy.get('[data-cy=button-signup-submit]').scrollIntoView().click()
    cy.scrollTo(0, 0)

    cy.get('.sc-bYEvPH > p').contains('Usuário já cadastrado, tente conectar!')
    cy.get('.sc-bYEvPH > button').click()
    cy.url().should('not.contains', '/home/signup')
  })
})
