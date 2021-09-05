/// <reference types="cypress" />

import { getRoleLabel } from 'utils/roles'

import { RoleType } from 'types/Responses/user/roles'

const fillStudentForm = () => {
  cy.fixture('roles/student').then(
    ({ university, register, campus, course, semester }) => {
      cy.setSelect('#university_id', university)
      cy.get('#register').type(register)
      cy.setSelect('#campus_id', campus)
      cy.setSelect('#course_id', course)
      cy.setSelect('#semester', semester)
    }
  )
}

const accessRole = (role: RoleType, remove: boolean = false) => {
  cy.get('[data-cy=Gear]').click()
  cy.get('[data-cy=Menu-addRole]').click()
  cy.get(`[data-cy=AddRole-${role}]`).click()

  if (remove) {
    cy.get('[data-cy=DeleteRole]').click()
    cy.popup(`Tem certeza que deseja excluir o papel: ${getRoleLabel(role)}?`)
    cy.popup('Papel removido')
    cy.get('[data-cy=DeleteRole]').should('not.exist')
    cy.get('[data-cy="Voltar ao mapa"]').click()
  } else cy.get('[data-cy=RoleInfo-roleButton]').click()
}

describe('request student role using voucher', () => {
  before(() => {
    cy.visit('/home')
  })

  afterEach(() => {
    cy.signOut()
  })

  it('request', () => {
    cy.typeSignIn()
    accessRole('student')

    fillStudentForm()
    cy.wait(600)
    cy.get('[data-cy=Ways-voucher]').click()
    cy.wait(600)
    cy.get('[data-cy=File]').attachFile('assets/test.pdf')
    cy.get('[data-cy=Submit]').click()
    cy.popup('Solicitação enviada!')

    accessRole('student')
    cy.get('[data-cy=RequestSVG]').should('exist')
    cy.get('[data-cy="Voltar ao mapa"]').click()
  })

  it('accept student role request', () => {
    cy.typeSignIn('moderator')

    cy.get('[data-cy=Universidade]').click()
    cy.get('tr').contains('Miguel A.').click()

    cy.get('#Radio-accept').click()
    cy.get('[data-cy=Form] > [data-cy=Submit]').click()
    cy.popup('Resposta enviada.')

    cy.get('[data-cy="Voltar ao mapa"]').click()
  })

  it('remove student role', () => {
    cy.typeSignIn()
    accessRole('student', true)
  })
})
