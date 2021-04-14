describe('Aceitar primeira solicitação', () => {
  it('Enviando voucher', () => {
    cy.accessAddRole()

    cy.get('#cy-student').click()
    cy.get('#cy-student > div > button').click()

    cy.get('#lattes').click().type('Lattes de Estudante :D')
    cy.get('#linkedin').click().type('Linkedin de Estudante :D')

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-0').click()

    cy.get('#cy-semester').click()
    cy.get('#react-select-5-option-4').click()

    cy.get('#cy-voucher').click()
    cy.pause()

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRequestExist()
  })

  it('Recusar solicitação', () => {
    cy.login('gabriel.nori@hotmail.com', 'Gabriel@1234')
    cy.get('#-session-moderator').click()

    cy.get('tbody > tr').click()
    cy.get('#radioReject').click()
    cy.get('#feedback').click().type('Testando recusar estudante.')
    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    // cy.get('tbody > tr').click()
    // cy.get('#TrashIcon').click()
    // cy.get('#cy-confirm-popup').click()

    cy.get('#-session-main').click()
    cy.logout()
  })

  it('Alterar dados e enviar novamente', () => {
    cy.accessAddRole()

    cy.get('#cy-student').click()
    cy.get('#cy-student > div > button').click()

    cy.get('#lattes')
      .click()
      .type('{selectall}{backspace}Lattes de Estudante :<')
    cy.get('#linkedin')
      .click()
      .type('{selectall}{backspace}Linkedin de Estudante :<')

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('{selectall}{backspace}21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-1').click()

    cy.get('#cy-semester').click()
    cy.get('#react-select-5-option-1').click()

    cy.pause()

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRequestExist()
  })

  it('Aceitar e excluir solicitação', () => {
    cy.login('gabriel.nori@hotmail.com', 'Gabriel@1234')
    cy.get('#-session-moderator').click()

    cy.get('tbody > tr').click()
    cy.get('#radioAccept').click()
    cy.get('#feedback').click().type('Testando aceitar estudante.')
    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.get('tbody > tr').click()
    cy.get('#TrashIcon').click()
    cy.get('#cy-confirm-popup').click()

    cy.get('#-session-main').click()
    cy.logout()
  })

  it('Verificar se o papel foi alterado e remove-lo', () => {
    cy.accessAddRole()

    cy.get('#cy-student').click()
    cy.get('#cy-student > div > button').should('be.disabled')
    cy.get('#deleteRole').click()
    cy.wait(2000)
    cy.get('#-session-main-map').click()
    cy.logout()
  })
})
