/// <reference types='cypress'/>

export const popup = (message: string): void => {
  cy.get('[data-cy=Popup]').should('exist').contains(message)
  cy.get('[data-cy=Popup] > button').click()
}
