describe('Cadastrar papel de estudante', () => {
  it('Enviando e-mail institucional', () => {
    cy.accessAddRole()

    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()

    cy.get(':nth-child(1) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-2-option-0').click()

    cy.get('#academic_register').click().type('21238239')

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
  })
})
