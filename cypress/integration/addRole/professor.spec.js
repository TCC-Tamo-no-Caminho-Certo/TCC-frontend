describe('Cadastrar papel de professor', () => {
  it('Com e-mail institucional já cadastrado', () => {
    cy.accessAddRole()

    cy.get('#cy-professor').click()
    cy.get('#cy-professor > div > button').click()

    cy.get('#lattes').click().type('Lattes de Professor :D')
    cy.get('#linkedin').click().type('Linkedin de Professor :D')
    cy.get('#orcid').click().type('Orcid de Professor :D')

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-0').click()

    // Full Time here
    cy.get('#cy-full_time').click()
    cy.get('#cy-postgraduate').click()

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRoleHasChange('#cy-professor')
    cy.get('#-session-main-map').click()
    cy.logout()
  })

  it('Cadastrando e-mail institucional', () => {
    cy.accessAddRole()

    cy.get('#cy-professor').click()
    cy.get('#cy-professor > div > button').click()

    cy.get('#lattes').click().type('Lattes de Professor :D')
    cy.get('#linkedin').click().type('Linkedin de Professor :D')
    cy.get('#orcid').click().type('Orcid de Professor :D')

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-0').click()

    // Full Time here
    cy.get('#cy-full_time').click()
    cy.get('#cy-postgraduate').click()

    cy.get('#cy-email').click()
    cy.get('#email').click().type('21238239@anhembimorumbi.edu.br')
    cy.get('.label').click()

    cy.get('#token').click().type('1234')
    cy.get('.label').click()
    cy.pause()

    cy.get('.label').click()
    cy.get('#cy-confirm-popup').click()
    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRoleHasChange('#cy-professor')
    cy.get('#-session-main-map').click()
    cy.logout()
  })

  it.only('Enviando voucher', () => {
    cy.accessAddRole()

    cy.get('#cy-professor').click()
    cy.get('#cy-professor > div > button').click()

    cy.get('#lattes').click().type('Lattes de Professor :D')
    cy.get('#linkedin').click().type('Linkedin de Professor :D')
    cy.get('#orcid').click().type('Orcid de Professor :D')

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get('#cy-campus').click()
    cy.get('#react-select-3-option-0').click()

    cy.get('#cy-course').click()
    cy.get('#react-select-4-option-0').click()

    // Full Time here
    cy.get('#cy-full_time').click()
    cy.get('#cy-postgraduate').click()
    cy.get('#cy-voucher').click()

    cy.pause()

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    cy.verifyIfRequestExist('#cy-professor', 'Professor')
  })
})
