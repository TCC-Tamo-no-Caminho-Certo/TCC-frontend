describe('Cadastrar papel de professor', () => {
  it('Verifica se solicitação foi enviada', () => {
    cy.accessAddRole()

    cy.get('.lhVFsh > #title').click()
    cy.get('.lhVFsh > div > button').click()

    cy.get('.sc-iktFzd').should('exist')
  })
})
