/// <reference types='cypress'/>

export const setSelect = (id: string, selectContent: string): void => {
  cy.get(id).click()
  cy.get('.Select__menu-list').contains(selectContent).click()
}
