/// <reference types='cypress'/>
import 'cypress-file-upload'

export const setDatepicker = (date: string): void => {
  const usableDate = date.split('/')
  const day = usableDate[0]
  const year = usableDate[2]
  const month = usableDate[1]

  cy.get('[data-testid=year-selector] > li > button').contains(year).click()

  cy.get('.-shown > .Calendar__monthText').click()
  cy.get(`:nth-child(${month}) > .Calendar__monthSelectorItemText`).click()

  cy.get('[role=gridcell]').contains(day).click()
}
