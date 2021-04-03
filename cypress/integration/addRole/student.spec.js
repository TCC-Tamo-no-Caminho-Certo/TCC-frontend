describe('acessar formulário de estudante', () => {
  it('login', () => {
    cy.login()
  })

  it('acessar formulário', () => {
    cy.get('#Gear').click()
    cy.get('#openProfile > :nth-child(4) > a').click()
    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()
  })
})
