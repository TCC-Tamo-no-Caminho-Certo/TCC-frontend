/// <reference types='cypress'/>

describe('Seasons', () => {
  before(() => {
    cy.visit('/home')
  })

  beforeEach(() => {
    cy.typeSignIn('moderator')

    cy.intercept('GET', '/api/universities/1/seasons').as('universities')
    cy.wait('@universities', { timeout: Infinity })

    cy.get('[data-cy="Seasons(Universidade Anhembi Morumbi)"]').click()
  })

  afterEach(() => {
    cy.signOut()
  })

  it('Create season', () => {
    cy.get('[data-cy=CreateSeason] [data-cy=List-Header]').click()
    cy.get('[data-cy=CreateSeason] [data-cy=List] [data-cy=AnimatedList]').as(
      'CreateSeasonForm'
    )

    cy.fixture('seasons/create').then(
      ({
        begin,
        title,
        edict,
        confirm,
        dispatch,
        evaluate,
        description,
        in_progress
      }) => {
        cy.get('@CreateSeasonForm').find('#title').type(title)
        cy.get('@CreateSeasonForm').find('#description').type(description)

        cy.get('@CreateSeasonForm').find('#begin').click()
        cy.setDatepicker(begin)

        cy.get('@CreateSeasonForm').find('#dispatch').type(dispatch)
        cy.get('@CreateSeasonForm').find('#evaluate').type(evaluate)
        cy.get('@CreateSeasonForm').find('#confirm').type(confirm)
        cy.get('@CreateSeasonForm').find('#in_progress').type(in_progress)

        cy.get('@CreateSeasonForm').find('[data-cy=File]').attachFile(edict)
        cy.get('@CreateSeasonForm').find('#fileName').should('exist')

        cy.get('@CreateSeasonForm').find('[data-cy=Submit]').click()
        cy.popup('Temporada adicionada!')

        cy.get('[data-cy=University]').find('[data-cy=Season]').contains(title)
      }
    )
  })

  it('Verify if have previus value', () => {
    cy.fixture('seasons/create').then(({ title }) => {
      cy.get('[data-cy=Season]').contains(title).click()
    })

    cy.get('[data-cy=EditIcon]').click()

    cy.get('[data-cy=Season] [data-cy=List] [data-cy=AnimatedList]').as(
      'EditSeasonForm'
    )

    cy.fixture('seasons/create').then(
      ({
        begin,
        title,
        confirm,
        dispatch,
        evaluate,
        description,
        in_progress
      }) => {
        cy.get('@EditSeasonForm').find('#title').should('have.value', title)

        cy.get('@EditSeasonForm')
          .find('#description')
          .should('have.value', description)

        cy.get('[data-cy=DefaultField-begin] > div').contains(
          begin.slice(0, 6) + begin.slice(8)
        )

        cy.get('[data-cy=DefaultField-dispatch] > div').contains(dispatch)
        cy.get('[data-cy=DefaultField-evaluate] > div').contains(evaluate)
        cy.get('[data-cy=DefaultField-confirm] > div').contains(confirm)
        cy.get('[data-cy=DefaultField-in_progress] > div').contains(in_progress)
      }
    )
  })

  it('Edit season', () => {
    cy.fixture('seasons/create').then(({ title }) => {
      cy.get('[data-cy=Season]').contains(title).click()
    })

    cy.get('[data-cy=EditIcon]').click()

    cy.get('[data-cy=Season] [data-cy=List] [data-cy=AnimatedList]').as(
      'EditSeasonForm'
    )

    cy.fixture('seasons/edit').then(
      ({
        begin,
        title,
        edict,
        confirm,
        dispatch,
        evaluate,
        description,
        in_progress
      }) => {
        cy.get('@EditSeasonForm')
          .find('#title')
          .type(`{selectAll}{backspace}${title}`)

        cy.get('@EditSeasonForm')
          .find('#description')
          .type(`{selectAll}{backspace}${description}`)

        cy.get('[data-cy=DefaultField-begin] > [data-cy=PencilIcon]').click()
        cy.get('#begin').click()
        cy.setDatepicker(begin)

        cy.get('[data-cy=DefaultField-dispatch] > [data-cy=PencilIcon]').click()
        cy.get('#dispatch').type(dispatch)

        cy.get('[data-cy=DefaultField-evaluate] > [data-cy=PencilIcon]').click()
        cy.get('#evaluate').type(evaluate)

        cy.get('[data-cy=DefaultField-confirm] > [data-cy=PencilIcon]').click()
        cy.get('#confirm').type(confirm)

        cy.get(
          '[data-cy=DefaultField-in_progress] > [data-cy=PencilIcon]'
        ).click()
        cy.get('#in_progress').type(in_progress)

        cy.get('@EditSeasonForm').find('input[type="file"]').attachFile(edict)

        cy.get('[data-cy=Submit]').click()

        cy.popup('Alterações salvas!')
      }
    )
  })

  it('Remove season', () => {
    cy.fixture('seasons/create').then(({ title }) => {
      cy.get('[data-cy=Season]').contains(title).click()
    })

    cy.get('[data-cy=EditIcon]').click()
    cy.get('[data-cy=RemoveIcon]').click()

    cy.popup('Tem certeza que deseja remover esta temporada?')
    cy.popup('Temporada removida')
  })
})
