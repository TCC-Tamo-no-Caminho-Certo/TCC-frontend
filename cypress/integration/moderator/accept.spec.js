describe('Aceitar primeira solicitação', () => {
  it('Aceitar', () => {
    cy.login('gabriel.nori@hotmail.com', 'Gabriel@1234')
    cy.get('#-session-moderator').click()

    cy.get('tbody > tr').click()
  })
})
