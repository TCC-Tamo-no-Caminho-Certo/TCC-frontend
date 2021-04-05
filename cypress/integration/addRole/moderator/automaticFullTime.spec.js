describe('Cadastro de um moderador', () => {
  it('Enviando justificativa', () => {
    cy.accessAddRole('andrelms91@gmail.com', '123mudar')

    cy.get('.dAsvyv > #title').click()
    cy.get('.dAsvyv > div > button').click()

    cy.wait(300)
    cy.get('.sc-fKFyDc').click()
  })
})
