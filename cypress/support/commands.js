/// <reference types='cypress'/>

Cypress.Commands.add(
  'login',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.visit('/home')
    cy.get('[data-cy=Login-email]').type(email)
    cy.get('[data-cy=Login-password]').type(password)

    cy.intercept({ method: 'POST', url: '/api/sign-in' }, () => {}).as(
      'sign-in'
    )

    cy.get('[data-cy=Login-submit]').click()
  }
)

Cypress.Commands.add('logout', () => {
  cy.url().should('exist', '/session/main')
  cy.get('[data-cy=RightMenu-gear]').click()
  cy.get('[data-cy=RightMenu-logout]').click()
  cy.url().should('not.contains', '/session')
})

Cypress.Commands.add(
  'submitAndVerifyError',
  ({
    trigger,
    errorMessage,
    contain = 'contains',
    content = '.content',
    submit = '[data-cy=Signup-submit]'
  }) => {
    cy.get(submit).click()

    if (contain === 'contains') {
      cy.get(trigger).trigger('mouseover')
      cy.get(content).contains(errorMessage)
    } else cy.get(trigger).should('not.exist')
  }
)
Cypress.Commands.add(
  'accessAddRole',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.login(email, password)
    cy.get('[data-cy=RightMenu-gear]').click()
    cy.get('[data-cy=Menu-addRole]').click()
  }
)

Cypress.Commands.add(
  'verifyIfRequestExist',
  (id = '#cy-student', label = 'Estudante') => {
    cy.get('#Gear').click()
    cy.get(':nth-child(4) > a').click()

    cy.get(id).click()
    cy.get(`${id} > div > button`).click()

    cy.get('#cy-follow').contains('Acompanhar solicitação')
    cy.get('#role').contains(label)
    cy.get('#-session-main-map').click()
    cy.logout()
  }
)

Cypress.Commands.add('verifyIfRoleHasChange', (id = '#cy-student') => {
  cy.wait(1000)
  cy.get('#Gear').click()
  cy.get(':nth-child(4) > a').click()

  cy.get(id).click()
  cy.wait(100)
  cy.get('#roleAlreadyExists').should('be.disabled')
})
