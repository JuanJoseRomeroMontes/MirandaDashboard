describe('My First Test', () => {
  it('Correct data', () => {
    cy.visit(import.meta.env.VITE_API_URL)

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('miranda@gmail.com')
    cy.get('[id^=password]').type('mirapass')
    cy.get('form').submit()

    cy.url().should('eq', import.meta.env.VITE_API_URL)
  })

  it('Incorrect data', () => {
    cy.visit(import.meta.env.VITE_API_URL)

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('invalid@gmail.com')
    cy.get('[id^=password]').type('invalidPassword')
    cy.get('form').submit()

    cy.url().should('include', '/login')
  })
})