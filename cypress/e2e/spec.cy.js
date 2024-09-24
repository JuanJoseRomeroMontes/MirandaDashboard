describe('My First Test', () => {
  it('Correct data', () => {
    cy.visit('http://localhost:5173/')

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('miranda@gmail.com')
    cy.get('[id^=password]').type('mirapass')
    cy.get('form').submit()

    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('Incorrect data', () => {
    cy.visit('http://localhost:5173/')

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('invalid@gmail.com')
    cy.get('[id^=password]').type('invalidPassword')
    cy.get('form').submit()

    cy.url().should('include', '/login')
  })
})