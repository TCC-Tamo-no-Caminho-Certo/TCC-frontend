describe('Cadastrar papel de estudante', () => {
  it('Com e-mail institucional já cadastrado', () => {
    cy.accessAddRole()

    cy.get('[data-cy=AddRole-student]').click()
    cy.get('[data-cy=RoleInfo-roleButton]').click()

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

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRoleHasChange()
    cy.get('#-session-main-map').click()
    cy.logout()
  })

  it.only('Cadastrando e-mail institucional', () => {
    cy.accessAddRole()

    cy.get('[data-cy=AddRole-student]').click()
    cy.get('[data-cy=RoleInfo-roleButton]').click()

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-0').click()

    cy.get('#cy-semester').click()
    cy.get('#react-select-5-option-4').click()

    cy.get('[data-cy=Ways-email]').click()
    cy.get('#address').click().type('21238239@anhembimorumbi.edu.br')
    cy.get('.label').click()

    cy.get('#token').click().type('1234')
    cy.get('.label').click()
    cy.pause()

    cy.get('.label').click()
    cy.get('#cy-confirm-popup').click()
    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRoleHasChange()
    cy.get('#-session-main-map').click()
    cy.logout()
  })

  it('Enviando voucher', () => {
    cy.accessAddRole()

    cy.get('[data-cy=AddRole-student]').click()
    cy.get('[data-cy=RoleInfo-roleButton]').click()

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
})
