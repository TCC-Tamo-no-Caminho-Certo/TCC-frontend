Cypress.Commands.add(
  'invisibleLogin',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.request({
      method: 'POST',
      url: 'https://dev.steamslab.com/api/login',
      body: {
        email,
        password
      }
    }).then(res => {
      window.localStorage.setItem('@SLab_ac_token', res.access_token)
      cy.visit('/session/main')
      cy.url().should('contains', '/session/main')
    })
  }
)

Cypress.Commands.add(
  'login',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.visit('/home')
    cy.get('[data-cy=input-login-email]').type(email)
    cy.get('[data-cy=input-login-password]').type(password)
    cy.get('[data-cy=button-login-submit]').click()
    cy.url().should('contains', '/session/main')
  }
)

Cypress.Commands.add(
  'writeLogin',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.visit('/home')
    cy.get('[data-cy=input-login-email]').type(email)
    cy.get('[data-cy=input-login-password]').type(password)
  }
)

Cypress.Commands.add(
  'submitAndVerifyError',
  ({
    trigger,
    errorMessage,
    contain = 'contains',
    submit = '[data-cy=button-signup-submit]',
    content = '.content'
  }) => {
    cy.get(submit).click()
    if (contain === 'contains') {
      cy.get(trigger).trigger('mouseover')
      cy.get(content).contains(errorMessage)
    } else cy.get(trigger).should('not.exist')
  }
)

Cypress.Commands.add('verifyPasswordSchema', () => {
  cy.get('#EyeIcon').click()

  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Você precisa de uma senha!'
  })

  cy.get('[data-cy=input-signup-password').click().type('miguel')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter mais que 8 caracteres.'
  })

  cy.get('[data-cy=input-signup-password')
    .click()
    .type('{selectall}{backspace}miguelandrade')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter um número.'
  })

  cy.get('[data-cy=input-signup-password')
    .click()
    .type('{selectall}{backspace}miguel1234')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter uma letra maiúscula.'
  })

  cy.get('[data-cy=input-signup-password')
    .click()
    .type('{selectall}{backspace}Miguel1234')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter um caractere especial.'
  })

  cy.get('[data-cy=input-signup-password')
    .click()
    .type('{selectall}{backspace}MIGUEL@1234')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter uma letra minúscula.'
  })

  cy.get('[data-cy=input-signup-password')
    .click()
    .type('{selectall}{backspace}Miguel@1234')
  cy.submitAndVerifyError({
    trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
    errorMessage: 'Sua senha deve conter uma letra minúscula.',
    contain: 'not'
  })

  cy.get('[data-cy=input-signup-confirmPassword]').type('Miguel@123')
  cy.submitAndVerifyError({
    trigger: ':nth-child(10) > .sc-hHftDr > #Alert',
    errorMessage: 'As senhas não se correspondem.'
  })

  cy.get('[data-cy=input-signup-confirmPassword]')
    .click()
    .type('{selectall}{backspace}Miguel@1234')
  cy.submitAndVerifyError({
    trigger: ':nth-child(10) > .sc-hHftDr > #Alert',
    errorMessage: 'As senhas não se correspondem.',
    contain: 'not'
  })
})

Cypress.Commands.add(
  'accessAddRole',
  (email = 'miguelandradebarreto2@gmail.com', password = 'Miguel@1234') => {
    cy.login(email, password)
    cy.get('#Gear').click()
    cy.get('#openProfile > :nth-child(4) > a').click()
  }
)

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
