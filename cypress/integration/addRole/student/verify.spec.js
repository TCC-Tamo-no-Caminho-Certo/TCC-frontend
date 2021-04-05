describe('Verificar se solicitação de estudante foi enviada', () => {
  it('Verifica se solicitação foi enviada', () => {
    cy.accessAddRole()
    cy.get('.cipKMP > #title').click()
    cy.get('.cipKMP > div > button').click()

    cy.get('.lhVFsh > #title').click()
    cy.get('.lhVFsh > div > button').click()

    cy.get('.sc-iktFzd').should('exist')
  })
})
