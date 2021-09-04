/// <reference types="cypress" />

describe('Fazer sign-in e sign-out', () => {
  beforeEach(() => {
    cy.typeSignIn()
  })

  it('add student', () => {
    cy.get('[data-cy=Gear]').click()
    cy.get('[data-cy=Menu-addRole]').click()
    cy.get('[data-cy=AddRole-student]').click()
    cy.get('[data-cy=RoleInfo-roleButton]').click()

    cy.setSelect('#university_id', 'Universidade Anhembi Morumbi')
    cy.get('#register').type('21238239')
    cy.setSelect('#campus_id', 'Vila Olímpia (VO)')
    cy.setSelect('#course_id', 'Engenharia da Computação')
    cy.setSelect('#semester', '5° Semestre')
    cy.get('[data-cy=Ways-email]').click()

    cy.get('#address').type('21238239@anhembimorumbi.edu.br')
    cy.get('[data-cy=Submit]').click()
    cy.pause()
  })
})
