describe('Cadastrar papel de moderador', () => {
  it.only('Enviando voucher', () => {
    cy.accessAddRole()

    cy.get('#cy-moderator').click()
    cy.get('#cy-moderator > div > button').click()

    cy.get('#cy-university').click()
    cy.get('#react-select-2-option-0').click()

    // For not Full Time here
    // cy.get('#cy-pretext')
    //   .click()
    //   .type('Quero ser moderador porque sou  legal :D')

    cy.get('#cy-submit').click()
    cy.get('#cy-confirm-popup').click()

    // For not Full Time here
    // cy.verifyIfRequestExist('#cy-moderator', 'Moderador')

    cy.verifyIfRoleHasChange('#cy-moderator')
    cy.get('#-session-main-map').click()
    cy.logout()
  })
})
