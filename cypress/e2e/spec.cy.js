describe('My First Test', () => {
  it('Correct data', () => {
    cy.visit('https://1d7z5pqmof.execute-api.eu-west-3.amazonaws.com/dev/')

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('miranda@gmail.com')
    cy.get('[id^=password]').type('mirapass')
    cy.get('form').submit()

    cy.url().should('eq', 'https://1d7z5pqmof.execute-api.eu-west-3.amazonaws.com/dev/')
  })

  it('Incorrect data', () => {
    cy.visit('https://1d7z5pqmof.execute-api.eu-west-3.amazonaws.com/dev/')

    cy.url().should('include', '/login')

    cy.get('[id^=email]').type('invalid@gmail.com')
    cy.get('[id^=password]').type('invalidPassword')
    cy.get('form').submit()

    cy.url().should('include', '/login')
  })
})