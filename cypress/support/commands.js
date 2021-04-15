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

Cypress.Commands.add('logout', () => {
  cy.url().should('exist', '/session/main')
  cy.get('#Gear').click()
  cy.get('[data-cy=button-main-logout]').click()
  cy.url().should('not.contains', '/session')
})

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
