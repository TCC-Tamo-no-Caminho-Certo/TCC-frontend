/// <reference types="cypress" />

import { getRoleLabel } from 'utils/roles'

import { RoleType } from 'types/Responses/user/roles'

const removeRequest = (role: 'student' | 'professor' | 'moderator') => {
  cy.typeSignIn('moderator')
  cy.get('[data-cy=Universidade]').click()
  cy.get('[data-cy=TableTr]')
    .should('contain', 'Miguel A.')
    .children(`[data-cy=${role}]`)
    .click()

  cy.get('[data-cy=Trash]').click()

  cy.popup('Tem certeza que deseja remover esta solicitação?')
  cy.popup('Solicitação removida')

  cy.get('[data-cy="Voltar ao mapa"]').click()
}

const fillUniversityForm = ({ university, register, campus, course }: any) => {
  cy.setSelect('#university_id', university)
  cy.get('#register').type(register)
  cy.setSelect('#campus_id', campus)
  cy.setSelect('#course_id', course)
}

const accessRole = (role: RoleType, remove: boolean = false) => {
  cy.get('[data-cy=Gear]').click()
  cy.get('[data-cy=Menu-addRole]').click()
  cy.get(`[data-cy=RoleInfo-${role}] > [data-cy=Title]`).click()

  if (remove) {
    cy.get('[data-cy=DeleteRole]').click()
    cy.popup(`Tem certeza que deseja excluir o papel: ${getRoleLabel(role)}?`)
    cy.popup('Papel removido')
    cy.get('[data-cy=DeleteRole]').should('not.exist')
    cy.get('[data-cy="Voltar ao mapa"]').click()
  } else cy.get('[data-cy=RoleInfo-roleButton]').click()
}

describe('Request to Student role using voucher', () => {
  before(() => {
    cy.visit('/home')
  })

  afterEach(() => {
    cy.signOut()
  })

  it('Do request', () => {
    cy.typeSignIn()
    accessRole('student')

    cy.fixture('roles/student').then(fixture => {
      fillUniversityForm(fixture)
      cy.setSelect('#semester', fixture.semester)
    })

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

  it('Accept request', () => {
    cy.typeSignIn('moderator')

    cy.get('[data-cy=Universidade]').click()

    cy.get('[data-cy=TableTr]')
      .should('contain', 'Miguel A.')
      .children('[data-cy=student]')
      .click()

    cy.get('#Radio-accept').click()
    cy.get('[data-cy=Form] > [data-cy=Submit]').click()
    cy.popup('Resposta enviada.')

    cy.get('[data-cy="Voltar ao mapa"]').click()
  })

  it('Remove request', () => {
    removeRequest('student')
  })

  it('Remove role', () => {
    cy.typeSignIn()
    accessRole('student', true)
  })
})

describe('Request Professor role using voucher', () => {
  before(() => {
    cy.visit('/home')
  })

  afterEach(() => {
    cy.signOut()
  })

  it('Do request', () => {
    cy.typeSignIn()
    accessRole('professor')

    cy.fixture('roles/professor').then(fixture => {
      fillUniversityForm(fixture)

      fixture.full_time && cy.get('[data-cy=Checkbox-full_time]').click()
    })

    cy.wait(600)
    cy.get('[data-cy=Ways-voucher]').click()
    cy.wait(600)
    cy.get('[data-cy=File]').attachFile('assets/test.pdf')

    cy.get('[data-cy=Submit]').click()
    cy.popup('Solicitação enviada!')

    accessRole('professor')
    cy.get('[data-cy=RequestSVG]').should('exist')
    cy.get('[data-cy="Voltar ao mapa"]').click()
  })

  it('Accept request', () => {
    cy.typeSignIn('moderator')
    cy.get('[data-cy=Universidade]').click()

    cy.get('[data-cy=TableTr]')
      .should('contain', 'Miguel A.')
      .children('[data-cy=professor]')
      .click()

    cy.get('#Radio-accept').click()
    cy.get('[data-cy=Form] > [data-cy=Submit]').click()
    cy.popup('Resposta enviada.')

    cy.get('[data-cy="Voltar ao mapa"]').click()
  })

  it.skip('Remove request', () => {
    removeRequest('professor')
  })

  it.skip('Remove role', () => {
    cy.typeSignIn()
    accessRole('professor', true)
  })
})

describe('#Add Moderator role', () => {
  before(() => {
    cy.visit('/home')
  })

  afterEach(() => {
    cy.signOut()
  })

  it('Do request', () => {
    cy.typeSignIn()
    accessRole('moderator')

    cy.fixture('roles/moderator').then(fixture => {
      cy.setSelect('#university_id', fixture.university)
    })

    cy.get('[data-cy=Submit]').click()
    cy.popup('Papel adicionado')
  })

  it('Remove role', () => {
    cy.typeSignIn()
    accessRole('moderator', true)
  })
})
