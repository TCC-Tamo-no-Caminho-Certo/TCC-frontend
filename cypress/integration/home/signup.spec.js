describe('Validações', () => {
  it.skip('#validar schema de senha', () => {
    cy.visit('/home/signup')
    cy.get('#EyeIcon').click()

    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Você precisa de uma senha!'
    })

    cy.get('[data-cy=Signup-password').click().type('miguel')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter mais que 8 caracteres.'
    })

    cy.get('[data-cy=Signup-password')
      .click()
      .type('{selectall}{backspace}miguelandrade')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter um número.'
    })

    cy.get('[data-cy=Signup-password')
      .click()
      .type('{selectall}{backspace}miguel1234')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter uma letra maiúscula.'
    })

    cy.get('[data-cy=Signup-password')
      .click()
      .type('{selectall}{backspace}Miguel1234')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter um caractere especial.'
    })

    cy.get('[data-cy=Signup-password')
      .click()
      .type('{selectall}{backspace}MIGUEL@1234')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter uma letra minúscula.'
    })

    cy.get('[data-cy=Signup-password')
      .click()
      .type('{selectall}{backspace}Miguel@1234')
    cy.submitAndVerifyError({
      trigger: ':nth-child(9) > .sc-hHftDr > #Alert',
      errorMessage: 'Sua senha deve conter uma letra minúscula.',
      contain: 'not'
    })

    cy.get('[data-cy=Signup-confirmPassword]').type('Miguel@123')
    cy.submitAndVerifyError({
      trigger: ':nth-child(10) > .sc-hHftDr > #Alert',
      errorMessage: 'As senhas não se correspondem.'
    })

    cy.get('[data-cy=Signup-confirmPassword]')
      .click()
      .type('{selectall}{backspace}Miguel@1234')
    cy.submitAndVerifyError({
      trigger: ':nth-child(10) > .sc-hHftDr > #Alert',
      errorMessage: 'As senhas não se correspondem.',
      contain: 'not'
    })
  })
})

describe('Cadastro', () => {
  it.skip('#cadastro', () => {
    cy.visit('/home')
    cy.get('[data-cy=Login-register]').click()
    cy.wait(1001)
    cy.url().should('contains', '/home/signup')
  })

  it('confimar cadastro (User already exists)', () => {
    cy.visit('/home/signup')

    cy.get('[data-cy=Signup-name]').click().type('Miguel Andrade')

    cy.get('[data-cy=Signup-surname]').click().type('Barreto')

    cy.get('[data-cy=Signup-birthday]').click()
    cy.get('[data-testid=year-selector]').scrollTo('bottom')
    cy.get(':nth-child(101) > .Calendar__yearSelectorText').click()
    cy.get('.-shown > .Calendar__monthText').click()
    cy.get(':nth-child(8) > .Calendar__monthSelectorItemText').click()
    cy.get('[aria-label="Domingo, 19 Agosto 2001"]').click()
    cy.get('[data-cy=Signup-birthday]')
      .invoke('val')
      .should('contains', '19/08/2001')

    cy.get('[data-cy=Signup-email]')
      .click()
      .type('miguelandradebarreto2@gmail.com')

    cy.get('[data-cy=Signup-password').click().type('Miguel@1234')

    cy.get('[data-cy=Signup-confirmPassword]').click().type('Miguel@1234')

    cy.get('[data-cy=Signup-submit]').scrollIntoView().click()

    cy.get('[data-cy=Popup] > p').contains(
      'Usuário já cadastrado, tente conectar!'
    )
    cy.get('[data-cy=Popup] > button').click()
    cy.url().should('not.contains', '/home/signup')
  })

  it.skip('#excluir conta', () => {
    cy.login()
    cy.wait(3000)

    cy.request('DELETE', 'https://dev.steamslab.com/api/user', {
      password: 'Miguel@1234'
    })
  })
})
