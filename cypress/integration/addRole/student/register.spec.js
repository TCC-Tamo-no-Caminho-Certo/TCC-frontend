describe('Cadastrar papel de estudante', () => {
  it('Enviando e-mail institucional', () => {
    cy.accessAddRole()

    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()

    cy.get(':nth-child(1) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get(':nth-child(3) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-3-option-0').click()

    cy.get(':nth-child(4) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-4-option-0').click()

    cy.get(':nth-child(5) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-5-option-4').click()

    cy.get('.sc-cOajty > div > :nth-child(1)').click()
    cy.get('#email').click().type('21238239@anhembimorumbi.edu.br')
    cy.get('.sc-fKFyDc').click()
    cy.get('#token').click().type('teste{selectall}{backspace}')
    cy.pause()
    cy.get('.sc-fKFyDc').click()
    cy.get('.sc-bYEvPH > p').contains('E-mail confirmado')
    cy.get('.sc-bYEvPH > button').click()
    cy.get('.sc-fKFyDc').click()
    cy.get('.sc-bYEvPH > button').click()

    cy.logout()
  })

  it('Com e-mail institucional já cadastrado', () => {
    cy.accessAddRole()

    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()

    cy.get(':nth-child(1) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get(':nth-child(3) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-3-option-0').click()

    cy.get(':nth-child(4) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-4-option-0').click()

    cy.get(':nth-child(5) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-5-option-4').click()

    cy.get('.sc-cOajty').should('not.exist')
    cy.get('.sc-fKFyDc').click()
    cy.get('.sc-bYEvPH > button').click()
    cy.url().should('contains', 'session/main')

    cy.logout()
  })

  it.only('Enviando voucher', () => {
    cy.accessAddRole()

    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()

    cy.get(':nth-child(1) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#register').click().type('21238239')

    cy.get(':nth-child(3) > .css-2b097c-container > .Select__control').click()

    cy.get('#react-select-3-option-0').click()

    cy.get(':nth-child(4) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-4-option-0').click()

    cy.get(':nth-child(5) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-5-option-4').click()

    cy.get('.sc-cOajty > div > :nth-child(2)').click()
    cy.pause()
    cy.get('.sc-fKFyDc').click()
    cy.get('.sc-bYEvPH > button').click()

    cy.logout()
  })

  it('Verifica se solicitação foi enviada', () => {
    cy.accessAddRole()

    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()
  })
})
