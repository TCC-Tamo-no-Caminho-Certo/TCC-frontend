describe('Cadastro de um moderador', () => {
  it('Enviando justificativa', () => {
    cy.accessAddRole('andrelms91@gmail.com', '123mudar')

    cy.get('.dAsvyv > #title').click()
    cy.get('.dAsvyv > div > button').click()

    cy.wait(300)
    cy.get('.sc-giIncl')
      .click()
      .type(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus gravida magna, et dictum nisi interdum et. Fusce viverra rutrum libero id placerat. In sit amet purus tempor leo porta consectetur sit amet sit amet leo. Suspendisse ac ex quam. Suspendisse bibendum, velit ac egestas placerat, augue libero iaculis arcu, vitae scelerisque odio nisl vel dui. Sed maximus in elit eu finibus. Cras mattis dapibus ante, sed sollicitudin leo commodo ut. Morbi elementum pellentesque neque eu dapibus nam.'
      )
    cy.get('.CheckboxLabel').click()
    cy.wait(300)
    cy.get('.CheckboxLabel').click()
    cy.wait(300)
    cy.get('.CheckboxLabel').click()
    cy.wait(300)
    cy.get('.sc-fKFyDc').click()
  })
})
