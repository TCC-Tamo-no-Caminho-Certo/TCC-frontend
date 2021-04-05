describe('Cadastrar papel de estudante', () => {
  it('Enviando voucher', () => {
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

    cy.get('.sc-cOajty > div > :nth-child(2)').click()
    cy.pause()
    cy.get('.sc-fKFyDc').click()
  })
})
