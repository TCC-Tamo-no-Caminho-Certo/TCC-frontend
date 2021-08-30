/// <reference types='cypress'/>

describe('Criar temporada', () => {
  it('login', () => {
    cy.login('gabriel.nori@hotmail.com', 'Gabriel@1234')
  })

  it('#Criar temporada', () => {
    cy.intercept({
      method: 'GET',
      url: '/api/users/4/roles/universities'
    }).as('user-universities')

    cy.wait('@user-universities')
    cy.get('[data-cy]=Seasons-Universidade Anhembi Morumbi')
  })
})
