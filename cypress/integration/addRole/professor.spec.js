describe('testes em AddRole-ProfessorForm', () => {
  it('acessar formulário', () => {
    // cy.login()
    cy.invisibleLogin()

    cy.get('#Gear').click()
    cy.get('#openProfile > :nth-child(4) > a').click()
    cy.get('.lhVFsh > #title').click()
    cy.get('.lhVFsh > div > button').click()

    cy.get('.Select__control').click()
    cy.get('#react-select-2-option-0').click()
    cy.get('.eLHHNX').click().type('21238239')
    cy.get(
      '[style="opacity: 1; transform: none;"] > .css-2b097c-container > .Select__control'
    ).click()
    cy.get('#react-select-3-option-0').click()
    cy.get(':nth-child(7) > .css-2b097c-container > .Select__control').click()
    cy.get('#react-select-4-option-1').click()
    cy.get(':nth-child(9) > .CheckboxLabel').click()

    cy.get('.sc-cOajty > div > :nth-child(2)').click()
    cy.pause()
    cy.get('.sc-fKFyDc').click()
    cy.get('.sc-bYEvPH > button').click()
    cy.url().should('contains', '/session/main')
  })
})
